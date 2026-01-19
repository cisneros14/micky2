"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/components/TranslationsProvider";

const HeroAbout = () => {
  const { t } = useTranslation();

  return (
    <div className="container relative overflow-hidden mx-auto p-5 pt-28 md:pt-30">
      <div className="relative max-w-5xl w-full mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Columna texto */}
        <div className=" flex flex-col justify-center">
          <div className="">
            {/* Badge */}
            <Badge className="bg-[var(--color4)] hover:bg-[var(--color1)] rounded-full py-1 px-3 border-none text-white font-medium shadow-sm transition-all duration-300 hover:shadow-md w-fit">
              {t("heroAbout.badge", "Más de 25 años de experiencia")}
            </Badge>

            {/* Título */}
            <div className="space-y-4 mb-4 mt-3">
              <h1 className="title">
                {t("heroAbout.title", "Tu aliado para vender sin estrés")}
              </h1>
              <div className="decorador" />
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
                {t(
                  "heroAbout.description",
                  "Más de 25 años comprando casas en efectivo con rapidez y transparencia.",
                )}
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Button size="lg" className="btn-primary">
                {t("heroAbout.cta", "Obtén tu oferta")}
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
              <Button variant="outline" size="lg" className="btn-secondary">
                <CirclePlay className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                {t("heroAbout.watch", "Ver testimonios")}
              </Button>
            </div>
          </div>
        </div>

        {/* Columna imagen */}
        <div className="relative w-full h-100 sm:h-140 lg:h-[650px] overflow-hidden rounded-3xl">


          <Image
            width={400}
            height={400}
            src="/casa.jpeg"
            alt={t("heroAbout.imageAlt", "Venta rápida de casas")}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 
                        brightness-120 contrast-100 saturate-105"
          />

          {/* Overlay sutil */}
        </div>
      </div>
    </div>
  );
};

export default HeroAbout;
