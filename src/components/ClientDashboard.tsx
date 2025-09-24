import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Upload, FileText, Video, Image as ImageIcon, Calendar, CheckCircle, Clock, AlertCircle, Plus, BarChart3, Target, Users } from 'lucide-react';
import { NavBar } from './NavBar';
import { CampaignManager } from './CampaignManager';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { FileUpload } from './FileUpload';

const adSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  campaign_id: z.string().optional(),
  tags: z.string().optional(),
  video_url: z.string().optional(),
  image_url: z.string().optional(),
});

interface Ad {
  id: string;
  title: string;
  description?: string;
  video_url?: string;
  image_url?: string;
  status: string;
  created_at: string;
  campaign_id?: string;
  tags?: string[];
  // Database fields from actual ads table
  media_url?: string;
  city?: string;
  gender?: string;
  language?: string;
  age_min?: number;
  age_max?: number;
}

interface Campaign {
  id: string;
  name: string;
}

const ClientDashboard = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof adSchema>>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (user) {
      fetchAds();
      fetchCampaigns();
    }
  }, [user]);

  const fetchAds = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST301' || error.message.includes('permission denied')) {
          toast({
            title: "Setting up your account",
            description: "Please wait while we prepare your dashboard...",
          });
          // Refresh after a moment to allow user setup to complete
          setTimeout(() => window.location.reload(), 2000);
          return;
        }
        throw error;
      }
      // Map the database data to match our interface
      const formattedAds: Ad[] = data?.map(ad => ({
        id: ad.id,
        title: (ad as any).title || `Ad for ${ad.city || 'Unknown Location'}`,
        description: (ad as any).description || `Targeting ${ad.city || 'various locations'}`,
        media_url: ad.media_url || undefined,
        status: 'active', // Default status since status field doesn't exist
        created_at: ad.created_at || new Date().toISOString(),
        campaign_id: ad.campaign_id || undefined,
        tags: (ad as any).tags ? (Array.isArray((ad as any).tags) ? (ad as any).tags : [(ad as any).tags]) : [],
        city: ad.city || undefined,
        gender: ad.gender || undefined,
        language: ad.language || undefined,
        age_min: ad.age_min || undefined,
        age_max: ad.age_max || undefined
      })) || [];

      setAds(formattedAds);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast({
        title: "Error",
        description: "Failed to load ads. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('id, name')
        .order('created_at', { ascending: false });

      if (error) {
        // If campaigns table doesn't exist, just continue without campaigns
        console.log('Campaigns table not available:', error);
        return;
      }

      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const onSubmit = async (values: z.infer<typeof adSchema>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ads')
        .insert([
          {
            title: values.title,
            description: values.description,
            campaign_id: values.campaign_id,
            tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
            media_url: values.image_url || values.video_url,
            user_id: user.id,
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Ad created successfully.",
      });

      // Reset form and close dialog
      form.reset();
      setIsDialogOpen(false);
      
      // Refresh ads list
      fetchAds();
    } catch (error) {
      console.error('Error creating ad:', error);
      toast({
        title: "Error",
        description: "Failed to create ad. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (url: string, fileName: string, type: 'image' | 'video') => {
    if (type === 'image') {
      form.setValue('image_url', url);
    } else {
      form.setValue('video_url', url);
    }
    
    toast({
      title: "File uploaded successfully",
      description: `${fileName} has been uploaded.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-cosmic-accent/10 text-cosmic-accent border-cosmic-accent/30';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
        return 'bg-muted text-muted-foreground border-border';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getAdTypeIcon = (ad: Ad) => {
    if (ad.media_url) {
      if (ad.media_url.includes('.mp4') || ad.media_url.includes('video')) {
        return <Video className="h-4 w-4 text-cosmic-accent" />;
      } else {
        return <ImageIcon className="h-4 w-4 text-cosmic-accent" />;
      }
    }
    return <FileText className="h-4 w-4 text-cosmic-accent" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 cosmic-grid opacity-20"></div>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cosmic-accent"></div>
            </div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      <NavBar />
      
      <div className="w-full py-20 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          <Tabs defaultValue="ads" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="ads" className="flex items-center space-x-2 data-[state=active]:bg-card data-[state=active]:text-foreground">
                <Upload className="h-4 w-4" />
                <span>Ads</span>
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="flex items-center space-x-2 data-[state=active]:bg-card data-[state=active]:text-foreground">
                <Target className="h-4 w-4" />
                <span>Campaigns</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2 data-[state=active]:bg-card data-[state=active]:text-foreground">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="audience" className="flex items-center space-x-2 data-[state=active]:bg-card data-[state=active]:text-foreground">
                <Users className="h-4 w-4" />
                <span>Audience</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ads" className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                  Ad Management
                </h2>
                <p className="text-muted-foreground text-lg">
                  Create and manage your advertising content
                </p>
              </div>
              
              <div className="flex justify-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-cosmic-accent hover:bg-cosmic-accent/90 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Ad
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Create New Ad</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter ad title" {...field} className="border-border" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter ad description" 
                                  {...field} 
                                  className="border-border"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="campaign_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Campaign (Optional)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-border">
                                    <SelectValue placeholder="Select a campaign" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-card border-border">
                                  {campaigns.map((campaign) => (
                                    <SelectItem key={campaign.id} value={campaign.id}>
                                      {campaign.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="tags"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Tags (comma-separated)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., sports, lifestyle, tech" 
                                  {...field} 
                                  className="border-border"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <FormLabel className="text-foreground">Image Upload</FormLabel>
                            <FileUpload
                              bucket="ad-assets"
                              accept="image/*"
                              maxSize={5}
                              onUpload={(url, fileName) => handleFileUpload(url, fileName, 'image')}
                            />
                          </div>
                          
                          <div>
                            <FormLabel className="text-foreground">Video Upload</FormLabel>
                            <FileUpload
                              bucket="ad-assets"
                              accept="video/*"
                              maxSize={50}
                              onUpload={(url, fileName) => handleFileUpload(url, fileName, 'video')}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border">
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-cosmic-accent hover:bg-cosmic-accent/90 text-white">Create Ad</Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Recent Ads */}
              <div className="p-6 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
                    <Calendar size={24} className="text-cosmic-accent" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">Your Ads</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Manage your advertising content
                    </p>
                  </div>
                </div>
                <div>
                  {ads.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="h-8 w-8 text-cosmic-accent" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2">No ads created yet</h3>
                      <p className="text-sm text-muted-foreground">Create your first ad to get started</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {ads.map((ad) => (
                        <div key={ad.id} className="p-6 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
                              {getAdTypeIcon(ad)}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-foreground">{ad.title}</h3>
                                <Badge className={getStatusColor(ad.status)}>
                                  {ad.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                                  {ad.status}
                                </Badge>
                              </div>
                              {ad.description && (
                                <p className="text-sm text-muted-foreground">{ad.description}</p>
                              )}
                              <p className="text-sm text-muted-foreground">
                                {new Date(ad.created_at).toLocaleDateString()}
                              </p>
                              {ad.tags && ad.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {ad.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs border-border">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="campaigns">
              <CampaignManager />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="audience" className="space-y-6">
              <div className="p-6 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
                    <Users size={24} className="text-cosmic-accent" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">Audience Insights</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Advanced audience analytics and targeting insights
                    </p>
                  </div>
                </div>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-cosmic-accent" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced audience insights and targeting features are coming soon.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;