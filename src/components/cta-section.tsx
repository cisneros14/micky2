"use client";

import { PropertyQuoteModal } from "./property-quote-modal";
import { ActionButton } from "./action-button";
import { useTranslation } from "@/components/TranslationsProvider";
import { motion } from "framer-motion";

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-8 text-center"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-primary-foreground mb-6 text-balance">
              {t("ctaSection.title", "Ready to Sell Your House Fast?")}
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
              {t(
                "ctaSection.description",
                "Get a fair cash offer today. No fees, no repairs, no obligation.",
              )}
            </p>
          </div>
          <PropertyQuoteModal>
            <ActionButton size="lg" variant="secondary" className="px-5 pr-18">
              {t("ctaSection.cta", "Get my fair cash offer")}
            </ActionButton>
          </PropertyQuoteModal>
        </motion.div>
      </div>
    </section>
  );
}
