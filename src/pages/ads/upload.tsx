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
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Eye,
  Target,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Video,
  Save,
  Send,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Form validation schema
const adUploadSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title too long"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description too long"),
  budget: z
    .number()
    .min(100, "Minimum budget is $100")
    .max(50000, "Maximum budget is $50,000"),
  campaignDuration: z
    .number()
    .min(1, "Minimum duration is 1 day")
    .max(90, "Maximum duration is 90 days"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  radius: z
    .number()
    .min(1, "Minimum radius is 1km")
    .max(100, "Maximum radius is 100km"),
  ageRange: z.object({
    min: z.number().min(18, "Minimum age is 18").max(65, "Maximum age is 65"),
    max: z.number().min(18, "Minimum age is 18").max(65, "Maximum age is 65"),
  }),
  demographics: z.object({
    gender: z.array(z.enum(["male", "female", "other"])),
    commuterType: z.array(
      z.enum(["daily", "occasional", "weekend", "business"]),
    ),
  }),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  region: z.string().min(1, "Select a region"),
  city: z.string().min(1, "Select a city"),
});

type AdUploadForm = z.infer<typeof adUploadSchema>;

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "sw", label: "Swahili" },
  { value: "fr", label: "French" },
  { value: "ar", label: "Arabic" },
];

const INTERESTS = [
  "Technology",
  "Fashion",
  "Food & Dining",
  "Travel",
  "Sports",
  "Music",
  "Gaming",
  "Health & Fitness",
  "Business",
  "Education",
  "Shopping",
  "Entertainment",
  "News",
  "Finance",
  "Real Estate",
  "Automotive",
];

const REGIONS = [
  {
    value: "nairobi",
    label: "Nairobi County",
    cities: ["Nairobi CBD", "Westlands", "Karen", "Kilimani"],
  },
  {
    value: "mombasa",
    label: "Mombasa County",
    cities: ["Mombasa Island", "Nyali", "Bamburi", "Likoni"],
  },
  {
    value: "kisumu",
    label: "Kisumu County",
    cities: ["Kisumu Central", "Kondele", "Mamboleo"],
  },
];

export default function AdUploadPage() {
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDemographics, setSelectedDemographics] = useState({
    gender: [] as string[],
    commuterType: [] as string[],
  });
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AdUploadForm>({
    resolver: zodResolver(adUploadSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: 1000,
      campaignDuration: 7,
      languages: ["en"],
      radius: 25,
      ageRange: { min: 18, max: 65 },
      demographics: {
        gender: [],
        commuterType: [],
      },
      interests: [],
      region: "",
      city: "",
    },
  });

  // Watch form values for live preview
  const watchedValues = watch();

  // Handle region change
  const handleRegionChange = (region: string) => {
    setValue("region", region);
    setValue("city", "");
    const selectedRegion = REGIONS.find((r) => r.value === region);
    setAvailableCities(selectedRegion?.cities || []);
  };

  // Handle media file upload
  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload media to Supabase Storage
  const uploadMediaToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `ads_media/${fileName}`;

    const { error } = await supabase.storage
      .from("ads_media")
      .upload(filePath, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("ads_media").getPublicUrl(filePath);

    return publicUrl;
  };

  // Submit form
  const onSubmit = async (data: AdUploadForm) => {
    try {
      setUploadProgress(10);

      // Upload media if provided
      let mediaUrl = "";
      if (mediaFile) {
        setUploadProgress(30);
        mediaUrl = await uploadMediaToSupabase(mediaFile);
      }

      setUploadProgress(60);

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create campaign
      const { data: campaign, error: campaignError } = await supabase
        .from("campaigns")
        .insert({
          name: data.title,
          budget: data.budget,
          duration_days: data.campaignDuration,
          status: "draft",
          advertiser_id: user.id,
          targeting_filters: {
            languages: data.languages,
            radius: data.radius,
            ageRange: data.ageRange,
            demographics: data.demographics,
            interests: data.interests,
            region: data.region,
            city: data.city,
          },
        })
        .select()
        .single();

      if (campaignError) throw campaignError;

      setUploadProgress(80);

      // Create ad
      const { error: adError } = await supabase.from("ads").insert({
        title: data.title,
        description: data.description,
        media_url: mediaUrl,
        media_type: mediaFile
          ? mediaFile.type.startsWith("video/")
            ? "video"
            : "image"
          : "text",
        campaign_id: campaign.id,
        advertiser_id: user.id,
        status: "pending_review",
      });

      if (adError) throw adError;

      setUploadProgress(100);

      toast.success("Ad uploaded successfully! It will be reviewed shortly.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload ad. Please try again.");
      setUploadProgress(0);
    }
  };

  // Live Preview Component
  const AdPreview = () => (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mediaPreview && (
          <div className="rounded-lg overflow-hidden border">
            {mediaFile?.type.startsWith("video/") ? (
              <video
                src={mediaPreview}
                controls
                className="w-full h-48 object-cover"
              />
            ) : (
              <img
                src={mediaPreview}
                alt="Ad preview"
                className="w-full h-48 object-cover"
              />
            )}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-lg">
            {watchedValues.title || "Your Ad Title Here"}
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            {watchedValues.description ||
              "Your ad description will appear here..."}
          </p>
        </div>

        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Target className="h-3 w-3" />
            <span>Targeting: {selectedLanguages.join(", ")} speakers</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>
              Radius: {watchedValues.radius}km around{" "}
              {watchedValues.city || "selected city"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-3 w-3" />
            <span>
              Ages: {watchedValues.ageRange?.min}-{watchedValues.ageRange?.max}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>Duration: {watchedValues.campaignDuration} days</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-3 w-3" />
            <span>Budget: ${watchedValues.budget?.toLocaleString()}</span>
          </div>
        </div>

        {selectedInterests.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Targeting interests:</p>
            <div className="flex flex-wrap gap-1">
              {selectedInterests.slice(0, 3).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {selectedInterests.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{selectedInterests.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Ad Campaign
          </h1>
          <p className="text-gray-600 mt-2">
            Upload your ad with precise targeting to reach the right audience in
            Kenya
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="targeting">Targeting</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Ad Title *</Label>
                      <Input
                        id="title"
                        {...register("title")}
                        placeholder="Enter compelling ad title"
                        className={errors.title ? "border-red-500" : ""}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="description">Ad Description *</Label>
                      <Textarea
                        id="description"
                        {...register("description")}
                        rows={4}
                        placeholder="Describe your product or service..."
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Campaign Duration (days) *</Label>
                      <div className="mt-2">
                        <Slider
                          value={[watchedValues.campaignDuration || 7]}
                          onValueChange={(value) =>
                            setValue("campaignDuration", value[0])
                          }
                          max={90}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>1 day</span>
                          <span className="font-medium">
                            {watchedValues.campaignDuration || 7} days
                          </span>
                          <span>90 days</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Media Upload Tab */}
              <TabsContent value="media" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                        id="media-upload"
                      />
                      <label htmlFor="media-upload" className="cursor-pointer">
                        {mediaPreview ? (
                          <div className="space-y-2">
                            {mediaFile?.type.startsWith("video/") ? (
                              <Video className="h-12 w-12 mx-auto text-gray-400" />
                            ) : (
                              <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                            )}
                            <p className="text-green-600 font-medium">
                              Media uploaded successfully
                            </p>
                            <p className="text-sm text-gray-500">
                              Click to change
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="h-12 w-12 mx-auto text-gray-400" />
                            <div>
                              <p className="text-lg font-medium">
                                Upload your ad media
                              </p>
                              <p className="text-sm text-gray-500">
                                Supports images (JPG, PNG) and videos (MP4, MOV)
                              </p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Targeting Tab */}
              <TabsContent value="targeting" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Targeting</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Languages */}
                    <div>
                      <Label>Languages *</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {LANGUAGES.map((lang) => (
                          <div
                            key={lang.value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={lang.value}
                              checked={selectedLanguages.includes(lang.value)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  const newLangs = [
                                    ...selectedLanguages,
                                    lang.value,
                                  ];
                                  setSelectedLanguages(newLangs);
                                  setValue("languages", newLangs);
                                } else {
                                  const newLangs = selectedLanguages.filter(
                                    (l) => l !== lang.value,
                                  );
                                  setSelectedLanguages(newLangs);
                                  setValue("languages", newLangs);
                                }
                              }}
                            />
                            <Label htmlFor={lang.value}>{lang.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Region *</Label>
                        <Select onValueChange={handleRegionChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {REGIONS.map((region) => (
                              <SelectItem
                                key={region.value}
                                value={region.value}
                              >
                                {region.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>City *</Label>
                        <Select
                          onValueChange={(city) => setValue("city", city)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Radius */}
                    <div>
                      <Label>Targeting Radius (km) *</Label>
                      <div className="mt-2">
                        <Slider
                          value={[watchedValues.radius || 25]}
                          onValueChange={(value) =>
                            setValue("radius", value[0])
                          }
                          max={100}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>1km</span>
                          <span className="font-medium">
                            {watchedValues.radius || 25}km
                          </span>
                          <span>100km</span>
                        </div>
                      </div>
                    </div>

                    {/* Age Range */}
                    <div>
                      <Label>Age Range *</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label htmlFor="age-min" className="text-sm">
                            Minimum Age
                          </Label>
                          <Select
                            onValueChange={(age) =>
                              setValue("ageRange.min", parseInt(age))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="18" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 48 }, (_, i) => i + 18).map(
                                (age) => (
                                  <SelectItem key={age} value={age.toString()}>
                                    {age}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="age-max" className="text-sm">
                            Maximum Age
                          </Label>
                          <Select
                            onValueChange={(age) =>
                              setValue("ageRange.max", parseInt(age))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="65" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 48 }, (_, i) => i + 18).map(
                                (age) => (
                                  <SelectItem key={age} value={age.toString()}>
                                    {age}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <Label>Interests *</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                        {INTERESTS.map((interest) => (
                          <div
                            key={interest}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={interest}
                              checked={selectedInterests.includes(interest)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  const newInterests = [
                                    ...selectedInterests,
                                    interest,
                                  ];
                                  setSelectedInterests(newInterests);
                                  setValue("interests", newInterests);
                                } else {
                                  const newInterests = selectedInterests.filter(
                                    (i) => i !== interest,
                                  );
                                  setSelectedInterests(newInterests);
                                  setValue("interests", newInterests);
                                }
                              }}
                            />
                            <Label htmlFor={interest} className="text-sm">
                              {interest}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Budget Tab */}
              <TabsContent value="budget" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Budget</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="budget">Total Budget (USD) *</Label>
                      <Input
                        id="budget"
                        type="number"
                        {...register("budget", { valueAsNumber: true })}
                        min={100}
                        max={50000}
                        step={50}
                        placeholder="1000"
                        className={errors.budget ? "border-red-500" : ""}
                      />
                      {errors.budget && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>

                    <Alert>
                      <AlertDescription>
                        <strong>Budget Breakdown:</strong>
                        <br />• Daily spend: $
                        {Math.round(
                          (watchedValues.budget || 0) /
                            (watchedValues.campaignDuration || 1),
                        )}
                        <br />• Estimated reach:{" "}
                        {Math.round(
                          (watchedValues.budget || 0) * 2.5,
                        ).toLocaleString()}{" "}
                        people
                        <br />• Cost per click: $0.15 - $0.45
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Progress Bar */}
            {uploadProgress > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Upload Progress</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => toast("Draft saved locally", { icon: "💾" })}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>

          {/* Live Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <AdPreview />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Incremental Static Regeneration for ad upload
export async function getStaticProps() {
  return {
    props: {
      timestamp: new Date().toISOString(),
    },
    revalidate: 60, // Revalidate every minute
  };
}
