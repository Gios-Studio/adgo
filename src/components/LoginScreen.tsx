import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AdDelivery
          </CardTitle>
          <p className="text-muted-foreground">Choose your access level</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => navigate("/client-dashboard")}
            className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Client Login
          </Button>
          <Button
            onClick={() => navigate("/admin-dashboard")}
            variant="outline"
            className="w-full h-12 text-base font-medium border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
          >
            Admin Login
          </Button>
          <Button
            onClick={() => navigate("/ad-display")}
            variant="secondary"
            className="w-full h-12 text-base font-medium bg-gradient-to-r from-accent to-accent hover:shadow-md transition-all duration-300"
          >
            View Ad Display
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;