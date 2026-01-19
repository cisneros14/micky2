//src/app/[locale]/(client)/page.tsx
"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { Star, Clock3, Check, TrendingUp, Info, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { useTranslation } from "@/components/TranslationsProvider"
import PrincipalFormContact from "./PrincipalFormContact"

const ContactForm = React.memo(function ContactForm() {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="container mx-auto max-md:px-4">
            <div
                className="flex relative rounded-lg md:rounded-3xl h-fit md:py-20 lg:py-30 bg-cover bg-center overflow-hidden"
                style={{
                    backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0)), url('/banner6.jpg')",
                }}
            >
                <InfoBox />
                <InfoBox2 />

                <div className="gap-5 md:gap-10 p-4 md:p-5 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center">
                    {/* Texto descriptivo */}
                    <div className="flex-1 max-w-xl text-white">
                        <b className="text-white">{t("contactForm.tagline")}</b>
                        <div className="max-w-[30px] my-2 h-[2px] bg-white"/>
                        
                        <h2 className="text-xl sm:text-3xl md:text-6xl font-bold tracking-tight">
                            {t("contactForm.title")}
                        </h2>
                        <p className="mt-3 text-sm sm:text-lg">
                            {t("contactForm.description")}
                        </p>
                    </div>

                    {/* Formulario */}
                    <div className="flex-1 w-full">
                        <Card className="p-3 md:p-6 relative w-full rounded-lg md:rounded-3xl">
                            <PrincipalFormContact />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ContactForm;

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"




function InfoBox() {
    const { t } = useTranslation()

    return (
        <div className="absolute z-[2] bottom-0 right-0 hidden lg:block">

            <Card className="relative w-80 border-none rounded-none rounded-tl-3xl border border-muted bg-background shadow-sm overflow-visible">
                <div
                    className="absolute bottom-0 left-[-30px] w-[30px] h-[30px] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 100% 100%, transparent 29px, hsl(0 0% 100%) 30px)",
                        transform: "rotate(180deg)",
                    }}
                />
                <div
                    className="absolute top-[-30px] right-0 w-[30px] h-[30px] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 100% 100%, transparent 29px, hsl(0 0% 100%) 30px)",
                        transform: "rotate(180deg)",
                    }}
                />

            </Card>
        </div>
    )
}

function InfoBox2() {
    const { t } = useTranslation()

    return (
        <div className="absolute z-[2] top-0 left-0 hidden lg:block">

            <Card className="relative w-80 border-none rounded-none rounded-br-3xl border border-muted bg-background shadow-sm overflow-visible">
                <div
                    className="absolute top-0 right-[-30px] w-[30px] h-[30px] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 100% 100%, transparent 29px, hsl(0 0% 100%) 30px)",
                        transform: "rotate(360deg)",
                    }}
                />
                <div
                    className="absolute bottom-[-30px] left-0 w-[30px] h-[30px] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 100% 100%, transparent 29px, hsl(0 0% 100%) 30px)",
                        transform: "rotate(0deg)",
                    }}
                />

            </Card>
        </div>
    )
}