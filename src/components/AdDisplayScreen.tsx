import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  X, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign,
  Radio,
  Zap,
  Target,
  TrendingUp,
  Users,
  Eye,
  Settings,
  RefreshCw,
  Maximize2,
  Minimize2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Ad {
  id: string;
  title: string;
  type: 'video' | 'text' | 'gif' | 'image';
  content: string;
  duration: number;
  position: 'background' | 'notification' | 'banner' | 'overlay';
  image_url?: string;
  video_url?: string;
  target_audience?: any;
  priority: number;
  status: string;
  organization_name?: string;
  budget_total?: number;
}

interface AdAnalytics {
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  activeViewers: number;
}

const AdDisplayScreen = () => {
  const navigate = useNavigate();
  
  // State management
  const [currentAds, setCurrentAds] = useState<Ad[]>([]);
  const [analytics, setAnalytics] = useState<AdAnalytics>({
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
    ctr: 0,
    activeViewers: 0
  });
  
  const [muted, setMuted] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [adProgress, setAdProgress] = useState(0);

  // Load ads and analytics data
  useEffect(() => {
    loadActiveAds();
    loadAnalytics();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      loadAnalytics();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Manage ad rotation
  useEffect(() => {
    if (currentAds.length === 0) return;

    const currentAd = currentAds[currentAdIndex];
    if (!currentAd) return;

    const progressTimer = setInterval(() => {
      setAdProgress(prev => {
        const newProgress = prev + (100 / (currentAd.duration || 30));
        if (newProgress >= 100) {
          // Move to next ad
          setCurrentAdIndex(prevIndex => 
            prevIndex >= currentAds.length - 1 ? 0 : prevIndex + 1
          );
          return 0;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(progressTimer);
  }, [currentAds, currentAdIndex]);

  // Auto-hide notification
  useEffect(() => {
    const notificationAd = currentAds.find(ad => ad.position === 'notification');
    if (notificationAd && showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
        setTimeout(() => setShowNotification(true), 5000); // Show again after 5 seconds
      }, (notificationAd.duration || 10) * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentAds, showNotification]);

  const loadActiveAds = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select(`
          *,
          organizations(name)
        `)
        .eq('status', 'active')
        .eq('is_active', true)
        .order('priority', { ascending: false })
        .limit(10);

      if (error) throw error;

      const formattedAds: Ad[] = data?.map(ad => ({
        id: ad.id,
        title: ad.title || 'Untitled Ad',
        type: ad.video_url ? 'video' : ad.image_url ? 'image' : 'text',
        content: ad.description || ad.title || 'Advertisement',
        duration: 30, // Default duration
        position: determineAdPosition(ad.priority || 1),
        image_url: ad.image_url,
        video_url: ad.video_url,
        target_audience: ad.target_audience,
        priority: ad.priority || 1,
        status: ad.status,
        organization_name: ad.organizations?.name,
        budget_total: parseFloat(String(ad.budget_total || 0))
      })) || [];

      setCurrentAds(formattedAds);
    } catch (error) {
      console.error('Error loading ads:', error);
      // Set fallback demo ads
      setCurrentAds([
        {
          id: 'demo-1',
          title: 'AdGo Premium Advertisement',
          type: 'video',
          content: 'Experience the future of advertising with AdGo Premium',
          duration: 30,
          position: 'background',
          priority: 5,
          status: 'active'
        },
        {
          id: 'demo-2',
          title: 'Special Offer',
          type: 'text',
          content: '🎉 Special Offer: 50% off your next ride! Use code SAVE50',
          duration: 10,
          position: 'notification',
          priority: 3,
          status: 'active'
        },
        {
          id: 'demo-3',
          title: 'Download Our App',
          type: 'text',
          content: 'Download our new app for exclusive deals and faster service',
          duration: 15,
          position: 'banner',
          priority: 2,
          status: 'active'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('ad_analytics')
        .select('*')
        .gte('date', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // Last 24 hours

      if (error) throw error;

      if (data && data.length > 0) {
        const totalImpressions = data.reduce((sum, item) => sum + (item.impressions || 0), 0);
        const totalClicks = data.reduce((sum, item) => sum + (item.clicks || 0), 0);
        const totalConversions = data.reduce((sum, item) => sum + (item.conversions || 0), 0);
        const totalRevenue = data.reduce((sum, item) => sum + parseFloat(String(item.revenue || 0)), 0);

        setAnalytics({
          impressions: totalImpressions,
          clicks: totalClicks,
          conversions: totalConversions,
          revenue: totalRevenue,
          ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
          activeViewers: Math.floor(Math.random() * 50) + 10 // Simulated active viewers
        });
      } else {
        // Set demo analytics
        setAnalytics({
          impressions: 1247 + Math.floor(Math.random() * 100),
          clicks: 42 + Math.floor(Math.random() * 10),
          conversions: 8 + Math.floor(Math.random() * 3),
          revenue: 45.60 + Math.random() * 10,
          ctr: 3.2 + Math.random(),
          activeViewers: Math.floor(Math.random() * 50) + 10
        });
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const determineAdPosition = (priority: number): Ad['position'] => {
    if (priority >= 5) return 'background';
    if (priority >= 3) return 'overlay';
    if (priority >= 2) return 'banner';
    return 'notification';
  };

  const trackAdImpression = async (adId: string) => {
    try {
      // In a real implementation, this would update analytics
      console.log(`Tracked impression for ad: ${adId}`);
    } catch (error) {
      console.error('Error tracking impression:', error);
    }
  };

  const trackAdClick = async (adId: string) => {
    try {
      // In a real implementation, this would update analytics
      console.log(`Tracked click for ad: ${adId}`);
      setAnalytics(prev => ({
        ...prev,
        clicks: prev.clicks + 1,
        ctr: prev.impressions > 0 ? ((prev.clicks + 1) / prev.impressions) * 100 : 0
      }));
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const backgroundAd = currentAds.find(ad => ad.position === 'background');
  const bannerAd = currentAds.find(ad => ad.position === 'banner');
  const notificationAd = currentAds.find(ad => ad.position === 'notification');
  const overlayAd = currentAds.find(ad => ad.position === 'overlay');
  const currentAd = currentAds[currentAdIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-moss-50 to-moss-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-moss-600 mx-auto" />
          <p className="text-moss-700">Loading ad display...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-moss-50 to-moss-100 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <header className="border-b border-moss-200 bg-white/90 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-moss-700 hover:text-moss-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/432b313b-850e-401d-9c55-a5e592080ec0.png" 
                alt="AdGo Icon" 
                className="h-12 w-auto" 
              />
              <div>
                <h1 className="text-xl font-bold text-moss-900">AdGo Display</h1>
                <p className="text-sm text-moss-600">Live Ad Streaming</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Radio className="h-4 w-4 text-green-500 animate-pulse" />
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Live • {analytics.activeViewers} viewers
              </Badge>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="border-moss-300 text-moss-700 hover:bg-moss-50"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            
            <span className="text-sm text-moss-600 font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Background Video Ad */}
        {backgroundAd && (
          <Card className="overflow-hidden border-moss-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-moss-900">
                  <Zap className="h-5 w-5" />
                  Premium Advertisement Space
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                  {backgroundAd.organization_name && (
                    <Badge variant="outline" className="border-moss-300 text-moss-700">
                      {backgroundAd.organization_name}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-moss-100 via-moss-50 to-moss-100 rounded-lg p-8 min-h-[300px] flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                   onClick={() => trackAdClick(backgroundAd.id)}>
                <div className="absolute inset-0 bg-gradient-to-br from-moss-200/20 to-moss-300/20 rounded-lg" />
                <div className="relative text-center space-y-4">
                  {backgroundAd.image_url ? (
                    <img 
                      src={backgroundAd.image_url} 
                      alt={backgroundAd.title}
                      className="max-w-md max-h-48 mx-auto rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-moss-300/30 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                      <Play className="w-12 h-12 ml-1 text-moss-700" />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-moss-900">{backgroundAd.title}</h2>
                  <p className="text-moss-700 max-w-lg">{backgroundAd.content}</p>
                  {backgroundAd.budget_total && (
                    <p className="text-sm text-moss-600">Campaign Budget: ${backgroundAd.budget_total.toLocaleString()}</p>
                  )}
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMuted(!muted);
                    }}
                    className="bg-white/80 backdrop-blur-sm"
                  >
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Progress Bar */}
                {currentAd?.id === backgroundAd.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-moss-200">
                    <div 
                      className="h-full bg-moss-600 transition-all duration-1000"
                      style={{ width: `${adProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main App Simulation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner Ad */}
            {bannerAd && (
              <Card className="bg-gradient-to-r from-moss-500 to-moss-600 border-0 text-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => trackAdClick(bannerAd.id)}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Target className="h-4 w-4" />
                    <p className="font-medium">{bannerAd.content}</p>
                  </div>
                  {bannerAd.organization_name && (
                    <p className="text-xs text-moss-100 mt-1">Sponsored by {bannerAd.organization_name}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Ride App Simulation */}
            <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-moss-900">
                  <MapPin className="w-5 h-5 text-moss-600" />
                  <span>RideApp Dashboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-moss-200">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-moss-600">Current Rides</h3>
                      <p className="text-2xl font-bold text-moss-800">12</p>
                    </CardContent>
                  </Card>
                  <Card className="border-moss-200">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-moss-600">Today's Earnings</h3>
                      <p className="text-2xl font-bold text-moss-800">$284</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-moss-900">Active Rides</h3>
                  {[
                    { location: 'Downtown Mall', time: '5 min', amount: '$12' },
                    { location: 'Airport Transfer', time: '15 min', amount: '$45' },
                    { location: 'City Center Drop', time: '8 min', amount: '$18' }
                  ].map((ride, index) => (
                    <Card key={index} className="border border-moss-200">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 text-moss-600" />
                            <span className="font-medium text-moss-900">{ride.location}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-sm text-moss-600">
                              <Clock className="w-3 h-3" />
                              <span>{ride.time}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm font-medium text-moss-900">
                              <DollarSign className="w-3 h-3" />
                              <span>{ride.amount}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Analytics Sidebar */}
          <div className="space-y-6">
            <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-moss-900">
                  <TrendingUp className="w-5 h-5" />
                  Live Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-moss-600 flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Impressions (24h)
                    </span>
                    <span className="font-medium text-moss-900">{analytics.impressions.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-moss-600">Clicks</span>
                    <span className="font-medium text-moss-900">{analytics.clicks}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-moss-600">Conversions</span>
                    <span className="font-medium text-green-700">{analytics.conversions}</span>
                  </div>
                  
                  <Separator className="bg-moss-200" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-moss-600">Revenue</span>
                    <span className="font-medium text-moss-900">${analytics.revenue.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-moss-600">CTR</span>
                    <span className="font-medium text-moss-900">{analytics.ctr.toFixed(2)}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-moss-600 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Active Viewers
                    </span>
                    <span className="font-medium text-green-600">{analytics.activeViewers}</span>
                  </div>
                </div>

                <Button 
                  onClick={loadAnalytics}
                  variant="outline" 
                  size="sm" 
                  className="w-full border-moss-300 text-moss-700 hover:bg-moss-50"
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Refresh Stats
                </Button>
              </CardContent>
            </Card>

            <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-moss-900">
                  <Settings className="w-5 h-5" />
                  Ad Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentAds.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="text-moss-600 text-sm">No ads in queue</div>
                  </div>
                ) : (
                  currentAds.map((ad, index) => (
                    <div key={ad.id} className={`p-3 border rounded-lg space-y-2 transition-all duration-300 ${
                      index === currentAdIndex ? 'border-moss-400 bg-moss-50' : 'border-moss-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <Badge 
                          variant="outline" 
                          className={`text-xs border-moss-300 ${
                            index === currentAdIndex ? 'bg-moss-100 text-moss-800' : 'text-moss-700'
                          }`}
                        >
                          {ad.position}
                        </Badge>
                        <span className="text-xs text-moss-600">{ad.duration}s</span>
                      </div>
                      <p className="text-sm text-moss-900 font-medium">{ad.title}</p>
                      <p className="text-xs text-moss-600 line-clamp-2">{ad.content}</p>
                      {ad.organization_name && (
                        <p className="text-xs text-moss-500">by {ad.organization_name}</p>
                      )}
                      {index === currentAdIndex && (
                        <Progress value={adProgress} className="h-1" />
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Overlay Ad */}
      {overlayAd && (
        <div className="fixed top-20 right-6 z-30 animate-in slide-in-from-right duration-500">
          <Card className="bg-gradient-to-r from-moss-600 to-moss-700 border-0 text-white shadow-xl max-w-sm cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                onClick={() => trackAdClick(overlayAd.id)}>
            <CardContent className="p-4 pr-12 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  // Hide overlay ad temporarily
                }}
                className="absolute top-2 right-2 w-6 h-6 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="space-y-2">
                <h3 className="font-semibold">{overlayAd.title}</h3>
                <p className="text-sm text-moss-100">{overlayAd.content}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                  <span className="text-xs text-white/80">Sponsored Content</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Notification Ad */}
      {notificationAd && showNotification && (
        <div className="fixed bottom-6 right-6 z-20 animate-in slide-in-from-bottom duration-500">
          <Card className="bg-gradient-to-r from-moss-500 to-moss-600 border-0 text-white shadow-lg max-w-sm cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => trackAdClick(notificationAd.id)}>
            <CardContent className="p-4 pr-12 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotification(false);
                }}
                className="absolute top-2 right-2 w-6 h-6 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="space-y-2">
                <h3 className="font-semibold">{notificationAd.title}</h3>
                <p className="text-sm">{notificationAd.content}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                  <span className="text-xs text-white/80">Advertisement</span>
                  {notificationAd.organization_name && (
                    <span className="text-xs text-white/60">• {notificationAd.organization_name}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdDisplayScreen;