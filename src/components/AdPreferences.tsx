// components/AdPreferences.tsx
import { useState } from "react";

export default function AdPreferences() {
  const [mutedCategories, setMutedCategories] = useState<string[]>([]);
  const [freqCap, setFreqCap] = useState<number>(1);

  const toggleCategory = (cat: string) => {
    setMutedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="font-bold">Ad Preferences</h2>
      <div>
        <label>
          Frequency Cap (ads per ride):{" "}
          <input
            type="number"
            value={freqCap}
            onChange={(e) => setFreqCap(parseInt(e.target.value))}
            className="border p-1 rounded w-16"
          />
        </label>
      </div>
      <div className="mt-2">
        <p>Mute Categories:</p>
        {["Food", "Fashion", "Music"].map((cat) => (
          <label key={cat} className="block">
            <input
              type="checkbox"
              checked={mutedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
            />
            {cat}
          </label>
        ))}
      </div>
    </div>
  );
}