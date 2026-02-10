"use client";

import { useTranslation } from "@/components/TranslationsProvider";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function HeroAbout2() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-5xl px-6 py-8 sm:py-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center md:mb-8 mb-4"
      >
        <h1 className="title">{t("about.subtitle")}</h1>
        <div className="decorador mx-auto" />
      </motion.div>

      <div className="flex gap-10 items-center max-md:flex-col">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground leading-relaxed flex-1 space-y-4"
        >
          {(t("about.description", { returnObjects: true }) as string[]).map(
            (paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ),
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          className="flex flex-col gap-4 flex-1"
        >
          {(["integrity", "speed", "fairness"] as const).map((value) => (
            <motion.div
              key={value}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Card className="text-center p-8 gap-2 relative h-full">
                <span className="absolute top-4 right-4 w-2 h-2 bg-[var(--color4)]/40 rounded-full" />
                <h3 className="text-xl font-semibold">
                  {t(`about.values.${value}`)}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t(`about.values.${value}Desc`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function InfoBox() {
  const { t } = useTranslation();

  return (
    <div className="absolute z-[2] bottom-0 right-0 hidden lg:block">
      <Card className="relative w-48 border-none rounded-none rounded-tl-2xl border border-muted bg-background shadow-sm overflow-visible">
        <div
          className="absolute bottom-0 left-[-20px] w-[20px] h-[20px] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 100%, transparent 19px, hsl(0 0% 100%) 20px)",
            transform: "rotate(180deg)",
          }}
        />
        <div
          className="absolute top-[-20px] right-0 w-[20px] h-[20px] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 100%, transparent 19px, hsl(0 0% 100%) 20px)",
            transform: "rotate(180deg)",
          }}
        />
      </Card>
    </div>
  );
}

function InfoBox2() {
  const { t } = useTranslation();

  return (
    <div className="absolute z-[2] top-0 left-0 hidden lg:block">
      <Card className="relative w-48 border-none rounded-none rounded-br-2xl border border-muted bg-background shadow-sm overflow-visible">
        <div
          className="absolute top-0 right-[-20px] w-[20px] h-[20px] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 100%, transparent 19px, hsl(0 0% 100%) 20px)",
            transform: "rotate(360deg)",
          }}
        />
        <div
          className="absolute bottom-[-20px] left-0 w-[20px] h-[20px] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 100%, transparent 19px, hsl(0 0% 100%) 20px)",
            transform: "rotate(0deg)",
          }}
        />
      </Card>
    </div>
  );
}
