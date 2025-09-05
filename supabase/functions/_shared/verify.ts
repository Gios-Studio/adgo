
export async function hmacVerify(payload: string, hexSignature: string, secretHex: string) {
  if (!hexSignature || !secretHex) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", hexToBytes(secretHex),
    { name: "HMAC", hash: "SHA-256" },
    false, ["verify"]);
  const sigBytes = hexToBytes(hexSignature.toLowerCase().replace(/^0x/, ""));
  return crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(payload));
}

export function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/[^0-9a-f]/gi, "");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return bytes;
}

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}
