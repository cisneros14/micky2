import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Scale,
  AlertTriangle,
  Bed,
  Wrench,
  Heart,
  Plane,
  HandCoins,
  ArrowDown,
  MessageCircle,
} from "lucide-react";

const situations = [
  {
    icon: Scale,
    title: "Probate & Inheritance",
    description:
      "Inherited a property? We simplify the process and help you sell quickly without the typical probate headaches.",
    color: "bg-chart-1",
  },
  {
    icon: AlertTriangle,
    title: "Facing Foreclosure",
    description:
      "Stop foreclosure and protect your credit. We can close quickly and help you move forward with peace of mind.",
    color: "bg-chart-2",
  },
  {
    icon: Bed,
    title: "Tired Landlords",
    description:
      "Done dealing with tenants and repairs? Sell your rental property as-is and walk away from the stress.",
    color: "bg-chart-3",
  },
  {
    icon: Wrench,
    title: "Major Repairs Needed",
    description:
      "House needs work? No problem. We buy properties in any condition - no repairs or updates required.",
    color: "bg-chart-4",
  },
  {
    icon: Heart,
    title: "Divorce Settlement",
    description:
      "Need to sell fast due to divorce? We offer quick, fair solutions during difficult times.",
    color: "bg-chart-5",
  },
  {
    icon: Plane,
    title: "Job Relocation",
    description:
      "Moving for work? We can close on your timeline and help you transition smoothly to your new location.",
    color: "bg-chart-1",
  },
  {
    icon: HandCoins,
    title: "Financial Distress",
    description:
      "Behind on payments? We provide respectful, confidential solutions to help you get back on your feet.",
    color: "bg-chart-2",
  },
  {
    icon: ArrowDown,
    title: "Downsizing",
    description:
      "Ready for a smaller place? Skip the staging and showings - we'll buy your home as-is.",
    color: "bg-chart-3",
  },
];

export default function SituationsSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-primary text-primary-foreground">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground text-balance">
            We Help Homeowners in Any Situation
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            No matter why you need to sell, we can provide a solution that works
            for you.
          </p>
        </div>

        {/* Situations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-4 mb-12">
          {situations.map((situation, index) => {
            const Icon = situation.icon;
            return (
              <Card key={index} className="">
                <CardContent className="p-3 md:p-6 space-y-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full bg-[var(--primary)]/20 border-[var(--primary)]/70 border flex items-center justify-center`}
                  >
                    <Icon className="w-7 h-7 text-[var(--primary)]/70" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">
                    {situation.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {situation.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Discuss Your Situation
          </Button>
          <p className="text-primary-foreground/70 text-sm">
            Confidential consultation - no pressure, just solutions
          </p>
        </div>
      </div>
    </section>
  );
}
