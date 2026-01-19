"use client";

import React, { memo, useState } from "react";
import { useTranslation } from "./TranslationsProvider";
import { Card } from "@/components/ui/card";
import { PropertyQuoteForm } from "@/components/property-quote-form";
import { Check } from "lucide-react";

const CallToActionBanner = memo(function CallToActionBanner() {
  const { t } = useTranslation();
  const [formKey, setFormKey] = useState(0);

  return (
    <section className="w-full">
      <div className="container mx-auto">
        <Card className="md:bg-gray-100 relative border-none shadow-none rounded-2xl md:rounded-3xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            <div className="order-2 lg:order-1 w-full lg:w-1/2 lg:max-w-lg bg-white rounded-2xl p-6 md:p-14">
              <PropertyQuoteForm
                key={formKey}
                onFormSubmitSuccess={() => setFormKey((prevKey) => prevKey + 1)}
              />
            </div>
            {/* Columna del texto */}
            <div className="order-1 lg:order-2 w-full lg:w-1/2 flex flex-col items-start text-left p-6">
              <h2 className="text-[var(--primary)] title">
                {t("ctaBanner.title")}
              </h2>
              <div className="decorador mb-4 md:mb-6" />

              <p className="text-[clamp(0.9rem,2.5vw,1.125rem)] text-gray-700 mb-6">
                {t("ctaBanner.description")}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[var(--color4)] flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {t("ctaBanner.benefits.0")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[var(--color4)] flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {t("ctaBanner.benefits.1")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[var(--color4)] flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {t("ctaBanner.benefits.2")}
                  </span>
                </div>
              </div>

              <div className="text-[var(--primary)]/10 rounded-lg p-4 border border-[var(--color1)]/20">
                <p className="text-sm text-[var(--primary)] font-medium">
                  {t("ctaBanner.tip")}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
});

export default CallToActionBanner;
