import { useEffect, useState } from "react";
import { getMuted, toggleMute } from "@/lib/mute";

const CATEGORIES = ["coffee", "fashion", "music", "airport", "groceries"];

export default function MutedCategoriesToggle() {
  const [muted, setMuted] = useState<string[]>([]);
  useEffect(() => setMuted(getMuted()), []);

  return (
    <div>
      <h3 className="font-semibold mb-2">Mute ad categories</h3>
      <ul className="grid grid-cols-2 gap-2">
        {CATEGORIES.map(cat => {
          const isOn = muted.includes(cat);
          return (
            <li key={cat}>
              <button
                className={`rounded px-3 py-2 border ${isOn ? "opacity-60" : ""}`}
                onClick={() => { toggleMute(cat); setMuted(getMuted()); }}
                aria-pressed={isOn}
              >
                {isOn ? "Unmute " : "Mute "}{cat}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}