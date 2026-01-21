"use client";

import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import { ActionButton } from "./action-button";
import { PropertyQuoteModal } from "./property-quote-modal";
import { useTranslation } from "@/components/TranslationsProvider";

export default function WhyChooseSection() {
  const { t } = useTranslation();

  const stats = [
    {
      value: t("whyChoose.stats.0.value", "100+"),
      label: t("whyChoose.stats.0.label", "Properties Purchased"),
    },
    {
      value: t("whyChoose.stats.1.value", "24hrs"),
      label: t("whyChoose.stats.1.label", "Average Offer Time"),
    },
    {
      value: t("whyChoose.stats.2.value", "7 Days"),
      label: t("whyChoose.stats.2.label", "Fast Closing Available"),
    },
    {
      value: t("whyChoose.stats.3.value", "$0"),
      label: t("whyChoose.stats.3.label", "In Commissions or Fees"),
    },
  ];

  const trustBadges = [
    {
      title: t("whyChoose.badges.0.title", "Fully Licensed & Insured"),
      description: t("whyChoose.badges.0.description", "DRE License #02045945"),
    },
    {
      title: t("whyChoose.badges.1.title", "Local So-Cal Company"),
      description: t(
        "whyChoose.badges.1.description",
        "We know the area and care about our community",
      ),
    },
    {
      title: t("whyChoose.badges.2.title", "Fair & Transparent"),
      description: t(
        "whyChoose.badges.2.description",
        "No hidden fees, no last-minute surprises",
      ),
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
                src="/casa.webp"
                alt="Cash transaction for home purchase"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating stat card */}
            <Card className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-card p-3 md:p-4 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <span className="text-secondary-foreground text-xl md:text-2xl font-bold">
                  $
                </span>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary text-center">
                  $2M+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("whyChoose.floating", "Paid to Homeowners")}
                </div>
              </div>
            </Card>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-balance">
                {t("whyChoose.title", "Why Choose Easy Closers?")}
              </h2>
              <p className="text-lg text-pretty leading-relaxed">
                {t(
                  "whyChoose.description",
                  "We're a licensed, local company that's helped hundreds of homeowners sell their properties quickly and fairly.",
                )}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-muted/50 shadow-none border-border p-4 md:p-6 hover:bg-muted/80 transition-colors"
                >
                  <div className="text-3xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>

            {/* Trust badges */}
            <div className="space-y-5">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 border border-secondary/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-secondary" />
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
            <PropertyQuoteModal>
              <ActionButton
                size="lg"
                variant="secondary"
                className="px-5 pr-18"
              >
                {t("whyChoose.cta", "Get my fair cash offer")}
              </ActionButton>
            </PropertyQuoteModal>
          </div>
        </div>
      </div>
    </section>
  );
}
