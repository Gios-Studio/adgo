import { useState } from "react";

export default function FrequencyCapToggle({
  initialValue = false,
  onChange,
}: {
  initialValue?: boolean;
  onChange?: (val: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(initialValue);

  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => {
          setEnabled(e.target.checked);
          onChange?.(e.target.checked);
        }}
      />
      <span>Enable Frequency Cap</span>
    </label>
  );
}