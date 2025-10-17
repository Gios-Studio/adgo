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
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Check,
  X,
  Flag,
  Search,
  Filter,
  RefreshCw,
  Shield,
  AlertTriangle,
  Calendar,
  User,
  Image as ImageIcon,
  Video,
  FileText,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

interface Ad {
  id: string;
  title: string;
  description: string;
  media_url?: string;
  media_type: "image" | "video" | "text";
  status: "pending_review" | "approved" | "rejected" | "flagged";
  created_at: string;
  advertiser_id: string;
  campaign_id: string;
  moderation_score?: number;
  rejection_reason?: string;
  advertiser?: {
    email: string;
    full_name?: string;
  };
  campaign?: {
    name: string;
    budget: number;
  };
}

interface ModerationResult {
  flagged: boolean;
  categories: string[];
  category_scores: Record<string, number>;
  confidence: number;
  reasons: string[];
}

export default function AdminReviewPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);

  // Fetch ads for review
  const fetchAds = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("ads")
        .select(
          `
          *,
          advertiser:profiles!advertiser_id(email, full_name),
          campaign:campaigns!campaign_id(name, budget)
        `,
        )
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error("Error fetching ads:", error);
      toast.error("Failed to load ads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [statusFilter]);

  // AI Moderation function
  const runModerationCheck = async (ad: Ad): Promise<ModerationResult> => {
    try {
      // Call our Edge Function for AI moderation
      const { data, error } = await supabase.functions.invoke("moderate-ad", {
        body: {
          adId: ad.id,
          title: ad.title,
          description: ad.description,
          mediaUrl: ad.media_url,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Moderation error:", error);
      // Fallback to basic keyword filtering
      return basicModerationCheck(ad);
    }
  };

  // Basic moderation fallback
  const basicModerationCheck = (ad: Ad): ModerationResult => {
    const prohibitedKeywords = [
      "scam",
      "fraud",
      "fake",
      "illegal",
      "drugs",
      "weapons",
      "violence",
      "hate",
      "discrimination",
      "nsfw",
      "adult",
      "gambling",
      "bitcoin",
      "cryptocurrency",
      "get rich quick",
      "miracle cure",
    ];

    const text = `${ad.title} ${ad.description}`.toLowerCase();
    const flaggedKeywords = prohibitedKeywords.filter((keyword) =>
      text.includes(keyword),
    );

    return {
      flagged: flaggedKeywords.length > 0,
      categories: flaggedKeywords,
      category_scores: {},
      confidence: flaggedKeywords.length > 0 ? 0.8 : 0.1,
      reasons:
        flaggedKeywords.length > 0
          ? [`Contains prohibited keywords: ${flaggedKeywords.join(", ")}`]
          : [],
    };
  };

  // Approve ad
  const approveAd = async (adId: string) => {
    try {
      setProcessing(adId);

      const { error } = await supabase
        .from("ads")
        .update({
          status: "approved",
          moderation_score: 0.1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", adId);

      if (error) throw error;

      // Log moderation action
      await supabase.from("ad_moderation").insert({
        ad_id: adId,
        action: "approved",
        moderator_id: (await supabase.auth.getUser()).data.user?.id,
        reason: "Manually approved by admin",
        created_at: new Date().toISOString(),
      });

      toast.success("Ad approved successfully");
      fetchAds();
    } catch (error) {
      console.error("Error approving ad:", error);
      toast.error("Failed to approve ad");
    } finally {
      setProcessing(null);
    }
  };

  // Reject ad
  const rejectAd = async (adId: string, reason: string) => {
    try {
      setProcessing(adId);

      const { error } = await supabase
        .from("ads")
        .update({
          status: "rejected",
          rejection_reason: reason,
          updated_at: new Date().toISOString(),
        })
        .eq("id", adId);

      if (error) throw error;

      // Log moderation action
      await supabase.from("ad_moderation").insert({
        ad_id: adId,
        action: "rejected",
        moderator_id: (await supabase.auth.getUser()).data.user?.id,
        reason: reason,
        created_at: new Date().toISOString(),
      });

      toast.success("Ad rejected");
      setRejectionReason("");
      fetchAds();
    } catch (error) {
      console.error("Error rejecting ad:", error);
      toast.error("Failed to reject ad");
    } finally {
      setProcessing(null);
    }
  };

  // Flag ad for AI review
  const flagAd = async (adId: string) => {
    try {
      setProcessing(adId);

      const ad = ads.find((a) => a.id === adId);
      if (!ad) return;

      // Run AI moderation
      const moderationResult = await runModerationCheck(ad);

      const { error } = await supabase
        .from("ads")
        .update({
          status: moderationResult.flagged ? "flagged" : "pending_review",
          moderation_score: moderationResult.confidence,
          updated_at: new Date().toISOString(),
        })
        .eq("id", adId);

      if (error) throw error;

      // Log moderation action
      await supabase.from("ad_moderation").insert({
        ad_id: adId,
        action: moderationResult.flagged ? "flagged" : "ai_reviewed",
        moderator_id: (await supabase.auth.getUser()).data.user?.id,
        reason: moderationResult.reasons.join("; "),
        ai_confidence: moderationResult.confidence,
        ai_categories: moderationResult.categories,
        created_at: new Date().toISOString(),
      });

      toast.success(
        moderationResult.flagged
          ? `Ad flagged: ${moderationResult.reasons.join(", ")}`
          : "Ad passed AI review",
      );
      fetchAds();
    } catch (error) {
      console.error("Error flagging ad:", error);
      toast.error("Failed to run AI moderation");
    } finally {
      setProcessing(null);
    }
  };

  // Filter ads based on search and status
  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      !searchTerm ||
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.advertiser?.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_review":
        return (
          <Badge variant="outline" className="text-yellow-600">
            Pending Review
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="default" className="bg-green-600">
            Approved
          </Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "flagged":
        return (
          <Badge variant="destructive" className="bg-orange-600">
            Flagged
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get media icon
  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Ad Review & Moderation
          </h1>
          <p className="text-gray-600 mt-2">
            Review submitted ads and manage content moderation
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search ads, advertisers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={fetchAds} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Review</p>
                  <p className="text-2xl font-bold">
                    {ads.filter((ad) => ad.status === "pending_review").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Approved Today</p>
                  <p className="text-2xl font-bold text-green-600">
                    {
                      ads.filter(
                        (ad) =>
                          ad.status === "approved" &&
                          new Date(ad.created_at).toDateString() ===
                            new Date().toDateString(),
                      ).length
                    }
                  </p>
                </div>
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Flagged</p>
                  <p className="text-2xl font-bold text-red-600">
                    {ads.filter((ad) => ad.status === "flagged").length}
                  </p>
                </div>
                <Flag className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Ads</p>
                  <p className="text-2xl font-bold">{ads.length}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Submitted Ads ({filteredAds.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading ads...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ad Details</TableHead>
                    <TableHead>Advertiser</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAds.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {getMediaIcon(ad.media_type)}
                          </div>
                          <div>
                            <p className="font-medium">{ad.title}</p>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {ad.description}
                            </p>
                            {ad.campaign && (
                              <p className="text-xs text-blue-600 mt-1">
                                Campaign: {ad.campaign.name} ($
                                {ad.campaign.budget})
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {ad.advertiser?.full_name || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {ad.advertiser?.email}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        {getStatusBadge(ad.status)}
                        {ad.moderation_score && (
                          <p className="text-xs text-gray-500 mt-1">
                            AI Score: {Math.round(ad.moderation_score * 100)}%
                          </p>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(ad.created_at), "MMM d, HH:mm")}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedAd(ad)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Review Ad: {selectedAd?.title}
                                </DialogTitle>
                                <DialogDescription>
                                  Review this ad content and take appropriate
                                  action
                                </DialogDescription>
                              </DialogHeader>

                              {selectedAd && (
                                <div className="space-y-4">
                                  {/* Ad Preview */}
                                  <div className="border rounded-lg p-4">
                                    {selectedAd.media_url && (
                                      <div className="mb-4">
                                        {selectedAd.media_type === "video" ? (
                                          <video
                                            src={selectedAd.media_url}
                                            controls
                                            className="w-full max-h-64 object-cover rounded"
                                          />
                                        ) : (
                                          <img
                                            src={selectedAd.media_url}
                                            alt="Ad media"
                                            className="w-full max-h-64 object-cover rounded"
                                          />
                                        )}
                                      </div>
                                    )}

                                    <h3 className="font-semibold text-lg mb-2">
                                      {selectedAd.title}
                                    </h3>
                                    <p className="text-gray-600">
                                      {selectedAd.description}
                                    </p>
                                  </div>

                                  {/* Rejection Reason Input */}
                                  {selectedAd.status === "pending_review" && (
                                    <div className="space-y-2">
                                      <Label htmlFor="rejection-reason">
                                        Rejection Reason (if rejecting)
                                      </Label>
                                      <Textarea
                                        id="rejection-reason"
                                        value={rejectionReason}
                                        onChange={(e) =>
                                          setRejectionReason(e.target.value)
                                        }
                                        placeholder="Enter reason for rejection..."
                                        rows={3}
                                      />
                                    </div>
                                  )}

                                  {/* Action Buttons */}
                                  <div className="flex gap-2">
                                    {selectedAd.status === "pending_review" && (
                                      <>
                                        <Button
                                          onClick={() =>
                                            approveAd(selectedAd.id)
                                          }
                                          disabled={
                                            processing === selectedAd.id
                                          }
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <Check className="h-4 w-4 mr-1" />
                                          Approve
                                        </Button>

                                        <Button
                                          onClick={() =>
                                            rejectAd(
                                              selectedAd.id,
                                              rejectionReason,
                                            )
                                          }
                                          disabled={
                                            processing === selectedAd.id ||
                                            !rejectionReason
                                          }
                                          variant="destructive"
                                        >
                                          <X className="h-4 w-4 mr-1" />
                                          Reject
                                        </Button>
                                      </>
                                    )}

                                    <Button
                                      onClick={() => flagAd(selectedAd.id)}
                                      disabled={processing === selectedAd.id}
                                      variant="outline"
                                    >
                                      <Flag className="h-4 w-4 mr-1" />
                                      AI Review
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {ad.status === "pending_review" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => approveAd(ad.id)}
                                disabled={processing === ad.id}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-3 w-3" />
                              </Button>

                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedAd(ad);
                                  // Open dialog for rejection reason
                                }}
                                disabled={processing === ad.id}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => flagAd(ad.id)}
                            disabled={processing === ad.id}
                          >
                            <Flag className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {filteredAds.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                No ads found matching your criteria
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Incremental Static Regeneration for admin review
export async function getStaticProps() {
  return {
    props: {
      timestamp: new Date().toISOString(),
    },
    revalidate: 60, // Revalidate every minute
  };
}
