import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, BarChart3, Target, Zap, CheckCircle, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Home = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Demo request sent! We'll be in touch soon.");
    setEmail("");
    setName("");
    setMessage("");
  };

  const features = [
    {
      icon: <Target className="h-19 w-19 text-primary" />,
      title: "Data-Driven Strategies",
      description: "We don't just help you manage campaigns, we craft data-driven strategies that turn clicks into customers and make your brand stand out in the digital jungle."
    },
    {
      icon: <BarChart3 className="h-19 w-19 text-primary" />,
      title: "Advanced Analytics",
      description: "Comprehensive insights and reporting to optimize your ad performance and maximize ROI across all channels."
    },
    {
      icon: <Zap className="h-19 w-19 text-primary" />,
      title: "Content That Converts",
      description: "Create compelling ad content that drives engagement and converts prospects into loyal customers."
    },
    {
      icon: <Users className="h-19 w-19 text-primary" />,
      title: "Audience Targeting",
      description: "Precise audience segmentation and targeting to reach the right people at the right time with the right message."
    },
    {
      icon: <TrendingUp className="h-19 w-19 text-primary" />,
      title: "Performance Optimization",
      description: "Continuous A/B testing and optimization to ensure your campaigns perform at their peak potential."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/2d18fdff-72d6-4b0b-bf30-16afdf09e95c.png" 
              alt="Adgo Logo" 
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#demo" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">
              Demo
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground">
              Contact
            </a>
            <Button variant="outline" size="sm">
              <a href="mailto:hello@adgo.solutions">Get Started</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container space-y-10 py-24 sm:py-32">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
          <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl">
            We Empower{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Businesses
            </span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            We empower drivers of digital success. Transform your advertising campaigns with 
            intelligent automation, data-driven insights, and content that converts.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="h-12 px-8">
              <a href="mailto:hello@adgo.solutions" className="flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8">
              <a href="#demo">Request Demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container space-y-12 py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            Features That Drive Results
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to create, manage, and optimize successful advertising campaigns.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-6">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo Request Section */}
      <section id="demo" className="border-t bg-muted/50 py-16">
        <div className="container space-y-12">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-4xl">
              Ready to Transform Your Campaigns?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg">
              Request a personalized demo and see how Adgo can revolutionize your advertising strategy.
            </p>
          </div>
          <div className="mx-auto max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Request a Demo</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDemoRequest} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Tell us about your advertising goals..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Request Demo
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container space-y-12">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-4xl">
              Get in Touch
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="mx-auto max-w-md text-center space-y-4">
            <Button size="lg" className="w-full">
              <a href="mailto:hello@adgo.solutions" className="flex items-center justify-center">
                hello@adgo.solutions
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              Or reach out to us directly at{" "}
              <a href="mailto:hello@adgo.solutions" className="text-primary hover:underline">
                hello@adgo.solutions
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/2d18fdff-72d6-4b0b-bf30-16afdf09e95c.png" 
              alt="Adgo Logo" 
              className="h-6 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              © 2024 Adgo Solutions. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="mailto:hello@adgo.solutions" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;