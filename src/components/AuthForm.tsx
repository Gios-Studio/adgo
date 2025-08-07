import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import adgoLogo from '@/assets/adgo-logo.png';

export const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
        if (isSignUp) {
          toast({
            title: "Account Created",
            description: "Please check your email to verify your account.",
          });
        } else {
          navigate('/client-dashboard');
        }
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
        title: "Google Sign In Error",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex">
      {/* Left Half - Logo and Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary-glow p-12 flex-col justify-center items-center text-primary-foreground">
        <div className="max-w-md text-center space-y-6">
          <img 
            src={adgoLogo} 
            alt="AdGo Logo" 
            className="h-24 w-auto mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold">Welcome to AdGo</h1>
          <p className="text-xl opacity-90">
            The modern platform for managing your advertising campaigns with precision and ease.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
              <span>Real-time analytics and insights</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
              <span>Campaign scheduling and management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
              <span>Budget optimization tools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center space-y-2">
            <div className="lg:hidden mb-4">
              <img 
                src={adgoLogo} 
                alt="AdGo Logo" 
                className="h-16 w-auto mx-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <p className="text-muted-foreground">
              {isSignUp 
                ? 'Start managing your campaigns today' 
                : 'Welcome back to AdGo'
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="w-full h-12"
              disabled={loading}
            >
              Continue with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </form>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                onClick={() => navigate("/demo")}
                variant="secondary"
                className="h-12 text-base font-medium bg-gradient-to-r from-accent to-accent hover:shadow-md transition-all duration-300"
              >
                View Demo
              </Button>
              <Button
                onClick={() => navigate("/ad-display")}
                variant="outline"
                className="h-12 text-base font-medium border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
              >
                Ad Display
              </Button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};