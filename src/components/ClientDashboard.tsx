import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Video, Image } from "lucide-react";

interface Ad {
  id: string;
  type: 'text' | 'video' | 'gif';
  name: string;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

const ClientDashboard = () => {
  const { toast } = useToast();
  const [ads, setAds] = useState<Ad[]>([
    { id: '1', type: 'text', name: 'Summer Sale Banner', uploadedAt: new Date(), status: 'approved' },
    { id: '2', type: 'video', name: 'Product Demo', uploadedAt: new Date(), status: 'pending' },
  ]);

  const uploadAd = (type: 'text' | 'video' | 'gif') => {
    const newAd: Ad = {
      id: Date.now().toString(),
      type,
      name: `New ${type} ad`,
      uploadedAt: new Date(),
      status: 'pending'
    };
    
    setAds(prev => [...prev, newAd]);
    toast({
      title: "Ad Uploaded Successfully",
      description: `Your ${type} ad has been uploaded and is pending approval.`,
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'gif': return <Image className="w-4 h-4" />;
      default: return <Upload className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Client Dashboard
          </h1>
          <p className="text-muted-foreground">Upload and manage your advertisements</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Text Ads</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => uploadAd('text')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-md transition-all duration-300"
              >
                Upload Text Ad
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center mx-auto mb-2">
                <Video className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Video Ads</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => uploadAd('video')}
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-md transition-all duration-300"
              >
                Upload Video Ad
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-accent to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Image className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">GIF Ads</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => uploadAd('gif')}
                className="w-full bg-gradient-to-r from-accent to-orange-500 hover:shadow-md transition-all duration-300"
              >
                Upload GIF Ad
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Your Uploaded Ads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ads.map((ad) => (
                <div key={ad.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getIcon(ad.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{ad.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Uploaded {ad.uploadedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(ad.status)}>
                    {ad.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;