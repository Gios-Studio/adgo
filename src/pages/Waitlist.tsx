import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, Rocket, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast.success("Thanks for joining! We'll notify you when we launch.");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-login-bg to-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <img 
            src="/lovable-uploads/2d18fdff-72d6-4b0b-bf30-16afdf09e95c.png" 
            alt="Adgo Logo" 
            className="h-16 w-auto mx-auto mb-8"
          />
          <h1 className="text-5xl font-bold mb-4">
            The Future of{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ad Management
            </span>{" "}
            is Coming
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're building the most powerful advertising platform to help businesses craft 
            data-driven strategies that turn clicks into customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Join the Waitlist</CardTitle>
                <CardDescription>
                  Be among the first to experience the next generation of ad management
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 text-center"
                    />
                    <Button type="submit" className="w-full h-12 text-lg">
                      <Rocket className="mr-2 h-5 w-5" />
                      Join Waitlist
                    </Button>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-16 w-16 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">You're on the list!</h3>
                    <p className="text-muted-foreground">
                      We'll notify you as soon as Adgo is ready to transform your advertising.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Zap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Lightning-Fast Campaigns</h3>
                <p className="text-muted-foreground">
                  Launch and optimize campaigns in minutes, not hours. Our intelligent automation 
                  handles the heavy lifting while you focus on strategy.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Enterprise-Grade Security</h3>
                <p className="text-muted-foreground">
                  Your data is protected with bank-level security. SOC 2 compliant with 
                  end-to-end encryption for complete peace of mind.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Proven Results</h3>
                <p className="text-muted-foreground">
                  Our beta users have seen an average 40% increase in ROI and 60% reduction 
                  in campaign management time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground mb-4">
            Have questions? We'd love to hear from you.
          </p>
          <Button variant="outline">
            <a href="mailto:hello@adgo.solutions">
              Contact Us
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;