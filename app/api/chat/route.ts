import { SYSTEM_PROMPT } from "@/lib/chatbot-knowledge";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return Response.json(
      { error: "Layanan chatbot belum dikonfigurasi." },
      { status: 503 }
    );
  }

  // Batasi pemakaian per IP untuk mencegah penyalahgunaan biaya OpenAI.
  if (!rateLimit(`chat:${clientIp(request)}`, 25, 600000)) {
    return Response.json(
      { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
      { status: 429 }
    );
  }

  let body: { messages?: unknown; locale?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  // Instruksi bahasa balasan sesuai locale yang dipilih pengguna.
  const locale = typeof body.locale === "string" ? body.locale : "id";
  const langInstruction: Record<string, string> = {
    id: "",
    en: "Regardless of any earlier instruction about language, reply to the user only in clear, natural English. Keep all facts identical. Proper names, church terms, and Batak phrases may stay as they are.",
    bbc: "Sian nasa na nidok di ginjang, alusi ma pangido ni pengguna holan di hata Batak Toba. Tong ma sude fakta i. Goar, hata gareja, dohot istilah boi tong songon na asli.",
  };

  // Validasi dan batasi riwayat pesan.
  const raw = Array.isArray(body.messages) ? body.messages : [];
  const history: Msg[] = raw
    .filter(
      (m): m is Msg =>
        !!m &&
        typeof (m as Msg).content === "string" &&
        ((m as Msg).role === "user" || (m as Msg).role === "assistant")
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (history.length === 0) {
    return Response.json({ error: "Pesan kosong." }, { status: 400 });
  }

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0.5,
      max_tokens: 700,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...(langInstruction[locale]
          ? [{ role: "system", content: langInstruction[locale] }]
          : []),
        ...history,
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return Response.json(
      { error: "Maaf, layanan sedang sibuk. Coba lagi sebentar." },
      { status: 502 }
    );
  }

  // Ubah SSE OpenAI menjadi aliran teks biasa untuk klien.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  let buffer = "";
  const stream = new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      // Simpan baris terakhir yang mungkin belum lengkap untuk pull berikutnya.
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith("data:")) continue;
        const data = t.slice(5).trim();
        if (data === "[DONE]") {
          controller.close();
          return;
        }
        try {
          const json = JSON.parse(data);
          const token = json.choices?.[0]?.delta?.content;
          if (token) controller.enqueue(encoder.encode(token));
        } catch {
          /* abaikan baris yang belum lengkap */
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
