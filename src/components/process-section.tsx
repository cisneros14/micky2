"use client";

import {
  Clock,
  CheckCircle2,
  Calendar,
  Edit,
  DollarSign,
  Handshake,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ActionButton } from "./action-button";
import { PropertyQuoteModal } from "./property-quote-modal";
import { useTranslation } from "@/components/TranslationsProvider";

export function ProcessSection() {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      icon: Edit,
      iconBg: "bg-primary/10",
      title: t("process.steps.0.title", "Request Your Offer"),
      description: t(
        "process.steps.0.desc",
        "Fill out our simple 5-minute form or give us a call. Tell us about your property and your situation.",
      ),
      badge: {
        icon: Clock,
        text: t("process.steps.0.badge", "Takes only 5 minutes"),
      },
    },
    {
      number: 2,
      icon: DollarSign,
      iconBg: "bg-secondary/10",
      title: t("process.steps.1.title", "Get a Fair Price"),
      description: t(
        "process.steps.1.desc",
        "Receive a no-obligation cash offer within 24 hours. Fair, transparent pricing with no hidden fees.",
      ),
      badge: {
        icon: CheckCircle2,
        text: t("process.steps.1.badge", "No obligation to accept"),
      },
    },
    {
      number: 3,
      icon: Handshake,
      iconBg: "bg-purple-100",
      title: t("process.steps.2.title", "Choose Your Close Date"),
      description: t(
        "process.steps.2.desc",
        "Close in as little as 7 days or take your time. You're in control of the timeline that works for you.",
      ),
      badge: {
        icon: Calendar,
        text: t("process.steps.2.badge", "Your timeline, your choice"),
      },
    },
  ];

  return (
    <section className="py-14 md:py-24 px-4 bg-muted/50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-primary mb-4 text-balance">
            {t("process.title", 'The "Easy" 3-Step Process')}
          </h2>
          <p className="text-lg  max-w-2xl mx-auto text-pretty">
            {t(
              "process.description",
              "Selling your home doesn't have to be complicated. We've streamlined the process into 3 simple steps.",
            )}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-12 mb-12 relative">
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
                  <div className="hidden md:flex absolute top-1/2 -right-11 transform -translate-y-1/2 z-10">
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
          <PropertyQuoteModal>
            <ActionButton size="lg" variant="secondary" className="px-5 pr-18">
              {t("process.cta", "Get my fair cash offer")}
            </ActionButton>
          </PropertyQuoteModal>
          <p className="text-muted-foreground text-sm mt-4">
            {t("process.cta_sub", "Get your cash offer in 24 hours or less")}
          </p>
        </div>
      </div>
    </section>
  );
}
