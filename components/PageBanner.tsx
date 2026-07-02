import { Mark } from "./Mark";

export function PageBanner({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <section className="relative -mt-[72px] overflow-hidden bg-navy pt-[72px] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #2138e0 0, transparent 45%), radial-gradient(circle at 90% 10%, #0000ff 0, transparent 40%)",
        }}
      />
      <Mark className="pointer-events-none absolute -bottom-20 right-[-3%] h-80 w-80 text-white/[0.05]" />
      <div className="ulos-thread absolute inset-x-0 top-[72px] h-1 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
        <span className="eyebrow inline-flex items-center gap-2 text-mist-200">
          <span className="h-1.5 w-1.5 mark-cross bg-blue" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {desc ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {desc}
          </p>
        ) : null}
      </div>
    </section>
  );
}
