"use client";

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
} from "lucide-react";
import { ActionButton } from "./action-button";
import { PropertyQuoteModal } from "./property-quote-modal";
import { useTranslation } from "@/components/TranslationsProvider";
import { motion } from "framer-motion";

export default function SituationsSection() {
  const { t } = useTranslation();

  const situations = [
    {
      icon: Scale,
      title: t("situations.items.0.title", "Probate & Inheritance"),
      description: t(
        "situations.items.0.description",
        "Inherited a property? We simplify the process and help you sell quickly without the typical probate headaches.",
      ),
      color: "chart-1",
    },
    {
      icon: AlertTriangle,
      title: t("situations.items.1.title", "Facing Foreclosure"),
      description: t(
        "situations.items.1.description",
        "Stop foreclosure and protect your credit. We can close quickly and help you move forward with peace of mind.",
      ),
      color: "chart-2",
    },
    {
      icon: Bed,
      title: t("situations.items.2.title", "Tired Landlords"),
      description: t(
        "situations.items.2.description",
        "Done dealing with tenants and repairs? Sell your rental property as-is and walk away from the stress.",
      ),
      color: "chart-3",
    },
    {
      icon: Wrench,
      title: t("situations.items.3.title", "Major Repairs Needed"),
      description: t(
        "situations.items.3.description",
        "House needs work? No problem. We buy properties in any condition - no repairs or updates required.",
      ),
      color: "chart-4",
    },
    {
      icon: Heart,
      title: t("situations.items.4.title", "Divorce Settlement"),
      description: t(
        "situations.items.4.description",
        "Need to sell fast due to divorce? We offer quick, fair solutions during difficult times.",
      ),
      color: "chart-5",
    },
    {
      icon: Plane,
      title: t("situations.items.5.title", "Job Relocation"),
      description: t(
        "situations.items.5.description",
        "Moving for work? We can close on your timeline and help you transition smoothly to your new location.",
      ),
      color: "chart-1",
    },
    {
      icon: HandCoins,
      title: t("situations.items.6.title", "Financial Distress"),
      description: t(
        "situations.items.6.description",
        "Behind on payments? We provide respectful, confidential solutions to help you get back on your feet.",
      ),
      color: "chart-2",
    },
    {
      icon: ArrowDown,
      title: t("situations.items.7.title", "Downsizing"),
      description: t(
        "situations.items.7.description",
        "Ready for a smaller place? Skip the staging and showings - we'll buy your home as-is.",
      ),
      color: "chart-3",
    },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-primary text-primary-foreground">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-primary-foreground text-balance">
            {t("situations.title", "We Help Homeowners in Any Situation")}
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            {t(
              "situations.description",
              "No matter why you need to sell, we can provide a solution that works for you.",
            )}
          </p>
        </motion.div>

        {/* Situations Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-4 mb-12"
        >
          {situations.map((situation, index) => {
            const Icon = situation.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <Card className="">
                  <CardContent className="p-3 md:p-6 space-y-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-full bg-${situation.color}/20 border-${situation.color}/70 border flex items-center justify-center`}
                    >
                      <Icon className={`w-7 h-7 text-${situation.color}/70`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 text-primary">
                      {situation.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {situation.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4">
          <PropertyQuoteModal>
            <ActionButton size="lg" variant="secondary" className="px-5 pr-18">
              {t("situations.cta", "Get my fair cash offer")}
            </ActionButton>
          </PropertyQuoteModal>
          <p className="text-primary-foreground/70 text-sm">
            {t(
              "situations.caption",
              "Confidential consultation - no pressure, just solutions",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

// Safelist for dynamic classes
// bg-chart-1/20 bg-chart-2/20 bg-chart-3/20 bg-chart-4/20 bg-chart-5/20
// border-chart-1/70 border-chart-2/70 border-chart-3/70 border-chart-4/70 border-chart-5/70
// text-chart-1/70 text-chart-2/70 text-chart-3/70 text-chart-4/70 text-chart-5/70
