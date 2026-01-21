"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTranslation } from "@/components/TranslationsProvider";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

export default function Footer() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const currentYear = new Date().getFullYear();

  const links = [
    {
      title: t("nav.home", "Home"),
      href: `/${locale}`,
    },
    {
      title: t("nav.process", "Process"),
      href: `/${locale}/process`,
    },
    {
      title: t("nav.about", "About"),
      href: `/${locale}/about`,
    },
    {
      title: t("nav.contact", "Contact Us"),
      href: `/${locale}/contact`,
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Logo className="bg-white p-2 rounded-xl" />
            <p className="text-primary-foreground/80 leading-relaxed">
              {t(
                "footer.about.description",
                "We provide homeowners with a fast, fair, and hassle-free way to sell their property. No commissions, no repairs, just results.",
              )}
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="https://facebook.com/profile.php?id=61577957411678"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com/easyclosers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </Link> 

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              {t("footer.links.title", "Quick Links")}
            </h3>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-white">
              {t("footer.newsletter.title", "Stay Updated")}
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              {t(
                "footer.newsletter.description",
                "Subscribe to our newsletter for the latest real estate market updates.",
              )}
            </p>
            <form className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder={t(
                  "footer.newsletter.placeholder",
                  "Enter your email",
                )}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-white placeholder:text-primary-foreground/50 focus-visible:ring-secondary"
              />
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                {t("footer.newsletter.button", "Subscribe")}
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>
            &copy; {currentYear} Easy Closers.{" "}
            {t("footer.copyright", "All rights reserved.")}
          </p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
