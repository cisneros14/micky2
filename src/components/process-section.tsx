import {
  Clock,
  CheckCircle,
  Calendar,
  Edit,
  DollarSign,
  Handshake,
  ArrowRight,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProcessSection() {
  const steps = [
    {
      number: 1,
      icon: Edit,
      iconBg: "bg-primary/10",
      title: "Request Your Offer",
      description:
        "Fill out our simple 5-minute form or give us a call. Tell us about your property and your situation.",
      badge: {
        icon: Clock,
        text: "Takes only 5 minutes",
      },
    },
    {
      number: 2,
      icon: DollarSign,
      iconBg: "bg-secondary/10",
      title: "Get a Fair Price",
      description:
        "Receive a no-obligation cash offer within 24 hours. Fair, transparent pricing with no hidden fees.",
      badge: {
        icon: CheckCircle,
        text: "No obligation to accept",
      },
    },
    {
      number: 3,
      icon: Handshake,
      iconBg: "bg-purple-100",
      title: "Choose Your Close Date",
      description:
        "Close in as little as 14 days or take your time. You're in control of the timeline that works for you.",
      badge: {
        icon: Calendar,
        text: "Your timeline, your choice",
      },
    },
  ];

  return (
    <section className="py-24 px-4 bg-muted/50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4 text-balance">
            The "Easy" 3-Step Process 
          </h2>
          <p className="text-lg  max-w-2xl mx-auto text-pretty">
            Selling your home doesn&apos;t have to be complicated. We&apos;ve
            streamlined the process into 3 simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-15 mb-12 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const BadgeIcon = step.badge.icon;

            return (
              <div key={step.number} className="relative">
                <Card className="bg-card border-border h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    {/* Icon */}
                    <div
                      className={`w-20 h-20 rounded-2xl ${step.iconBg} flex items-center justify-center mb-6`}
                    >
                      <IconComponent
                        className="w-10 h-10 text-primary"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Title */}
                    <div className="flex my-4 items-start gap-2">
                      {/* Number Badge */}
                      <div className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Badge */}
                    <div className="flex items-center gap-2 text-secondary mt-auto">
                      <BadgeIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {step.badge.text}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow (hidden on mobile and after last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-12 transform -translate-y-1/2 z-10">
                    <ArrowRight
                      className="w-10 h-10 text-secondary"
                      strokeWidth={2.5}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-semibold rounded-lg shadow-lg"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Start Your Easy Sale Today
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            Get your cash offer in 24 hours or less
          </p>
        </div>
      </div>
    </section>
  );
}
