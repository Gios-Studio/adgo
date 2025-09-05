import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small businesses starting their fintech journey",
      features: [
        "Up to 100 transactions/month",
        "Basic payment processing",
        "Standard reporting",
        "Email support",
        "Basic fraud protection"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "Ideal for growing businesses with higher transaction volumes",
      features: [
        "Up to 10,000 transactions/month",
        "Advanced payment processing",
        "Real-time analytics",
        "Multi-currency support",
        "Advanced fraud protection",
        "API access",
        "Priority support"
      ],
      buttonText: "Start 14-day trial",
      buttonVariant: "default",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex financial operations",
      features: [
        "Unlimited transactions",
        "Custom payment workflows",
        "Advanced compliance tools",
        "Dedicated infrastructure",
        "White-label solutions",
        "Dedicated account manager",
        "24/7 premium support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="w-full py-20 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your business needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary bg-card' : 'bg-card'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center space-y-4">
                <h3 className="text-xl font-medium text-foreground">
                  {plan.name}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl md:text-4xl font-medium text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground text-sm">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  variant={plan.buttonVariant as "default" | "outline"}
                  size="lg" 
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          All plans include our core security features and basic integrations. 
          Need something custom? <button className="text-primary hover:underline">Contact our sales team</button>.
        </div>
      </div>
    </section>
  );
};

export default Pricing;