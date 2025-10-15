/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:34 UTC
 */

import { useState } from "react";
import { validateCreative } from "@/lib/creativeBlocklist";

export default function CreativeUpload() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateCreative({ category, title, body });
    if (!v.ok) { setErrors(v.errors); return; }
    // proceed to upload…
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      {errors.length > 0 && <div className="border p-2 rounded text-red-600">{errors.join(" • ")}</div>}
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="border p-2 w-full rounded"/>
      <textarea placeholder="Body" value={body} onChange={e=>setBody(e.target.value)} className="border p-2 w-full rounded"/>
      <input placeholder="Category (e.g., coffee)" value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 w-full rounded"/>
      <button className="border rounded px-3 py-2">Upload</button>
    </form>
  );
}