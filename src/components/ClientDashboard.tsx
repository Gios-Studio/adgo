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
      const mappedAds: Ad[] = data?.map(ad => ({
        id: ad.id,
        title: `Ad for ${ad.city || 'Unknown Location'}`,
        status: 'active',
        created_at: ad.created_at,
        campaign_id: ad.campaign_id,
        media_url: ad.media_url,
        city: ad.city,
        gender: ad.gender,
        language: ad.language,
        age_min: ad.age_min,
        age_max: ad.age_max
      })) || [];
      setAds(mappedAds);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast({
        title: "Error",
        description: "Failed to load ads. Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('id, name');

      if (error) {
        if (error.code === 'PGRST301' || error.message.includes('permission denied')) {
          // User setup still in progress, campaigns will load after ads setup completes
          return;
        }
        throw error;
      }
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const onSubmit = async (values: z.infer<typeof adSchema>) => {
    if (!user) return;

    try {
      // Skip organization check since organization_id doesn't exist in profiles
      // In a real implementation, you'd properly handle organization relationships

      const { error } = await supabase
        .from('ads')
        .insert({
          title: values.title,
          description: values.description,
          campaign_id: values.campaign_id,
          video_url: values.video_url,
          image_url: values.image_url,
          // Note: created_by and organization_id fields don't exist in ads table
          // This is demo data - in real implementation you'd add these fields to the database
          tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : null,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Ad created successfully',
      });

      setIsDialogOpen(false);
      form.reset();
      fetchAds();
    } catch (error) {
      console.error('Error creating ad:', error);
      toast({
        title: 'Error',
        description: 'Failed to create ad',
        variant: 'destructive',
      });
    }
  };

  const handleFileUpload = (url: string, fileName: string, type: 'image' | 'video') => {
    if (type === 'image') {
      form.setValue('image_url', url);
    } else if (type === 'video') {
      form.setValue('video_url', url);
    }
    
    toast({
      title: 'File uploaded',
      description: `${fileName} has been uploaded successfully`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'draft': return 'bg-muted text-muted-foreground';
      case 'paused': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAdTypeIcon = (ad: Ad) => {
    if (ad.video_url) return <Video className="h-5 w-5" />;
    if (ad.image_url) return <ImageIcon className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      <NavBar />
      
      <div className="container mx-auto p-6">
        <Tabs defaultValue="ads" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ads" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Ads</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Audience</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ads" className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Ad Management
                </h1>
                <p className="text-muted-foreground">
                  Create and manage your advertising content
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Ad
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Ad</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ad Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ad title" {...field} />
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Ad description" {...field} />
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
                            <FormLabel>Campaign (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a campaign" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
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
                            <FormLabel>Tags (comma separated)</FormLabel>
                            <FormControl>
                              <Input placeholder="tag1, tag2, tag3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* File Upload Sections */}
                      <div className="space-y-4">
                        <div>
                          <FormLabel>Image Upload</FormLabel>
                          <FileUpload
                            bucket="ad-assets"
                            accept="image/*"
                            maxSize={5}
                            onUpload={(url, fileName) => handleFileUpload(url, fileName, 'image')}
                          />
                        </div>
                        
                        <div>
                          <FormLabel>Video Upload</FormLabel>
                          <FileUpload
                            bucket="ad-assets"
                            accept="video/*"
                            maxSize={50}
                            onUpload={(url, fileName) => handleFileUpload(url, fileName, 'video')}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Create Ad</Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Recent Ads */}
            <Card className="border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Your Ads</span>
                </CardTitle>
                <CardDescription>
                  Manage your advertising content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ads.length === 0 ? (
                  <div className="text-center py-8">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">No ads created yet</h3>
                    <p className="text-sm text-muted-foreground">Create your first ad to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ads.map((ad) => (
                      <div key={ad.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            {getAdTypeIcon(ad)}
                          </div>
                          <div>
                            <h4 className="font-medium">{ad.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Created on {new Date(ad.created_at).toLocaleDateString()}
                            </p>
                            {ad.description && (
                              <p className="text-sm text-muted-foreground mt-1">{ad.description}</p>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(ad.status)}>
                          {ad.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {ad.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {ad.status === 'draft' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <CampaignManager />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="audience">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Audience Insights</h2>
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">Audience insights coming soon</h3>
                  <p className="text-sm text-muted-foreground">Advanced targeting and audience analysis will be available here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;