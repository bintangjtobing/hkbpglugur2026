/* Pembatas bermotif "benang ulos" — tenun Batak dalam nuansa biru.
   Elemen signature yang mengikat identitas Batak ke seluruh halaman. */
export function UlosDivider({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className="flex items-center gap-4"
      aria-hidden="true"
    >
      <span
        className={`h-px flex-1 ${
          dark
            ? "bg-gradient-to-r from-transparent to-white/25"
            : "bg-gradient-to-r from-transparent to-line"
        }`}
      />
      <span className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`block rotate-45 ${
              i === 2 ? "h-2.5 w-2.5" : "h-1.5 w-1.5"
            } ${
              dark
                ? i === 2
                  ? "bg-white"
                  : "bg-white/40"
                : i === 2
                ? "bg-blue"
                : "bg-royal/40"
            }`}
          />
        ))}
      </span>
      <span
        className={`h-px flex-1 ${
          dark
            ? "bg-gradient-to-l from-transparent to-white/25"
            : "bg-gradient-to-l from-transparent to-line"
        }`}
      />
    </div>
  );
}
