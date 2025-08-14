import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Rocket, Shield, Zap, Target, BarChart3, Users, TrendingUp, Star, ArrowRight, Play } from "lucide-react";
import { toast } from "sonner";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [willingToPay, setWillingToPay] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && willingToPay) {
      // In a real app, this would send to your analytics/database
      console.log("Signup data:", { email, company, willingToPay, timestamp: new Date() });
      setIsSubmitted(true);
      toast.success("Thanks for your interest! We'll be in touch soon.");
      setEmail("");
      setCompany("");
      setWillingToPay("");
    }
  };

  const features = [
    {
      icon: Target,
      title: "Smart Campaign Management",
      description: "Launch and optimize campaigns in minutes with AI-powered insights that maximize your ROI."
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track performance across all channels with comprehensive dashboards and actionable reports."
    },
    {
      icon: Users,
      title: "Audience Targeting",
      description: "Reach the right customers with advanced segmentation and behavioral targeting tools."
    },
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Automatically adjust campaigns based on performance data to improve conversions."
    }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small businesses getting started",
      features: ["Up to 5 campaigns", "Basic analytics", "Email support", "Standard templates"]
    },
    {
      name: "Professional",
      price: "$99",
      description: "For growing businesses that need more power",
      features: ["Unlimited campaigns", "Advanced analytics", "Priority support", "Custom templates", "A/B testing"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$299",
      description: "For large organizations with complex needs",
      features: ["Everything in Pro", "Dedicated account manager", "Custom integrations", "White-label solution", "24/7 phone support"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png" 
                alt="Adgo" 
                className="h-10 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                🚀 Now in Early Access
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                We don't just manage campaigns,{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  we craft strategies
                </span>{" "}
                that convert
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Turn clicks into customers and make your brand stand out in the digital jungle. 
                We empower businesses with data-driven advertising strategies that deliver real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg h-14 px-8">
                  <Rocket className="mr-2 h-5 w-5" />
                  Join Early Access
                </Button>
                <Button variant="outline" size="lg" className="text-lg h-14 px-8">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center mt-8 space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Cancel anytime
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  14-day free trial
                </div>
              </div>
            </div>

            {/* Product Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-muted-foreground">Adgo Dashboard</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div>
                      <div className="font-semibold">Holiday Campaign</div>
                      <div className="text-sm text-muted-foreground">Facebook • Instagram • Google</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">+245% ROI</div>
                      <div className="text-sm text-muted-foreground">$12,450 spent</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-accent/10 rounded-lg text-center">
                      <div className="font-semibold text-2xl">1.2M</div>
                      <div className="text-sm text-muted-foreground">Impressions</div>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg text-center">
                      <div className="font-semibold text-2xl">3.2%</div>
                      <div className="text-sm text-muted-foreground">CTR</div>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg text-center">
                      <div className="font-semibold text-2xl">$2.45</div>
                      <div className="text-sm text-muted-foreground">CPC</div>
                    </div>
                  </div>
                  
                  <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-end justify-around p-4">
                    <div className="bg-primary h-16 w-8 rounded-t"></div>
                    <div className="bg-primary h-24 w-8 rounded-t"></div>
                    <div className="bg-primary h-20 w-8 rounded-t"></div>
                    <div className="bg-primary h-28 w-8 rounded-t"></div>
                    <div className="bg-primary h-12 w-8 rounded-t"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg border">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="text-primary">empower your business</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From campaign creation to performance optimization, we provide the tools 
              that turn your advertising investments into measurable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Choose the plan that{" "}
              <span className="text-primary">fits your growth</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative ${tier.popular ? 'border-primary shadow-xl scale-105' : 'border-border'}`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary">
                    {tier.price}
                    <span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={tier.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to transform your advertising?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join hundreds of businesses already using Adgo to create content that converts.
            Get early access and help shape the future of digital advertising.
          </p>

          {!isSubmitted ? (
            <Card className="max-w-2xl mx-auto bg-white text-foreground">
              <CardHeader>
                <CardTitle className="text-2xl">Join Early Access</CardTitle>
                <CardDescription>
                  Help us validate our pricing and get exclusive early access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Would you pay for this solution? *</Label>
                    <RadioGroup 
                      value={willingToPay} 
                      onValueChange={setWillingToPay}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes-29" id="yes-29" />
                        <Label htmlFor="yes-29">Yes, I'd pay $29/month (Starter)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes-99" id="yes-99" />
                        <Label htmlFor="yes-99">Yes, I'd pay $99/month (Professional)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes-299" id="yes-299" />
                        <Label htmlFor="yes-299">Yes, I'd pay $299/month (Enterprise)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maybe" id="maybe" />
                        <Label htmlFor="maybe">Maybe, depends on features</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">No, but I'm interested in a free version</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Rocket className="mr-2 h-5 w-5" />
                    Join Early Access
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-2xl mx-auto bg-white text-foreground">
              <CardContent className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">You're on the list!</h3>
                <p className="text-muted-foreground mb-6">
                  Thanks for your interest! We'll notify you as soon as early access opens 
                  and keep you updated on our progress.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Submit Another Response
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img 
                src="/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png" 
                alt="Adgo" 
                className="h-8 w-auto mb-4"
              />
              <p className="text-muted-foreground">
                Empowering businesses with data-driven advertising strategies that deliver real results.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Integrations</a></li>
                <li><a href="#" className="hover:text-primary">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">Status</a></li>
                <li><a href="mailto:hello@adgo.solutions" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2024 Adgo Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;