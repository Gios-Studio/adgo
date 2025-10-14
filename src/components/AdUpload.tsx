import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdType, TextAdFormData, LANGUAGE_LABELS } from "../types/textAds";
import TextAdCreationForm from "./TextAdCreationForm";
import { Image, Type, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

type AdUploadType = "media" | "text";

export default function AdUpload({ campaignId }: { campaignId: string }) {
  const [adType, setAdType] = useState<AdUploadType>("media");
  const [form, setForm] = useState({ title: "", media_url: "", tags: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleMediaSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.from("ads").insert({
        ...form,
        campaign_id: campaignId,
        ad_type: "media",
        status: "pending",
        language: "en" // Default language for media ads
      });

      if (error) throw error;
      
      toast.success("Media advertisement uploaded successfully!");
      setForm({ title: "", media_url: "", tags: "" });
    } catch (error) {
      console.error("Error uploading media ad:", error);
      toast.error("Failed to upload advertisement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = async (formData: TextAdFormData) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.from("ads").insert({
        title: formData.title,
        ad_text: formData.ad_text,
        language: formData.language,
        ad_type: "text",
        cta_link: formData.cta_link || null,
        text_style: formData.text_style,
        campaign_id: campaignId || null,
        status: "pending"
      });

      if (error) throw error;
      
      toast.success("Text advertisement created successfully!");
      // Reset to media type after successful submission
      setAdType("media");
    } catch (error) {
      console.error("Error creating text ad:", error);
      toast.error("Failed to create text advertisement. Please try again.");
      throw error; // Re-throw to be handled by TextAdCreationForm
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAdType("media");
  };

  // If text ad type is selected, show the text ad creation form
  if (adType === "text") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <button
            onClick={() => setAdType("media")}
            className="flex items-center gap-1 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Ad Type Selection
          </button>
        </div>
        
        <TextAdCreationForm
          onSubmit={handleTextSubmit}
          onCancel={handleCancel}
          isLoading={loading}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Ad Type Toggle */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Choose Advertisement Type</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Media Ad Option */}
          <button
            type="button"
            onClick={() => setAdType("media")}
            className={`p-4 border-2 rounded-lg transition-all ${
              adType === "media"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <Image size={32} />
              <span className="font-medium">Media Ad</span>
              <span className="text-sm text-center">
                Upload images or videos for visual advertising
              </span>
            </div>
          </button>

          {/* Text Ad Option */}
          <button
            type="button"
            onClick={() => setAdType("text")}
            className={`p-4 border-2 rounded-lg transition-all ${
              adType === "text"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <Type size={32} />
              <span className="font-medium">Text Ad</span>
              <span className="text-sm text-center">
                Create text-based ads with language options
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Media Upload Form (only shown when media type is selected) */}
      {adType === "media" && (
        <form onSubmit={handleMediaSubmit} className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Media Advertisement Details</h4>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Advertisement Title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  placeholder="Enter a descriptive title for your ad"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="media_url" className="block text-sm font-medium text-gray-700 mb-1">
                  Media URL *
                </label>
                <input
                  id="media_url"
                  name="media_url"
                  type="url"
                  value={form.media_url}
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG, GIF, MP4, WebM
                </p>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (Optional)
                </label>
                <input
                  id="tags"
                  name="tags"
                  value={form.tags}
                  placeholder="e.g., automotive, lifestyle, technology"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple tags with commas
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              disabled={loading}
            >
              <Image size={16} />
              {loading ? "Uploading..." : "Upload Media Ad"}
            </button>
            
            <button
              type="button"
              onClick={() => setForm({ title: "", media_url: "", tags: "" })}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
          </div>
        </form>
      )}

      {/* Language Support Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-medium text-blue-900 mb-2">Multi-Language Support Available</h5>
        <p className="text-blue-800 text-sm mb-2">
          Text ads support multiple languages for better local engagement:
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
            <span
              key={code}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}