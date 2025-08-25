import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import RoleSelection from "./RoleSelection";
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: isSignUp ? "Account created successfully!" : "Signed in successfully!",
        });
        setShowRoleSelection(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Google Sign-in Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Signed in with Google successfully!",
      });
      setShowRoleSelection(true);
    }
    setLoading(false);
  };

  if (showRoleSelection) {
    return <RoleSelection onRoleSelect={() => setShowRoleSelection(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center mb-8">
            <img 
              src="/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png" 
              alt="AdGo Logo" 
              className="h-12 w-auto mr-3"
            />
            <span className="text-2xl font-bold">AdGo</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">
            Welcome to the Future of
            <span className="block text-accent">Targeted Advertising</span>
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of advertisers who've increased their ROI by 300% with our 
            hyper-targeted advertising platform powered by AI and real-time analytics.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-lg">AI-powered geo-targeting & behavioral insights</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-lg">Real-time analytics & performance tracking</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-lg">Automated campaign optimization tools</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-accent">1000+</div>
                <div className="text-sm opacity-80">Active Advertisers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">300%</div>
                <div className="text-sm opacity-80">Avg. ROI Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">99.9%</div>
                <div className="text-sm opacity-80">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              {isSignUp 
                ? "Join AdGo and start creating targeted campaigns that convert" 
                : "Sign in to your AdGo dashboard and grow your business"
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Sign-in */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full h-12 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 font-semibold"
            >
              <Chrome className="mr-2 h-5 w-5 text-primary" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground font-medium">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-5 w-5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

            <Button 
              type="submit" 
              disabled={loading || !email || !password}
              className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold text-lg"
            >
              {loading ? "Please wait..." : (isSignUp ? "🚀 Create Account" : "✨ Sign In")}
            </Button>
            </form>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-2 text-primary hover:underline font-semibold"
                >
                  {isSignUp ? "Sign in here" : "Create account"}
                </button>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/demo")}
                  className="flex-1 h-10 text-primary hover:bg-primary/10 font-medium"
                >
                  🎥 View Demo
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/ad-display")}
                  className="flex-1 h-10 text-primary hover:bg-primary/10 font-medium"
                >
                  📺 Ad Display
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;