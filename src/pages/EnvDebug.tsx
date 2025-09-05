export default function EnvDebug() {
  const url = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();
  const key = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();
  return (
    <pre className="p-4 text-sm">
      {"VITE_SUPABASE_URL: "}{JSON.stringify(url)}{"\n"}
      {"VITE_SUPABASE_ANON_KEY length: "}{key.length}
    </pre>
  );
}