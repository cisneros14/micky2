"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Detect current locale
  const currentLocale = pathname.split("/")[1] || "en";

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Replace the locale segment in the path
    const pathSegments = pathname.split("/");
    // If path is root '/', split gives ['', ''] -> pathSegments[1] is ''
    // If path is '/about', split gives ['', 'about'] -> pathSegments[1] is 'about'??
    // Wait, if path is /es/about, split -> ['', 'es', 'about']

    // Robust replacement:
    // If first segment is a locale, replace it.
    // If not, prepend it? (Middleware handles strict locale routes usually)
    // Assuming standard /[locale]/... structure enforced by middleware.

    pathSegments[1] = newLocale;
    const newPath = pathSegments.join("/");

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full border bg-white hover:bg-secondary/20 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Globe className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[100]">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className="justify-between"
        >
          English
          {currentLocale === "en" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("es")}
          className="justify-between"
        >
          Español
          {currentLocale === "es" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
