import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { useTranslation } from "@/components/TranslationsProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useState } from "react";

export const NavigationSheet = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const locale = pathname.split("/")[1] || "en";

  const links = [
    { href: `/${locale}`, label: t("nav.home", "Home") },
    { href: `/${locale}/process`, label: t("nav.process", "Process") },
    { href: `/${locale}/about`, label: t("nav.about", "About") },
    { href: `/${locale}/contact`, label: t("nav.contact", "Contact Us") },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 px-10 py-10 w-full sm:max-w-md">
        <div className="flex items-center justify-between pb-6 border-b">
          <Logo />
        </div>

        <nav className="flex flex-col gap-6 mt-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-medium transition-colors flex items-center justify-between group px-4 py-2 !rounded-full ${
                  isActive
                    ? "bg-[var(--primary)] text-white focus:bg-[var(--primary)] focus:text-white"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {/* Optional: Add an arrow or indicator */}
                <ArrowRight
                  className={`w-5 h-5 transition-all ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t pt-6 flex items-center justify-between">
          <span className="text-muted-foreground font-medium">
            {t("language", "Language")}
          </span>
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
};
