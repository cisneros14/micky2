"use client";

import { DollarSign, Calendar, Home, Package } from "lucide-react";
import { PropertyQuoteForm } from "./property-quote-form";

import { Logo } from "./logo";
import { Card } from "./ui/card";

import { useTranslation } from "@/components/TranslationsProvider";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen bg-primary px-4 py-24">
      <div className="container mx-auto ">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 md:pt-12">
          {/* Left Content */}
          <div className="flex flex-col justify-start pt-8 md:pt-20 space-y-8 text-primary-foreground">
            <Logo className="w-50 bg-white rounded-3xl p-5 hidden md:block" />

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground text-balance">
                {t("hero.title", "The Easiest Way to Sell Your House")}
              </h1>
              <p className="text-xl text-primary-foreground/90 text-pretty max-w-[600px]">
                {t(
                  "hero.description",
                  "No repairs, no commissions, and no cleaning. Get a fair cash offer today and close on your timeline. Easy, simple and hassle-free",
                )}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("hero.features.commissions.title", "$0 Commissions")}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    {t(
                      "hero.features.commissions.desc",
                      "Keep more money in your pocket",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("hero.features.timeline.title", "Close in 7 Days")}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    {t(
                      "hero.features.timeline.desc",
                      "Or choose your own timeline",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("hero.features.asis.title", "Sell As-Is")}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    {t(
                      "hero.features.asis.desc",
                      "No repairs or renovations needed",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("hero.features.leave.title", "Leave Everything")}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    {t(
                      "hero.features.leave.desc",
                      "Take what you want, leave the rest",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="flex items-center">
            {/* <Card className="w-full p-8 shadow-2xl bg-card text-card-foreground">
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold text-primary">
                    Get Your Cash Offer
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below for a no-obligation offer within 24
                    hours
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Property Address{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="Enter your property address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="situation">
                      Tell us about your situation (Optional)
                    </Label>
                    <Textarea
                      id="situation"
                      placeholder="e.g., Inherited property, facing foreclosure, need quick sale..."
                      rows={4}
                    />
                  </div>

                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 text-base font-semibold">
                    ➤ Get My Fair Cash Offer
                  </Button>
                </form>
              </div>
            </Card> */}
            <Card className="w-full shadow-xl rounded-3xl bg-card text-card-foreground p-4 md:p-14">
              <h2 className="subtitle text-center">{t("quoteForm.title", "Get Your Cash Offer")}</h2>
              <PropertyQuoteForm />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
