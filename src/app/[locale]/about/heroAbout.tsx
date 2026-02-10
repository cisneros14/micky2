"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/components/TranslationsProvider";
import { motion } from "framer-motion";

const HeroAbout = () => {
  const { t } = useTranslation();

  return (
    <div className="container relative overflow-hidden mx-auto p-5 pt-28 md:pt-30">
      <div className="relative max-w-5xl w-full mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Columna texto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className=" flex flex-col justify-center"
        >
          <div className="">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="bg-[var(--color4)] hover:bg-[var(--color1)] rounded-full py-1 px-3 border-none text-white font-medium shadow-sm transition-all duration-300 hover:shadow-md w-fit">
                {t("heroAbout.badge", "Más de 25 años de experiencia")}
              </Badge>
            </motion.div>

            {/* Título */}
            <div className="space-y-4 mb-4 mt-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="title"
              >
                {t("heroAbout.title", "Tu aliado para vender sin estrés")}
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="decorador"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl"
              >
                {t(
                  "heroAbout.description",
                  "Más de 25 años comprando casas en efectivo con rapidez y transparencia.",
                )}
              </motion.p>
            </div>

            {/* Botones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
            >
              <Button size="lg" className="btn-primary">
                {t("heroAbout.cta", "Obtén tu oferta")}
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
              <Button variant="outline" size="lg" className="btn-secondary">
                <CirclePlay className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                {t("heroAbout.watch", "Ver testimonios")}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Columna imagen */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full h-100 sm:h-140 lg:h-[650px] overflow-hidden rounded-3xl"
        >
          <Image
            width={400}
            height={400}
            src="/casa.webp"
            alt={t("heroAbout.imageAlt", "Venta rápida de casas")}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 
                        brightness-120 contrast-100 saturate-105"
          />

          {/* Overlay sutil */}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroAbout;
