import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Our payment processing efficiency increased by 40% and transaction failures dropped to near zero. The automation features are game-changing.",
      author: "Sarah Johnson",
      position: "CFO at TechCorp",
      avatar: "bg-cosmic-light/30"
    },
    {
      quote: "The real-time analytics and fraud detection capabilities have saved us millions. We can spot issues before they become problems.",
      author: "Michael Chen",
      position: "Head of Risk at FinanceFlow",
      avatar: "bg-cosmic-light/20"
    },
    {
      quote: "Compliance used to be a nightmare. Now our regulatory reporting is automated and we're always audit-ready.",
      author: "Leila Rodriguez",
      position: "Operations Director at GlobalPay",
      avatar: "bg-cosmic-light/40"
    }
  ];

  return (
    <section id="testimonials" className="w-full py-20 px-6 md:px-12 bg-card relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Trusted by finance teams worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            See how our platform transforms financial operations for businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-border bg-background hover:bg-muted/20 transition-colors"
            >
              <div className="space-y-4">
                <blockquote className="text-foreground leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${testimonial.avatar} flex items-center justify-center`}>
                    <div className="w-6 h-6 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;