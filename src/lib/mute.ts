const KEY = "adgo_muted_categories";

export function getMuted(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function isMuted(category: string): boolean {
  return getMuted().includes(category.toLowerCase());
}

export function toggleMute(category: string) {
  const c = category.toLowerCase();
  const muted = new Set(getMuted());
  muted.has(c) ? muted.delete(c) : muted.add(c);
  localStorage.setItem(KEY, JSON.stringify(Array.from(muted)));
}