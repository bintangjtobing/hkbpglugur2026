/* Mark HKBP tersederhanakan (salib + lingkaran Trinitas).
   Monokrom via currentColor — untuk watermark & aksen. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 168"
      fill="currentColor"
      className={className}
      role="img"
      aria-label="Lambang HKBP: salib di atas lingkaran"
    >
      {/* Salib */}
      <rect x="51" y="4" width="18" height="74" rx="1" />
      <rect x="34" y="20" width="52" height="18" rx="1" />
      {/* Lingkaran Trinitas */}
      <path
        d="M60 66a42 42 0 1 0 0 84 42 42 0 0 0 0-84Zm0 22a20 20 0 1 1 0 40 20 20 0 0 1 0-40Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
