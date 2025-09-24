export default function EnvDebug() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
  return (
    <pre className="p-4 text-sm">
      {"NEXT_PUBLIC_SUPABASE_URL: "}{JSON.stringify(url)}{"\n"}
      {"NEXT_PUBLIC_SUPABASE_ANON_KEY length: "}{key.length}
    </pre>
  );
}