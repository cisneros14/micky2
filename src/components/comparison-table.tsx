import type React from "react";
import {
  Check,
  X,
  DollarSign,
  Calendar,
  Home,
  Package,
  Wrench,
  Eye,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ComparisonFeature {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  easyclosers: {
    value: string;
    detail: string;
    positive: boolean;
  };
  traditional: {
    value: string;
    detail: string;
    positive: boolean;
  };
}

const features: ComparisonFeature[] = [
  {
    icon: <DollarSign className="h-5 w-5" />,
    label: "Commissions & Fees",
    easyclosers: {
      value: "$0",
      detail: "Zero fees",
      positive: true,
    },
    traditional: {
      value: "6-8%",
      detail: "Of sale price",
      positive: false,
    },
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    label: "Closing Costs",
    easyclosers: {
      value: "We Pay",
      detail: "$0 to you",
      positive: true,
    },
    traditional: {
      value: "You Pay",
      detail: "2-4% typical",
      positive: false,
    },
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    label: "Repairs Needed",
    easyclosers: {
      value: "None",
      detail: "Sell as-is",
      positive: true,
    },
    traditional: {
      value: "Required",
      detail: "Often costly",
      positive: false,
    },
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    label: "Closing Timeline",
    easyclosers: {
      value: "14 Days",
      detail: "Or your timeline",
      positive: true,
    },
    traditional: {
      value: "3-6 Months",
      detail: "Average wait",
      positive: false,
    },
  },
  {
    icon: <Eye className="h-5 w-5" />,
    label: "Showings & Open Houses",
    easyclosers: {
      value: "None",
      detail: "No hassle",
      positive: true,
    },
    traditional: {
      value: "Required",
      detail: "Multiple times",
      positive: false,
    },
  },
  {
    icon: <Package className="h-5 w-5" />,
    label: "Personal Belongings",
    easyclosers: {
      value: "Leave Them",
      detail: "We handle it",
      positive: true,
    },
    traditional: {
      value: "Must Remove",
      detail: "Your expense",
      positive: false,
    },
  },
];

export function ComparisonTable() {
  return (
    <section className="w-full bg-white py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-primary text-balance">
            Compare Your Options
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            See how selling to Easy Closers stacks up against a traditional
            listing.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_1fr] gap-0 overflow-hidden">
          {/* Header Row */}
          <div className="bg-background hidden lg:block" />

          <div className="bg-primary/10 rounded-t-3xl p-8 flex flex-col items-center text-center border-b border-border ">
            <div className="mb-4 flex items-center justify-center">
              <Image
                src="/logoSolo.png"
                alt="Easy Closers"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <h3 className="mb-1 text-xl font-bold text-primary">
              Easy Closers
            </h3>
            <p className="text-sm text-muted-foreground">The stress-free way</p>
          </div>

          <div className="bg-background p-8 flex flex-col items-center text-center border-b border-border ">
            <div className="mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-muted">
              <Home className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-1 text-xl font-bold text-foreground">
              Traditional Realtor
            </h3>
            <p className="text-sm text-muted-foreground">
              The old-fashioned way
            </p>
          </div>

          {/* Feature Rows */}
          {features.map((feature, index) => (
            <div key={index} className="contents">
              {/* Feature Label (Desktop) */}
              <div className="hidden lg:flex bg-background p-6 items-center gap-3 border-b border-border font-medium text-foreground">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <span>{feature.label}</span>
              </div>

              {/* Easy Closers Column */}
              <div className="bg-primary/10 p-6 flex flex-col items-center justify-center text-center border-b border-border  relative">
                {/* Mobile Label */}
                <div className="lg:hidden absolute top-4 left-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {feature.label}
                </div>

                <div className="mb-2">
                  {feature.easyclosers.positive ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-600">
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-600">
                      <X className="h-5 w-5" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="font-bold text-foreground text-lg">
                  {feature.easyclosers.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  {feature.easyclosers.detail}
                </p>
              </div>

              {/* Traditional Column */}
              <div className="bg-background p-6 flex flex-col items-center justify-center text-center border-b border-border ">
                <div className="mb-2">
                  {feature.traditional.positive ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-600">
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-600">
                      <X className="h-5 w-5" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="font-bold text-foreground text-lg">
                  {feature.traditional.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  {feature.traditional.detail}
                </p>
              </div>
            </div>
          ))}

          {/* CTA Row */}
          <div className="bg-background hidden lg:block" />
          <div className="bg-primary/10 p-8 flex items-center justify-center rounded-b-3xl">
            <Button
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-12 text-base shadow-lg"
            >
              <Gift className="w-4 h-4 mr-2" />
              Get My Cash Offer
            </Button>
          </div>
          <div className="bg-background p-8 flex items-center justify-center ">
            <p className="text-sm text-muted-foreground italic">
              * Traditional sales often involve uncertainties and delays.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
