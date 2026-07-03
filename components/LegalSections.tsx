/* Renderer bersama untuk halaman legal (Ketentuan, Kebijakan Privasi).
   Komponen presentasi murni, aman di sisi server. */

type Section = {
  heading: string;
  body: readonly string[];
  bullets?: readonly string[];
};

export function LegalSections({
  updated,
  intro,
  sections,
}: {
  updated: string;
  intro: string;
  sections: readonly Section[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <p className="text-sm font-medium text-black/50">{updated}</p>
      <p className="mt-4 text-[17px] leading-relaxed text-black/80">{intro}</p>

      <div className="mt-10 space-y-9">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-xl font-semibold text-black sm:text-2xl">
              {s.heading}
            </h2>
            {s.body.map((p, j) => (
              <p key={j} className="mt-3 text-[15px] leading-relaxed text-black/75">
                {p}
              </p>
            ))}
            {s.bullets && s.bullets.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {s.bullets.map((b, k) => (
                  <li
                    key={k}
                    className="flex gap-3 text-[15px] leading-relaxed text-black/75"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 mark-cross bg-blue" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
