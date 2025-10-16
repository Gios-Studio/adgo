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
 * Generated: 2025-10-15 04:38:36 UTC
 */

import { useState } from "react";
import Layout from "../../components/Layout";
import AdUploadFilters from "./AdUploadFilters";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function AdUpload() {
  const [selectedCategory, setSelectedCategory] = useState("Food & Drink");
  const [duration, setDuration] = useState("7 days");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const { data, error } = await supabase.storage
      .from("ads")
      .upload(`uploads/${file.name}`, file);

    if (error) {
      toast.error("Upload failed.");
      return;
    }

    toast.success("Ad uploaded successfully!");
    console.log("Uploaded:", data);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Upload an Ad</h1>

        <AdUploadFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          duration={duration}
          onDurationChange={setDuration}
        />

        <div className="space-y-3">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="border rounded-md p-2 w-full"
          />
          <button
            onClick={handleUpload}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Upload
          </button>
        </div>
      </div>
    </Layout>
  );
}