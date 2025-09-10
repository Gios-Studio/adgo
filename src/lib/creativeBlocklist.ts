export const BLOCKED_CATEGORIES = ["political", "adult", "gambling", "weapons"];
export const BLOCKED_KEYWORDS = [
  "election", "vote", "manifesto", "xxx", "porn", "escort", "casino", "betting", "firearm", "ammo"
];

export function validateCreative(input: { category?: string; title: string; body?: string }) {
  const errs: string[] = [];

  if (input.category && BLOCKED_CATEGORIES.includes(input.category.toLowerCase())) {
    errs.push(`Category '${input.category}' is not allowed on AdGo.`);
  }

  const blob = `${input.title} ${(input.body || "")}`.toLowerCase();
  const hits = BLOCKED_KEYWORDS.filter(k => blob.includes(k));
  if (hits.length) errs.push(`Contains prohibited terms: ${hits.join(", ")}`);

  return { ok: errs.length === 0, errors: errs };
}