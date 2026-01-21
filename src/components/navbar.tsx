"use client";

import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { Facebook, Instagram } from "lucide-react";
import { PropertyQuoteModal } from "./property-quote-modal";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "./ui/button";
import { useTranslation } from "@/components/TranslationsProvider";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed z-50 w-full top-3 px-3">
      <div className="flex items-center bg-background/80 backdrop-blur-sm border rounded-full justify-between container mx-auto p-2">
        <div className="bg-background border rounded-full p-1 px-3 md:px-4">
          <Logo className="w-24 md:w-28" />
        </div>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-3 md:bg-background md:p-2 border rounded-full md:pl-4">
            <div className="items-center gap-2 text-muted-foreground/80 hidden md:flex">
              <Instagram className="size-5" />
              <Facebook className="size-5" />
            </div>

            <div className="hidden md:block">
              <PropertyQuoteModal>
                <Button className="rounded-full">
                  {t("navbar.cta", "Get your cash offer")}
                </Button>
              </PropertyQuoteModal>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
