/* Isi placeholder {nama} di string kamus. Aman di klien dan server. */
export function fill(
  tpl: string,
  vars: Record<string, string | number>
): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) =>
    vars[k] === undefined ? "" : String(vars[k])
  );
}
