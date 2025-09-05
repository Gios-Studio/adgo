import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Layers, Grid3x3, ListCheck, BookOpen, Star, LayoutDashboard } from "lucide-react";

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Payment Automation",
      description: "Automate payment processing and reconciliation to reduce manual errors and improve efficiency.",
      expandedDescription: "Set up automated payment workflows with custom approval chains. Schedule recurring payments, automate invoice processing, and create conditional rules for different transaction types. Reduce manual intervention and ensure compliance with financial regulations.",
      icon: (
        <Layers size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Real-time Analytics",
      description: "Monitor financial performance with real-time dashboards and comprehensive reporting.",
      expandedDescription: "Track key financial metrics with customizable dashboards. Monitor cash flow, payment volumes, and transaction success rates in real-time. Generate detailed reports for stakeholders and identify trends before they impact your business.",
      icon: (
        <Grid3x3 size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Risk Management",
      description: "Advanced fraud detection and risk assessment tools to protect your business.",
      expandedDescription: "Leverage machine learning algorithms to detect suspicious activities and prevent fraud. Set up custom risk rules, monitor transaction patterns, and get real-time alerts for unusual behavior. Protect your business and customers with industry-leading security measures.",
      icon: (
        <ListCheck size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Compliance & Reporting",
      description: "Stay compliant with automated regulatory reporting and audit trails.",
      expandedDescription: "Generate automated compliance reports for various regulatory requirements. Maintain comprehensive audit trails, ensure data privacy compliance, and streamline regulatory submissions. Keep your business compliant with evolving financial regulations.",
      icon: (
        <BookOpen size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "API Integration",
      description: "Seamlessly integrate with your existing systems and third-party services.",
      expandedDescription: "Connect with popular accounting software, CRM systems, and banking platforms through our robust API. Build custom integrations, sync data in real-time, and extend functionality to meet your specific business needs.",
      icon: (
        <Star size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Advanced Dashboard",
      description: "Comprehensive dashboard with customizable widgets and real-time insights.",
      expandedDescription: "Create personalized dashboards with drag-and-drop widgets. Monitor KPIs, track performance metrics, and get actionable insights. Share reports with stakeholders and make data-driven decisions with confidence.",
      icon: (
        <LayoutDashboard size={24} className="text-cosmic-accent" />
      )
    }
  ];

  return (
    <section id="features" className="w-full py-20 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Everything you need to manage finances
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful features designed to streamline your financial operations and drive growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={(open) => setOpenFeature(open ? index : null)}
            >
              <div className="group">
                <CollapsibleTrigger className="w-full">
                  <div className="p-6 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-left">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
                        {feature.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                          <ChevronDown 
                            size={16} 
                            className={`text-muted-foreground transition-transform ${
                              openFeature === index ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-6 pb-4 pt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed ml-12">
                      {feature.expandedDescription}
                    </p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;