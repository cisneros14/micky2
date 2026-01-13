"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { CheckCircle, Clock, DollarSign, Shield } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Fast Closing",
      description: "Close in as little as 7 days or on your timeline.",
    },
    {
      icon: DollarSign,
      title: "Cash Offers",
      description: "We pay cash, so there are no financing delays.",
    },
    {
      icon: Shield,
      title: "No Repairs",
      description: "We buy properties in as-is condition. No cleaning needed.",
    },
    {
      icon: CheckCircle,
      title: "No Commissions",
      description: "Zero agent fees or hidden costs. You keep more money.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-balance">
            Why Sell to Easy Closers?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We simplify the home selling process by removing the common
            headaches of traditional real estate.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-col items-center space-y-4 pb-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
