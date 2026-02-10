"use client";

import { DollarSign, Calendar, Home, Package } from "lucide-react";
import { PropertyQuoteForm } from "./property-quote-form";
import { motion } from "framer-motion";

import { Logo } from "./logo";
import { Card } from "./ui/card";

import { useTranslation } from "@/components/TranslationsProvider";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen bg-primary px-4 py-24">
      <div className="container mx-auto ">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 md:pt-12">
          {/* Left Content */}
          <div className="flex flex-col justify-start pt-8 md:pt-20 space-y-8 text-primary-foreground">
            <Logo
              className="w-50 bg-white rounded-3xl p-5 hidden md:block"
              priority
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground text-balance">
                {t("hero.title", "The Easiest Way to Sell Your House")}
              </h1>
              <p className="text-xl text-primary-foreground/90 text-pretty max-w-[600px]">
                {t(
                  "hero.description",
                  "No repairs, no commissions, and no cleaning. Get a fair cash offer today and close on your timeline. Easy, simple and hassle-free",
                )}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {[
                {
                  icon: DollarSign,
                  title: t("hero.features.commissions.title", "$0 Commissions"),
                  desc: t(
                    "hero.features.commissions.desc",
                    "Keep more money in your pocket",
                  ),
                },
                {
                  icon: Calendar,
                  title: t("hero.features.timeline.title", "Close in 7 Days"),
                  desc: t(
                    "hero.features.timeline.desc",
                    "Or choose your own timeline",
                  ),
                },
                {
                  icon: Home,
                  title: t("hero.features.asis.title", "Sell As-Is"),
                  desc: t(
                    "hero.features.asis.desc",
                    "No repairs or renovations needed",
                  ),
                },
                {
                  icon: Package,
                  title: t("hero.features.leave.title", "Leave Everything"),
                  desc: t(
                    "hero.features.leave.desc",
                    "Take what you want, leave the rest",
                  ),
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{item.title}</p>
                    <p className="text-sm text-primary-foreground/80">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center"
          >
            <Card className="w-full shadow-xl rounded-3xl bg-card text-card-foreground p-4 md:p-14">
              <h2 className="subtitle text-center">
                {t("quoteForm.title", "Get Your Cash Offer")}
              </h2>
              <PropertyQuoteForm />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
