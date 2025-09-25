// src/components/PolicyViewer.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PolicyViewer() {
  const [policy, setPolicy] = useState<{ version: number; content: string }>();

  useEffect(() => {
    async function fetchPolicy() {
      const { data, error } = await supabase
        .from("policies")
        .select("version, content")
        .order("version", { ascending: false })
        .limit(1)
        .single();

      if (error) console.error(error);
      else setPolicy(data);
    }
    fetchPolicy();
  }, []);

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="font-semibold mb-2">Policy (v{policy?.version})</h2>
      <p className="whitespace-pre-wrap text-sm">{policy?.content}</p>
    </div>
  );
}