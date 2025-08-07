import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, X, Volume2, VolumeX, ArrowLeft, MapPin, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Ad {
  id: string;
  type: 'video' | 'text' | 'gif';
  content: string;
  duration: number;
  position: 'background' | 'notification' | 'banner';
}

const AdDisplayScreen = () => {
  const navigate = useNavigate();
  const [currentAds, setCurrentAds] = useState<Ad[]>([
    {
      id: '1',
      type: 'video',
      content: 'AdGo Premium Advertisement',
      duration: 30,
      position: 'background'
    },
    {
      id: '2',
      type: 'text',
      content: '🎉 Special Offer: 50% off your next ride! Use code SAVE50',
      duration: 10,
      position: 'notification'
    },
    {
      id: '3',
      type: 'text',
      content: 'Download our new app for exclusive deals',
      duration: 15,
      position: 'banner'
    }
  ]);
  
  const [muted, setMuted] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-hide notification after duration
    const notificationAd = currentAds.find(ad => ad.position === 'notification');
    if (notificationAd && showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, notificationAd.duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentAds, showNotification]);

  const backgroundAd = currentAds.find(ad => ad.position === 'background');
  const bannerAd = currentAds.find(ad => ad.position === 'banner');
  const notificationAd = currentAds.find(ad => ad.position === 'notification');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/80d624a8-a3ff-4e94-a942-65dc5933071d.png" 
                alt="AdGo Icon" 
                className="h-12 w-auto" 
              />
              <div>
                <h1 className="text-xl font-bold">AdGo Display</h1>
                <p className="text-sm text-muted-foreground">Live Ad Preview</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Live
            </Badge>
            <span className="text-sm text-muted-foreground">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Background Video Ad */}
        {backgroundAd && (
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Background Advertisement
                <Badge>Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg" />
                <div className="relative text-center space-y-4">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                    <Play className="w-12 h-12 ml-1 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{backgroundAd.content}</h2>
                  <p className="text-muted-foreground">Premium advertisement space</p>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setMuted(!muted)}
                  >
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main App Simulation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner Ad */}
            {bannerAd && (
              <Card className="bg-gradient-to-r from-accent to-primary border-0 text-white">
                <CardContent className="p-4 text-center">
                  <p className="font-medium">{bannerAd.content}</p>
                </CardContent>
              </Card>
            )}

            {/* Ride App Simulation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>RideApp Dashboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-muted-foreground">Current Rides</h3>
                      <p className="text-2xl font-bold text-primary">12</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-muted-foreground">Today's Earnings</h3>
                      <p className="text-2xl font-bold text-primary">$284</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Active Rides</h3>
                  {[
                    { location: 'Downtown Mall', time: '5 min', amount: '$12' },
                    { location: 'Airport Transfer', time: '15 min', amount: '$45' },
                    { location: 'City Center Drop', time: '8 min', amount: '$18' }
                  ].map((ride, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{ride.location}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{ride.time}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm font-medium">
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

          {/* Ad Analytics Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ad Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Ads</span>
                    <span className="font-medium">{currentAds.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Views</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <span className="font-medium text-primary">$45.60</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">CTR</span>
                    <span className="font-medium">3.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ad Queue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentAds.map((ad) => (
                  <div key={ad.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{ad.position}</Badge>
                      <span className="text-xs text-muted-foreground">{ad.duration}s</span>
                    </div>
                    <p className="text-sm">{ad.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Notification Ad */}
      {notificationAd && showNotification && (
        <div className="fixed bottom-6 right-6 z-20 animate-in slide-in-from-right duration-500">
          <Card className="bg-gradient-to-r from-primary to-primary-glow border-0 text-white shadow-lg max-w-sm">
            <CardContent className="p-4 pr-12 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotification(false)}
                className="absolute top-2 right-2 w-6 h-6 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
              <p className="font-medium">{notificationAd.content}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                <span className="text-xs text-white/80">Advertisement</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdDisplayScreen;