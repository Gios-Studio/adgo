type Flags = {
  frequencyCapEnabled: boolean;
  muteCategoriesEnabled: boolean;
  driverWalletEnabled: boolean;
  blocklistValidationEnabled: boolean;
};
const DEFAULTS: Flags = {
  frequencyCapEnabled: true,
  muteCategoriesEnabled: true,
  driverWalletEnabled: true,
  blocklistValidationEnabled: true,
};
export function getFlags(): Flags {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem("adgo_flags") || "{}") }; }
  catch { return DEFAULTS; }
}
export function setFlag<K extends keyof Flags>(k: K, v: Flags[K]) {
  const cur = getFlags(); (cur as any)[k] = v; localStorage.setItem("adgo_flags", JSON.stringify(cur));
}