import { useState } from "react";

const LANGUAGES = ["English", "Swahili", "French"];
const RIDER_TYPES = ["All", "New", "Returning"];

export function useTargetingFilters() {
  const [radius, setRadius] = useState(5);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [riderType, setRiderType] = useState(RIDER_TYPES[0]);
  return { radius, setRadius, language, setLanguage, riderType, setRiderType };
}

type AdUploadFiltersProps = {
  filters: {
    radius: number;
    language: string;
    riderType: string;
  };
  onChange: (filters: { radius: number; language: string; riderType: string }) => void;
};

export default function AdUploadFilters({ filters, onChange }: AdUploadFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium">Radius (km)</label>
        <input
          type="range"
          min={1}
          max={50}
          value={filters.radius}
          onChange={e => onChange({ ...filters, radius: Number(e.target.value) })}
          className="w-full"
        />
        <span className="text-sm">{filters.radius} km</span>
      </div>
      <div>
        <label className="block font-medium">Language</label>
        <select
          value={filters.language}
          onChange={e => onChange({ ...filters, language: e.target.value })}
          className="w-full border rounded p-2"
        >
          {LANGUAGES.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label className="block font-medium">Rider Type</label>
        <select
          value={filters.riderType}
          onChange={e => onChange({ ...filters, riderType: e.target.value })}
          className="w-full border rounded p-2"
        >
          {RIDER_TYPES.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
    </div>
  );
}