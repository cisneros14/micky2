import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Phone } from "lucide-react";
import Image from "next/image";

export default function WhyChooseSection() {
  const stats = [
    {
      value: "100+",
      label: "Properties Purchased",
    },
    {
      value: "24hrs",
      label: "Average Offer Time",
    },
    {
      value: "14 Days",
      label: "Fast Closing Available",
    },
    {
      value: "$0",
      label: "In Commissions or Fees",
    },
  ];

  const trustBadges = [
    {
      title: "Fully Licensed & Insured",
      description: "DRE License #02045945",
    },
    {
      title: "Local Cerritos Company",
      description: "We know the area and care about our community",
    },
    {
      title: "Fair & Transparent",
      description: "No hidden fees, no last-minute surprises",
    },
  ];

  return (
    <section className="bg-background py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left side - Image with overlay card */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/casa.jpeg"
                alt="Cash transaction for home purchase"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating stat card */}
            <Card className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-card p-4 md:p-6 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-secondary-foreground text-xl md:text-2xl font-bold">
                  $
                </span>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  $2M+
                </div>
                <div className="text-sm text-muted-foreground">
                  Paid to Homeowners
                </div>
              </div>
            </Card>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-balance">
                Why Choose Easy Closers?
              </h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                We&apos;re a licensed, local company that&apos;s helped hundreds
                of homeowners in Cerritos and surrounding areas sell their
                properties quickly and fairly.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-muted/50 border-border p-4 md:p-6 hover:bg-muted/80 transition-colors"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>

            {/* Trust badges */}
            <div className="space-y-3">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-lg">
                      {badge.title}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {badge.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg font-semibold px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
            >
              <Phone className="w-5 h-5 mr-2" />
              Get Your Free Offer Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
