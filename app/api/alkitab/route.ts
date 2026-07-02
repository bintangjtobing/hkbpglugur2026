import { NextResponse } from "next/server";
import { bibleBooks, bibleVersions } from "@/lib/bible-books";

const SABDA = "https://alkitab.sabda.org/api/passage.php";
const allowedVersions = new Set(bibleVersions.map((v) => v.code));

function decode(text: string) {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const version = (searchParams.get("version") || "tb").toLowerCase();
  const bookName = searchParams.get("book") || "";
  const chapter = parseInt(searchParams.get("chapter") || "", 10);

  const book = bibleBooks.find((b) => b.name === bookName);
  if (!allowedVersions.has(version) || !book) {
    return NextResponse.json({ error: "Parameter tidak valid." }, { status: 400 });
  }
  if (isNaN(chapter) || chapter < 1 || chapter > book.chapters) {
    return NextResponse.json({ error: "Pasal di luar jangkauan." }, { status: 400 });
  }

  const passage = encodeURIComponent(`${book.name} ${chapter}`);
  const url = `${SABDA}?passage=${passage}&version=${version}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "HKBP-Glugur-Web" },
      next: { revalidate: 604800 },
    });
    if (!res.ok) throw new Error(`SABDA ${res.status}`);
    const xml = await res.text();

    const verses: { no: number; text: string }[] = [];
    const re = /<verse>\s*<number>(\d+)<\/number>\s*<text>([\s\S]*?)<\/text>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(xml)) !== null) {
      verses.push({ no: parseInt(m[1], 10), text: decode(m[2]) });
    }

    if (verses.length === 0) {
      return NextResponse.json(
        { error: "Teks tidak ditemukan." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      book: book.name,
      chapter,
      version,
      verses,
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil teks Alkitab. Coba lagi nanti." },
      { status: 502 }
    );
  }
}
