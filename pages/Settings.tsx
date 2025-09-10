import { getFlags, setFlag } from "@/lib/flags";
import { useEffect, useState } from "react";

export function FlagsPanel() {
  const [f, setF] = useState(getFlags());
  useEffect(() => setF(getFlags()), []);
  return (
    <div className="border rounded p-3 space-y-2">
      {Object.entries(f).map(([k, v]) => (
        <label key={k} className="flex items-center gap-2">
          <input type="checkbox" checked={!!v} onChange={e => { setFlag(k as any, e.target.checked); setF(getFlags()); }} />
          <span>{k}</span>
        </label>
      ))}
    </div>
  );
}