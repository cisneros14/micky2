"use client";

import { useTranslation } from "@/components/TranslationsProvider";
import React from "react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const { t } = useTranslation();

  // Cargar estadísticas desde traducción
  const stats = t("stats.items", { returnObjects: true }) as Array<{
    value: string;
    label: string;
    description: string;
    color: string;
  }>;

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-5xl mx-auto w-full py-12 px-6 xl:px-0 text-center">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="title text-2xl md:text-3xl font-semibold">
            {t("stats.title", "Nuestra trayectoria habla por sí sola")}
          </h2>
          <div className="decorador mx-auto" />
          <p className="mt-6 text-lg max-w-2xl mx-auto text-muted-foreground">
            {t(
              "stats.description",
              "Más de 25 años ayudando a propietarios a vender rápido, sin estrés y por el mejor precio en efectivo.",
            )}
          </p>
        </motion.div>

        {/* Grid de estadísticas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="mt-8 sm:mt-12 md:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 xl:gap-x-12 gap-y-8 sm:gap-y-12 md:gap-y-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-2 sm:space-y-3 lg:space-y-4"
            >
              <span
                className={`block text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl ${stat.color} font-bold leading-none`}
              >
                {stat.value}
              </span>
              <p className="font-semibold text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-foreground leading-tight">
                {stat.label}
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-sm text-muted-foreground leading-relaxed px-2 sm:px-0">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
