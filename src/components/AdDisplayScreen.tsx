import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, X, Volume2, VolumeX } from "lucide-react";

interface Ad {
  id: string;
  type: 'video' | 'text' | 'gif';
  content: string;
  duration: number;
  position: 'background' | 'notification' | 'banner';
}

const AdDisplayScreen = () => {
  const [currentAds, setCurrentAds] = useState<Ad[]>([
    {
      id: '1',
      type: 'video',
      content: 'Background Video Advertisement',
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Video Ad Placeholder */}
      {backgroundAd && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <Play className="w-16 h-16 ml-2" />
              </div>
              <h2 className="text-3xl font-bold">{backgroundAd.content}</h2>
              <p className="text-white/80">Premium advertisement space</p>
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => setMuted(!muted)}
              className="w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      {/* Ride-hailing App UI Overlay */}
      <div className="relative z-10 p-6">
        {/* Status Bar */}
        <div className="flex justify-between items-center text-white mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">Online</span>
          </div>
          <div className="text-sm font-medium">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Banner Ad */}
        {bannerAd && (
          <Card className="mb-6 bg-gradient-to-r from-accent/90 to-orange-500/90 border-0 text-white shadow-lg">
            <div className="p-4 text-center">
              <p className="font-medium">{bannerAd.content}</p>
            </div>
          </Card>
        )}

        {/* Main App Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-4">RideApp Dashboard</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-white/20 border-white/30 text-white">
              <div className="p-4 text-center">
                <h3 className="font-semibold">Current Rides</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
            </Card>
            <Card className="bg-white/20 border-white/30 text-white">
              <div className="p-4 text-center">
                <h3 className="font-semibold">Today's Earnings</h3>
                <p className="text-2xl font-bold">$284</p>
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            {['Pickup at Downtown Mall', 'Airport Transfer', 'City Center Drop'].map((ride, index) => (
              <div key={index} className="bg-white/20 rounded-lg p-3 border border-white/30">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{ride}</span>
                  <Badge className="bg-green-500/80 text-white">Active</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Notification Ad */}
      {notificationAd && showNotification && (
        <div className="fixed bottom-6 right-6 z-20 animate-in slide-in-from-right duration-500">
          <Card className="bg-gradient-to-r from-primary/95 to-primary-glow/95 border-0 text-white shadow-2xl max-w-sm">
            <div className="p-4 pr-12 relative">
              <button
                onClick={() => setShowNotification(false)}
                className="absolute top-2 right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="font-medium">{notificationAd.content}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                <span className="text-xs text-white/80">Advertisement</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Ad Analytics Info */}
      <div className="fixed top-4 left-4 z-20">
        <Card className="bg-black/50 border-white/20 text-white backdrop-blur-sm">
          <div className="p-3 text-xs space-y-1">
            <div>Active Ads: {currentAds.length}</div>
            <div>Views: 1,247</div>
            <div>Revenue: $45.60</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdDisplayScreen;