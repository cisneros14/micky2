"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/components/TranslationsProvider";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function PrincipalFormContact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const recaptchaToken = recaptchaRef.current?.getValue();

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptcha: recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success(t("contact.success.title", "Quote Request Received!"), {
        description: t(
          "contact.success.description",
          "We'll be in touch regarding your property shortly.",
        ),
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(t("contact.error.title", "Error"), {
        description: t(
          "contact.error.description",
          "There was a problem submitting your request. Please try again.",
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 md:py-24 bg-muted/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary text-balance">
            {t("contact.title", "Get Your No-Obligation Offer")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t(
              "contact.description",
              "Have questions? Ready to sell? Fill out the form below or contact us directly. We're here to help.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 max-w-6xl mx-auto w-full">
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1 w-full">
            <Card className="border-none shadow-lg bg-primary text-primary-foreground overflow-hidden relative w-full">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
              <CardContent className="p-5 sm:p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-2 break-words">
                    {t("contact.info.title", "Contact Information")}
                  </h3>
                  <p className="text-primary-foreground/80 break-words">
                    {t(
                      "contact.info.subtitle",
                      "Reach out to us through any of these channels.",
                    )}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white/10 rounded-lg shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-primary-foreground/60 mb-1 truncate">
                        {t("contact.info.phone.label", "Call Us")}
                      </p>
                      <a
                        href="tel:+18887884828"
                        className="text-base sm:text-lg font-bold hover:text-secondary transition-colors block break-words"
                      >
                        (888) 788-4828
                      </a>
                      <p className="text-xs text-primary-foreground/60 mt-1 break-words">
                        {t("contact.info.phone.sub", "Mon-Fri 9am-6pm PST")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white/10 rounded-lg shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-primary-foreground/60 mb-1 truncate">
                        {t("contact.info.email.label", "Email Us")}
                      </p>
                      <a
                        href="mailto:info@easyclosers.com"
                        className="text-base sm:text-lg font-bold hover:text-secondary transition-colors block break-all sm:break-words"
                      >
                        info@easyclosers.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white/10 rounded-lg shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-primary-foreground/60 mb-1 truncate">
                        {t("contact.info.office.label", "Office")}
                      </p>
                      <p className="font-medium text-sm sm:text-base break-words">
                        18000 Studebaker Rd #700
                        <br />
                        Cerritos, CA 90703
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-border w-full">
              <CardContent className="p-5 sm:p-6 flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-green-100 text-green-600 rounded-full shrink-0">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-foreground text-sm sm:text-base break-words">
                    {t("contact.info.trust.title", "Trusted & Verified")}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">
                    {t(
                      "contact.info.trust.desc",
                      "Licensed Real Estate Professionals",
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="lg:col-span-2 shadow-xl border-border w-full">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {t("contact.form.labels.name", "Full Name")}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setShowRecaptcha(true)}
                      placeholder={t(
                        "contact.form.placeholders.name",
                        "John Doe",
                      )}
                      className="bg-muted/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t("contact.form.labels.phone", "Phone Number")}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setShowRecaptcha(true)}
                      placeholder={t(
                        "contact.form.placeholders.phone",
                        "(555) 123-4567",
                      )}
                      className="bg-muted/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t("contact.form.labels.email", "Email Address")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setShowRecaptcha(true)}
                    placeholder={t(
                      "contact.form.placeholders.email",
                      "john@example.com",
                    )}
                    className="bg-muted/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    {t("contact.form.labels.address", "Property Address")}
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={() => setShowRecaptcha(true)}
                    placeholder={t(
                      "contact.form.placeholders.address",
                      "123 Main St, Riverside, CA",
                    )}
                    className="bg-muted/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    {t("contact.form.labels.message", "Message (Optional)")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setShowRecaptcha(true)}
                    placeholder={t(
                      "contact.form.placeholders.message",
                      "Tell us about your property and situation...",
                    )}
                    className="min-h-[120px] bg-muted/50 resize-y"
                  />
                </div>

                <div className="flex justify-center min-h-[78px]">
                  {showRecaptcha && (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      theme="light"
                    />
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t("contact.form.button.loading", "Sending Request...")}
                    </>
                  ) : (
                    <>
                      {t(
                        "contact.form.button.submit",
                        "Get My Fair Cash Offer",
                      )}
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  {t(
                    "contact.form.disclaimer",
                    "By submitting this form, you agree to our Privacy Policy and Terms of Service.",
                  )}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
