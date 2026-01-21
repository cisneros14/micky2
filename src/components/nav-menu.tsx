"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationsProvider";
import { ComponentProps } from "react";

import { usePathname } from "next/navigation";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const isActive = (path: string) => pathname === path;

  const activeClasses =
    "bg-[var(--primary)] text-white hover:bg-[var(--primary)] hover:text-white focus:bg-[var(--primary)] focus:text-white";

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="bg-background p-2 rounded-full md:border space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={` !rounded-full ${navigationMenuTriggerStyle()} ${
              isActive(`/${locale}`) ? activeClasses : ""
            }`}
          >
            <Link href={`/${locale}`}>{t("nav.home", "Home")}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={` !rounded-full ${navigationMenuTriggerStyle()} ${
              isActive(`/${locale}/process`) ? activeClasses : ""
            }`}
          >
            <Link href={`/${locale}/process`}>
              {t("nav.process", "Process")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={` !rounded-full ${navigationMenuTriggerStyle()} ${
              isActive(`/${locale}/about`) ? activeClasses : ""
            }`}
          >
            <Link href={`/${locale}/about`}>{t("nav.about", "About")}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={` !rounded-full ${navigationMenuTriggerStyle()} ${
              isActive(`/${locale}/contact`) ? activeClasses : ""
            }`}
          >
            <Link href={`/${locale}/contact`}>
              {t("nav.contact", "Contact Us")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
