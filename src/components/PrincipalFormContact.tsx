"use client";

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaContact?: (token: string) => void;
    onRecaptchaContactExpired?: () => void;
    onRecaptchaLoadContact?: () => void;
  }
}

import type React from "react";
import { useRef, useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/TranslationsProvider";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { PropertyQuoteModal } from "./property-quote-modal";

export default function PrincipalFormContact() {
  const { t } = useTranslation();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const renderWidget = () => {
      if (
        recaptchaRef.current &&
        window.grecaptcha &&
        window.grecaptcha.render
      ) {
        try {
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: "6LfhXd4rAAAAAM1qMSDMmGpaBhkdkp6O7ViH4D0i",
            callback: "onRecaptchaContact",
            "expired-callback": "onRecaptchaContactExpired",
          });
        } catch (error) {
          console.error("Error rendering reCAPTCHA:", error);
        }
      }
    };

    window.onRecaptchaLoadContact = renderWidget;

    if (
      typeof window !== "undefined" &&
      !document.getElementById("recaptcha-script-contact")
    ) {
      const script = document.createElement("script");
      script.id = "recaptcha-script-contact";
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadContact&render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else if (window.grecaptcha && window.grecaptcha.render) {
      renderWidget();
    }

    window.onRecaptchaContact = function (token: string) {
      setRecaptchaToken(token);
      setRecaptchaError(null);
    };
    window.onRecaptchaContactExpired = function () {
      setRecaptchaToken(null);
      setRecaptchaError("El reto reCAPTCHA expiró. Intenta de nuevo.");
    };

    return () => {
      if (
        widgetIdRef.current !== null &&
        window.grecaptcha &&
        window.grecaptcha.reset
      ) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (error) {
          console.error("Error resetting reCAPTCHA:", error);
        }
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecaptchaError(null);

    if (!recaptchaToken) {
      setRecaptchaError("Por favor, resuelve el reCAPTCHA para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🔍 Iniciando envío del formulario con datos:", {
        name: formData.name,
        email: formData.email,
        hasToken: !!recaptchaToken,
      });

      // Validar el token en el backend
      const recaptchaRes = await fetch("/api/recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      console.log("📡 Respuesta reCAPTCHA status:", recaptchaRes.status);
      const recaptchaData = await recaptchaRes.json();
      console.log("✅ reCAPTCHA validado:", recaptchaData);

      if (!recaptchaData.success) {
        console.error("❌ reCAPTCHA falló");
        setRecaptchaError(
          "No pudimos verificar que eres humano. Intenta de nuevo."
        );
        if (
          widgetIdRef.current !== null &&
          window.grecaptcha &&
          window.grecaptcha.reset
        ) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
        setIsSubmitting(false);
        return;
      }

      // Guardar el contacto en la base de datos
      console.log("💾 Guardando contacto en base de datos...");
      const contactRes = await fetch("/api/clientes/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.name,
          email: formData.email,
          mensaje: formData.message,
          fuente: "Formulario de Contacto",
        }),
      });

      console.log("📡 Respuesta contacto status:", contactRes.status);
      const contactData = await contactRes.json();
      console.log("📋 Datos guardados:", contactData);

      if (contactData.success) {
        console.log("✅ Formulario enviado exitosamente");
        alert(t("contactForm.form.submitted"));
        // Resetear el formulario
        setFormData({ name: "", email: "", message: "" });
        setRecaptchaToken(null);
        if (
          widgetIdRef.current !== null &&
          window.grecaptcha &&
          window.grecaptcha.reset
        ) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
      } else {
        console.error("❌ Error en respuesta:", contactData);
        alert(
          `Error al enviar el formulario: ${
            contactData.error || "Error desconocido"
          }`
        );
      }
    } catch (error) {
      console.error("❌ Error al enviar el formulario:", error);
      alert(
        `Error al enviar el formulario: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-balance">
                {t("contactPage.title")}
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                {t("contactPage.description")}
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("contactPage.email.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("contactPage.email.description")}
                  </p>
                  <a
                    href="mailto:hello@easyclosers.com"
                    className="text-primary hover:underline mt-1 block"
                  >
                    hello@easyclosers.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("contactPage.phone.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("contactPage.phone.description")}
                  </p>
                  <a
                    href="tel:+15551234567"
                    className="text-primary hover:underline mt-1 block"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t("contactPage.office.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("contactPage.office.description")}
                  </p>
                  <p className="text-muted-foreground mt-1 whitespace-pre-line">
                    {t("contactPage.office.address")}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-8 border-t">
              <h3 className="font-semibold text-lg mb-4">
                {t("footer.social.followUs") || "Follow Us"}
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-3 bg-muted hover:bg-primary hover:text-white rounded-full transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="sr-only">{t("footer.social.facebook")}</span>
                </a>
                <a
                  href="#"
                  className="p-3 bg-muted hover:bg-primary hover:text-white rounded-full transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">
                    {t("footer.social.instagram")}
                  </span>
                </a>
                <a
                  href="#"
                  className="p-3 bg-muted hover:bg-primary hover:text-white rounded-full transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="sr-only">{t("footer.social.linkedin")}</span>
                </a>
                <a
                  href="#"
                  className="p-3 bg-muted hover:bg-primary hover:text-white rounded-full transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  <span className="sr-only">{t("footer.social.youtube")}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <CardContent className="p-8 bg-card rounded-xl shadow-lg border">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-semibold text-foreground block pl-2"
                >
                  {t("contactForm.form.name.label")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contactForm.form.name.placeholder")}
                  required
                  className="md:h-12 p-4 md:p-4 text-base bg-muted/50 border-input rounded-lg 
                                             focus:bg-background focus:ring-2 focus:ring-primary/20 
                                             transition-all duration-200 placeholder:text-muted-foreground"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-foreground block pl-2"
                >
                  {t("contactForm.form.email.label")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contactForm.form.email.placeholder")}
                  required
                  className="md:h-12 p-4 md:p-4 text-base bg-muted/50 border-input rounded-lg 
                                             focus:bg-background focus:ring-2 focus:ring-primary/20 
                                             transition-all duration-200 placeholder:text-muted-foreground"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-sm font-semibold text-foreground block pl-2 "
                >
                  {t("contactForm.form.message.label")}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contactForm.form.message.placeholder")}
                  rows={4}
                  required
                  className="min-h-[120px] p-4 text-base bg-muted/50 border-input rounded-lg 
                                             focus:bg-background focus:ring-2 focus:ring-primary/20 
                                             transition-all duration-200 resize-none placeholder:text-muted-foreground"
                />
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-center my-2">
                <div ref={recaptchaRef}></div>
              </div>
              {recaptchaError && (
                <div className="text-destructive text-sm text-center mb-2">
                  {recaptchaError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <PropertyQuoteModal className="flex-1 w-full" />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 w-full h-auto py-3 text-lg font-semibold shadow-md"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting
                    ? t("contactForm.form.submitting") || "Enviando..."
                    : t("contactForm.form.submit")}
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </section>
  );
}
