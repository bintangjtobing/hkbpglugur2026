/* ============================================================
   Media HKBP Glugur: kanal YouTube dan album foto.
   ============================================================ */

/* Kanal (proper noun). Teks peran tombol (role) ada di kamus, per-indeks. */
export const youtubeChannels = [
  {
    key: "official",
    label: "HKBP Glugur Ressort Medan Utara",
    handle: "@HKBPGLUGURRESSORTMEDANUTARA",
    channelId: "UCvUPSIf5It2MS7qsgZZ2oPA",
    url: "https://www.youtube.com/@HKBPGLUGURRESSORTMEDANUTARA",
  },
  {
    key: "aktivitas",
    label: "Aktivitas HKBP Glugur",
    handle: "@rosintasitumeang3045",
    channelId: "UCi9d8lSPmYa3Em-Q9oGqp-Q",
    url: "https://www.youtube.com/@rosintasitumeang3045",
  },
] as const;

/* Album foto: hanya URL. Label dan deskripsi ada di kamus, per-indeks. */
export const photoAlbums = [
  { url: "https://www.google.com/maps/search/HKBP+Glugur+Medan" },
  { url: "https://www.facebook.com/hkbpglugurofficial/photos" },
] as const;

export type YoutubeVideo = {
  id: string;
  title: string;
  published: string;
  channel: string;
};

/* Ambil video terbaru dari RSS kanal (tanpa API key). */
export async function fetchChannelVideos(
  channelId: string,
  channelLabel: string,
  limit = 8
): Promise<YoutubeVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 21600 }, headers: { "User-Agent": "HKBP-Glugur-Web" } }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    const videos: YoutubeVideo[] = [];
    for (const e of entries.slice(0, limit)) {
      const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = e.match(/<media:title>([^<]+)<\/media:title>/)?.[1]
        || e.match(/<title>([^<]+)<\/title>/)?.[1];
      const published = e.match(/<published>([^<]+)<\/published>/)?.[1] || "";
      if (id && title) {
        videos.push({
          id,
          title: title.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
          published,
          channel: channelLabel,
        });
      }
    }
    return videos;
  } catch {
    return [];
  }
}
