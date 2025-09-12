import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  BarChart3, 
  Globe, 
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Play,
  MapPin,
  Eye,
  DollarSign,
  Rocket,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [monthlyAdSpend, setMonthlyAdSpend] = useState("");
  const [willingToPay, setWillingToPay] = useState("");
  const [primaryChallenge, setPrimaryChallenge] = useState("");
  const [interestedFeatures, setInterestedFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to join the waitlist.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // In a real app, this would send to your backend/analytics
      const signupData = {
        email,
        companySize,
        monthlyAdSpend,
        primaryChallenge,
        willingToPay,
        timestamp: new Date().toISOString(),
      };
      
      console.log("Waitlist signup:", signupData);
      
      toast({
        title: "🎉 Welcome to AdGo!",
        description: "You're on the waitlist! We'll notify you when early access opens.",
      });
      
      // Reset form
      setEmail("");
      setCompanySize("");
      setMonthlyAdSpend("");
      setPrimaryChallenge("");
      setWillingToPay("");
      
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Target,
      title: "Hyper-Targeted Campaigns",
      description: "AI-powered targeting that reaches your ideal customers with surgical precision across multiple channels.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Monitor performance with live dashboards and actionable insights that help you optimize on the fly.",
    },
    {
      icon: MapPin,
      title: "Geo-Location Intelligence",
      description: "Target by location, demographics, and behavior patterns to maximize local and regional impact.",
    },
    {
      icon: Zap,
      title: "Automated Optimization",
      description: "Let AI automatically adjust your campaigns for maximum ROI while you focus on strategy.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png" 
                alt="AdGo Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AdGo
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost"
                onClick={() => navigate("/login")}
                className="hover:bg-primary/10"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
                🚀 Now in Beta - Join 1000+ Early Adopters
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Hyper-Targeted
                </span>
                <br />
                <span className="text-foreground">Advertising That</span>
                <br />
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Actually Works
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Stop wasting ad spend on broad audiences. AdGo uses AI-powered geo-targeting 
                and behavioral insights to deliver your ads to the right people, at the right time, 
                in the right location.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
                >
                  Join Waitlist <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/demo")}
                  className="border-primary/20 hover:bg-primary/5 text-lg px-8 py-4"
                >
                  Watch Demo <Play className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              {/* Social Proof */}
              <div className="mt-12 pt-8 border-t border-border/50">
                <div className="flex items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-white" />
                      ))}
                    </div>
                    <span>1000+ advertisers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>4.9/5 rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>300% avg. ROI</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-border/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Campaign Dashboard</h3>
                    <Badge className="bg-primary/10 text-primary">Live</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <Eye className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold text-primary">42.5K</div>
                      <div className="text-xs text-muted-foreground">Impressions</div>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <Target className="h-6 w-6 mx-auto mb-2 text-accent" />
                      <div className="text-2xl font-bold text-accent">8.4%</div>
                      <div className="text-xs text-muted-foreground">CTR</div>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold text-primary">$1.20</div>
                      <div className="text-xs text-muted-foreground">CPC</div>
                    </div>
                  </div>
                  
                  <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary mr-2" />
                    <span className="text-muted-foreground">Geo-targeting Heatmap</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold">
                Real-time Analytics
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold">
                AI-Powered Targeting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Why AdGo is Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Traditional advertising platforms waste your budget on unqualified leads. AdGo's AI-powered 
              platform ensures every dollar spent reaches your ideal customer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Proven Results Across Industries
            </h2>
            <p className="text-xl opacity-90">
              Don't just take our word for it - see what our platform delivers
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">300%</div>
              <div className="text-accent opacity-90">Average ROI Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">89%</div>
              <div className="text-accent opacity-90">Reduction in CAC</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-accent opacity-90">Active Advertisers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$50M+</div>
              <div className="text-accent opacity-90">Ad Spend Optimized</div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Join the AdGo Revolution
            </h2>
            <p className="text-xl text-muted-foreground">
              Get early access to the platform that's changing how businesses advertise. 
              Plus, help us validate our pricing with your input.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Join the Waitlist
              </CardTitle>
              <p className="text-center text-muted-foreground text-lg">
                Be among the first to experience hyper-targeted advertising that actually works
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleWaitlistSignup}>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                  
                  <div>
                    <select
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-full h-12 p-3 border rounded-md bg-background"
                    >
                      <option value="">Company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201+">201+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block text-primary">Monthly Ad Spend</label>
                  <RadioGroup value={monthlyAdSpend} onValueChange={setMonthlyAdSpend}>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "<$1K", label: "Less than $1,000" },
                        { value: "$1K-$5K", label: "$1,000 - $5,000" },
                        { value: "$5K-$20K", label: "$5,000 - $20,000" },
                        { value: "$20K+", label: "$20,000+" }
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-primary/5 transition-colors">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="text-sm cursor-pointer">{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block text-primary">
                    What's your biggest advertising challenge?
                  </label>
                  <RadioGroup value={primaryChallenge} onValueChange={setPrimaryChallenge}>
                    <div className="space-y-2">
                      {[
                        "Low conversion rates",
                        "High cost per acquisition",
                        "Poor targeting accuracy", 
                        "Difficulty measuring ROI",
                        "Managing multiple campaigns"
                      ].map((challenge) => (
                        <div key={challenge} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                          <RadioGroupItem value={challenge} id={challenge} />
                          <Label htmlFor={challenge} className="text-sm cursor-pointer">{challenge}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block text-accent">
                    💰 Would you pay for a solution that increases ad ROI by 300%?
                  </label>
                  <RadioGroup value={willingToPay} onValueChange={setWillingToPay}>
                    <div className="space-y-2">
                      {[
                        { value: "yes", label: "Yes, absolutely! Show me pricing", color: "text-green-600" },
                        { value: "maybe", label: "Maybe, depends on pricing and features", color: "text-yellow-600" },
                        { value: "no", label: "No, looking for free solutions only", color: "text-red-600" }
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-primary/5 transition-colors">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className={`text-sm cursor-pointer ${option.color}`}>
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  type="submit"
                  disabled={loading || !email}
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-lg font-semibold"
                >
                  {loading ? "Joining..." : "🚀 Join Waitlist & Get Early Access"}
                </Button>
              </form>

              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  We'll never spam you. Unsubscribe at any time.
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    GDPR Compliant
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    No Credit Card Required
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png" 
                  alt="AdGo Logo" 
                  className="h-8 w-auto mr-2"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AdGo
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                The future of hyper-targeted advertising. 
                Reach your ideal customers with AI-powered precision.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">Twitter</Button>
                <Button variant="outline" size="sm">LinkedIn</Button>
                <Button variant="outline" size="sm">GitHub</Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-primary">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-primary">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AdGo. All rights reserved. Built with precision, powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;