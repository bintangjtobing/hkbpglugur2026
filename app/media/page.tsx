import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { PhotoGallery } from "@/components/PhotoGallery";
import { withUtm } from "@/lib/utm";
import {
  youtubeChannels,
  photoAlbums,
  fetchChannelVideos,
  type YoutubeVideo,
} from "@/lib/media";

export const metadata: Metadata = {
  title: "Galeri Foto dan Video",
  description:
    "Tonton video kegiatan dan ibadah HKBP Glugur di YouTube, serta lihat album foto gereja di Google Maps dan Facebook.",
  alternates: { canonical: "/media" },
};

export const revalidate = 21600;

export default async function MediaPage() {
  const results = await Promise.all(
    youtubeChannels.map((c) => fetchChannelVideos(c.channelId, c.label))
  );
  const videos: YoutubeVideo[] = results.flat().slice(0, 12);

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Galeri dan Media"
          title="Rekam jejak sukacita jemaat"
          desc="Tonton kegiatan dan ibadah HKBP Glugur, serta jelajahi album foto gereja."
        />

        {/* ===== VIDEO ===== */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow inline-flex items-center gap-2 text-royal">
                <span className="h-1.5 w-1.5 mark-cross bg-blue" />
                Video YouTube
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-black sm:text-4xl">
                Video terbaru
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {youtubeChannels.map((c) => (
                <a
                  key={c.key}
                  href={withUtm(c.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Kanal YouTube ${c.label}`}
                  aria-label={`Buka kanal YouTube ${c.label}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-mist"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#FF0000]" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
                  {c.role}
                </a>
              ))}
            </div>
          </Reveal>

          {videos.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v, i) => (
                <Reveal key={v.id} delay={(i % 3) * 80}>
                  <a
                    href={withUtm(`https://www.youtube.com/watch?v=${v.id}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Tonton video: ${v.title}`}
                    aria-label={`Tonton video: ${v.title}`}
                    className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="relative aspect-video overflow-hidden bg-mist">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                        alt={`Thumbnail video ${v.title}`}
                        title={v.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm transition-colors group-hover:bg-[#FF0000]">
                          <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-0.5 text-white" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="line-clamp-2 text-sm font-semibold leading-snug text-black">
                        {v.title}
                      </p>
                      <p className="mt-2 text-xs text-black/50">{v.channel}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-10">
              <div className="rounded-[var(--radius-card)] border border-line bg-white p-8 text-black/70">
                Video belum dapat dimuat saat ini. Kunjungi kanal YouTube kami
                langsung melalui tombol di atas.
              </div>
            </Reveal>
          )}
        </section>

        {/* ===== FOTO ===== */}
        <section className="bg-mist py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="max-w-2xl">
              <span className="eyebrow inline-flex items-center gap-2 text-royal">
                <span className="h-1.5 w-1.5 mark-cross bg-blue" />
                Album Foto
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-black sm:text-4xl">
                Galeri foto gereja
              </h2>
              <p className="mt-4 text-lg text-black/75">
                Kumpulan foto gedung dan kegiatan tersimpan di Google Maps dan
                Facebook resmi. Buka album lengkapnya di sana.
              </p>
            </Reveal>

            <PhotoGallery albums={photoAlbums} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
