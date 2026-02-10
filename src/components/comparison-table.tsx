"use client";

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
} from "lucide-react";
import Image from "next/image";
import { ActionButton } from "./action-button";
import { PropertyQuoteModal } from "./property-quote-modal";
import { useTranslation } from "@/components/TranslationsProvider";
import { motion } from "framer-motion";

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

export function ComparisonTable() {
  const { t } = useTranslation();

  const features: ComparisonFeature[] = [
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: t("comparison.features.commissions.label", "Commissions & Fees"),
      easyclosers: {
        value: t("comparison.features.commissions.easy", "$0"),
        detail: t("comparison.features.commissions.easySub", "Zero fees"),
        positive: true,
      },
      traditional: {
        value: t("comparison.features.commissions.trad", "6-8%"),
        detail: t("comparison.features.commissions.tradSub", "Of sale price"),
        positive: false,
      },
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: t("comparison.features.closing.label", "Closing Costs"),
      easyclosers: {
        value: t("comparison.features.closing.easy", "We Pay"),
        detail: t("comparison.features.closing.easySub", "$0 to you"),
        positive: true,
      },
      traditional: {
        value: t("comparison.features.closing.trad", "You Pay"),
        detail: t("comparison.features.closing.tradSub", "2-4% typical"),
        positive: false,
      },
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      label: t("comparison.features.repairs.label", "Repairs Needed"),
      easyclosers: {
        value: t("comparison.features.repairs.easy", "None"),
        detail: t("comparison.features.repairs.easySub", "Sell as-is"),
        positive: true,
      },
      traditional: {
        value: t("comparison.features.repairs.trad", "Required"),
        detail: t("comparison.features.repairs.tradSub", "Often costly"),
        positive: false,
      },
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: t("comparison.features.timeline.label", "Closing Timeline"),
      easyclosers: {
        value: t("comparison.features.timeline.easy", "7 Days"),
        detail: t("comparison.features.timeline.easySub", "Or your timeline"),
        positive: true,
      },
      traditional: {
        value: t("comparison.features.timeline.trad", "3-6 Months"),
        detail: t("comparison.features.timeline.tradSub", "Average wait"),
        positive: false,
      },
    },
    {
      icon: <Eye className="h-5 w-5" />,
      label: t("comparison.features.showings.label", "Showings & Open Houses"),
      easyclosers: {
        value: t("comparison.features.showings.easy", "None"),
        detail: t("comparison.features.showings.easySub", "No hassle"),
        positive: true,
      },
      traditional: {
        value: t("comparison.features.showings.trad", "Required"),
        detail: t("comparison.features.showings.tradSub", "Multiple times"),
        positive: false,
      },
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: t("comparison.features.belongings.label", "Personal Belongings"),
      easyclosers: {
        value: t("comparison.features.belongings.easy", "Leave Them"),
        detail: t("comparison.features.belongings.easySub", "We handle it"),
        positive: true,
      },
      traditional: {
        value: t("comparison.features.belongings.trad", "Must Remove"),
        detail: t("comparison.features.belongings.tradSub", "Your expense"),
        positive: false,
      },
    },
  ];

  return (
    <section className="w-full bg-white py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl md:text-6xl font-bold tracking-tight text-primary text-balance">
            {t("comparison.title", "Compare Your Options")}
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-pretty">
            {t(
              "comparison.description",
              "See how selling to Easy Closers stacks up against a traditional listing.",
            )}
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[300px_1fr_1fr] gap-0 overflow-hidden"
        >
          {/* Header Row */}
          <div className="bg-background hidden lg:block" />

          <div className="bg-blue-500/10 rounded-t-3xl p-8 flex flex-col items-center text-center border-b border-border ">
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
              {t("comparison.easyClosers", "Easy Closers")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("comparison.easyClosersSub", "The stress-free way")}
            </p>
          </div>

          <div className="bg-background p-8 flex flex-col items-center text-center border-b border-border ">
            <div className="mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-muted">
              <Home className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-1 text-xl font-bold text-foreground">
              {t("comparison.traditional", "Traditional Realtor")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("comparison.traditionalSub", "The old-fashioned way")}
            </p>
          </div>

          {/* Feature Rows */}
          {features.map((feature, index) => (
            <div key={index} className="contents">
              {/* Feature Label (Desktop) */}
              <div className="hidden lg:flex bg-background p-6 items-center gap-3 border-b border-border font-medium text-foreground">
                <div className="p-2 rounded-lg bg-blue-500/10 text-primary">
                  {feature.icon}
                </div>
                <span>{feature.label}</span>
              </div>

              {/* Easy Closers Column */}
              <div className="bg-blue-500/10 p-6 flex flex-col items-center justify-center text-center border-b border-border  relative">
                {/* Mobile Label */}
                <div className="lg:hidden text-center! mx-auto! absolute top-4 left-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {feature.label}
                </div>

                <div className="mb-4 mt-10">
                  {feature.easyclosers.positive ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/50 border border-green-600 text-green-800">
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
                    <div className="flex h-8 w-8 items-center justify-center border border-red-600 rounded-full bg-red-500/40 text-red-800">
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
          <div className="bg-blue-500/10 p-8 flex items-center justify-center rounded-b-3xl">
            <PropertyQuoteModal>
              <ActionButton
                size="lg"
                variant="secondary"
                className="px-5 pr-18"
              >
                {t("comparison.cta", "Get my fair cash offer")}
              </ActionButton>
            </PropertyQuoteModal>
          </div>
          <div className="bg-background p-8 flex items-center justify-center ">
            <p className="text-sm text-muted-foreground italic">
              {t(
                "comparison.disclaimer",
                "* Traditional sales often involve uncertainties and delays.",
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
