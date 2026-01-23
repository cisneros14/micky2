"use client";

import { cn } from "@/lib/utils";
import type React from "react";

import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home,
  Phone,
  Mail,
  AlertCircle,
  MapPin,
  User,
  MessageSquare,
  CircleAlert,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { useTranslation } from "@/components/TranslationsProvider";

declare global {
  interface Window {
    google: any;
    grecaptcha: {
      render?: (container: HTMLElement | string, parameters: any) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    initMap?: () => void;
    onRecaptchaForm?: (token: string) => void;
    onRecaptchaExpired?: () => void;
    onRecaptchaLoadForm?: () => void;
  }
}

// Hook personalizado para cargar Google Maps - LAZY LOAD
function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadMaps = useCallback(() => {
    if (isLoaded || isLoading) return;

    // Si ya está cargado globalmente
    if (window.google && window.google.maps && window.google.maps.places) {
      setIsLoaded(true);
      return;
    }

    setIsLoading(true);

    // Si ya hay un script cargándose
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]',
    );
    if (existingScript) {
      const checkGoogleMaps = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          setIsLoaded(true);
          setIsLoading(false);
        } else {
          setTimeout(checkGoogleMaps, 100);
        }
      };
      checkGoogleMaps();
      return;
    }

    // Cargar el script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Callback global para inicialización
    window.initMap = () => {
      // Verificar si hay errores de facturación
      if (window.google && window.google.maps && !window.google.maps.places) {
        setError("Places API requiere facturación habilitada");
        return;
      }

      setIsLoaded(true);
      setIsLoading(false);
      delete window.initMap; // Limpiar callback
    };

    script.onerror = () => {
      setError(
        "Google Maps requiere facturación habilitada en Google Cloud Console",
      );
      setIsLoading(false);
    };

    document.head.appendChild(script);
  }, [isLoaded, isLoading]);

  useEffect(() => {
    return () => {
      // Cleanup si el componente se desmonta
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  return { isLoaded, error, loadMaps };
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  address: string;
  propertyNumber: string;
  notes: string;
  photos: File[];
}

interface PropertyQuoteFormProps {
  onFormSubmitSuccess?: () => void;
}

// Componente de autocompletado de direcciones
interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  placeholder?: string;
  className?: string;
  onFocusTrigger?: () => void;
}

function AddressAutocomplete({
  value,
  onChange,
  placeholder,
  className,
  onFocusTrigger,
}: AddressAutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const { isLoaded, loadMaps } = useGoogleMaps();
  const { t } = useTranslation();

  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    init,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "us" }, // Solo Estados Unidos
      types: ["address"], // Solo direcciones
    },
    debounce: 300,
    cache: 24 * 60 * 60, // Cache por 24 horas
    initOnMount: false, // No inicializar hasta que Google Maps esté listo
  });

  // Inicializar automáticamente cuando Google Maps esté listo
  useEffect(() => {
    if (
      isLoaded &&
      !ready &&
      window.google &&
      window.google.maps &&
      window.google.maps.places
    ) {
      try {
        init();
      } catch (error) {
        // Error silencioso
      }
    }
  }, [isLoaded, ready, init]);

  // No necesitamos sincronizar displayValue con value mediante useEffect para evitar renders en cascada.
  // En su lugar, inicializamos displayValue con el valor inicial y confiamos en handleInputChange.

  const handleInputFocus = () => {
    onFocusTrigger?.(); // Notificar al padre para cargar recaptcha si es necesario
    loadMaps(); // Cargar Maps solo al hacer focus
    setShowSuggestions(displayValue.length > 2 && ready && isLoaded);
  };

  // No mostrar error si hay problemas cargando Google Maps ya que decidimos simplificar el hook

  const handleSelect = async (description: string) => {
    if (ready && isLoaded) {
      setValue(description, false);
      clearSuggestions();
    }
    setShowSuggestions(false);
    setDisplayValue(description);
    setIsValidAddress(true);
    onChange(description);

    try {
      if (ready && isLoaded) {
        await getGeocode({ address: description });
        // Coordenadas disponibles para uso futuro si se necesitan
      }
    } catch {
      // Error silencioso al obtener coordenadas
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);

    // Si el usuario modifica la dirección, ya no es válida
    if (inputValue !== value) {
      setIsValidAddress(false);
      onChange(""); // Limpiar el valor del formulario
    }

    if (ready && isLoaded) {
      setValue(inputValue);
    }
    setShowSuggestions(inputValue.length > 2 && ready && isLoaded);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn(
            "pl-10 h-13",
            className,
            !isValidAddress && displayValue.length > 0 && ready && isLoaded
              ? "border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              : isValidAddress
                ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                : "",
          )}
          onFocus={handleInputFocus}
          onBlur={() => {
            // Delay para permitir click en sugerencias
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {!isLoaded ? null : !ready ? ( // No mostrar loader hasta que el usuario intente interactuar
            <div
              className="animate-pulse h-3 w-3 bg-yellow-400 rounded-full"
              title="Inicializando autocompletado..."
            ></div>
          ) : isValidAddress ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : displayValue.length > 0 ? (
            <CircleAlert className="h-4 w-4 text-orange-500" />
          ) : null}
        </div>
      </div>

      {/* Mensaje de ayuda para dirección no válida */}
      {!isValidAddress &&
        displayValue.length > 0 &&
        ready &&
        isLoaded &&
        !showSuggestions && (
          <div className="mt-1 text-xs text-orange-500">
            {t(
              "quoteForm.errors.addressPrecision",
              "Por favor, selecciona una dirección de las sugerencias para mayor precisión",
            )}
          </div>
        )}

      {showSuggestions &&
        ready &&
        isLoaded &&
        status === "OK" &&
        data.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {data.map((suggestion) => (
              <div
                key={suggestion.place_id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleSelect(suggestion.description)}
              >
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {suggestion.structured_formatting.main_text}
                    </div>
                    <div className="text-xs text-gray-500">
                      {suggestion.structured_formatting.secondary_text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export function PropertyQuoteForm({
  onFormSubmitSuccess,
}: PropertyQuoteFormProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    address: "",
    propertyNumber: "",
    notes: "",
    photos: [],
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(false);

  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  // Función para cargar ReCAPTCHA on demand
  const loadRecaptcha = useCallback(() => {
    if (isRecaptchaLoaded || isRecaptchaLoading) return;

    setIsRecaptchaLoading(true);

    const renderWidget = () => {
      if (
        recaptchaRef.current &&
        window.grecaptcha &&
        window.grecaptcha.render
      ) {
        try {
          // Limpiar widget anterior si existe
          if (widgetIdRef.current !== null) {
            window.grecaptcha.reset(widgetIdRef.current);
          }
          // Renderizar nuevo widget
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            callback: "onRecaptchaForm",
            "expired-callback": "onRecaptchaExpired",
          });
          setIsRecaptchaLoaded(true);
          setIsRecaptchaLoading(false);
        } catch (error) {
          console.error("Error rendering reCAPTCHA:", error);
          setIsRecaptchaLoading(false);
        }
      }
    };

    // Definir callbacks globales
    window.onRecaptchaForm = function (token: string) {
      setRecaptchaToken(token);
      setRecaptchaError(null);
    };
    window.onRecaptchaExpired = function () {
      setRecaptchaToken(null);
      setRecaptchaError(
        t(
          "quoteForm.errors.recaptchaExpired",
          "El reto reCAPTCHA expiró. Intenta de nuevo.",
        ),
      );
    };
    // Callback global para cuando se carga el script
    (window as any).onRecaptchaLoadForm = renderWidget;

    if (
      typeof window !== "undefined" &&
      !document.getElementById("recaptcha-script-form")
    ) {
      const script = document.createElement("script");
      script.id = "recaptcha-script-form";
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadForm&render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else if (window.grecaptcha && window.grecaptcha.render) {
      renderWidget();
    }
  }, [isRecaptchaLoaded, isRecaptchaLoading, t]);

  useEffect(() => {
    loadRecaptcha(); // Cargar inmediatamente por petición del usuario
    return () => {
      // Cleanup: resetear widget al desmontar
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
  }, [loadRecaptcha]);

  const handleInteraction = () => {
    loadRecaptcha();
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    handleInteraction(); // Cargar scripts al escribir
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // formData properties used for validation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecaptchaError(null);

    // Si el usuario envía rápido antes de que cargue el recaptcha
    if (!isRecaptchaLoaded) {
      loadRecaptcha();
      setRecaptchaError(
        t(
          "quoteForm.errors.recaptchaLoading",
          "Verificando seguridad, por favor espera un momento...",
        ),
      );
      return;
    }

    if (!recaptchaToken) {
      setRecaptchaError(
        t(
          "quoteForm.errors.recaptcha",
          "Por favor, resuelve el reCAPTCHA para continuar.",
        ),
      );
      return;
    }

    // Validar el token en el backend antes de enviar la cotización
    const res = await fetch("/api/recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: recaptchaToken }),
    });
    const data = await res.json();
    if (!data.success) {
      setRecaptchaError(
        t(
          "quoteForm.errors.humanVerification",
          "No pudimos verificar que eres humano. Intenta de nuevo.",
        ),
      );
      if ((window as any).grecaptcha && (window as any).grecaptcha.reset) {
        (window as any).grecaptcha.reset();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar directamente a Follow Up Boss
      const nameParts = formData.name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const response = await fetch("/api/fub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "Easy Closers Web",
          type: "Inquiry",
          message: `Address: ${formData.address}\n\nProperty Number: ${formData.propertyNumber}\n\nProperty Type: ${formData.propertyType}\n\nNotes: ${formData.notes}`,
          person: {
            firstName,
            lastName,
            emails: [{ value: formData.email, type: "work" }],
            phones: [{ value: formData.phone, type: "mobile" }],
            tags: ["Web Lead", "Quote Form"],
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al enviar la cotización");
      }

      toast.success(
        t(
          "quoteForm.success",
          "¡Gracias! Hemos recibido tu solicitud de cotización.",
        ),
        {
          className: "bg-green-500 text-white",
        },
      );
      onFormSubmitSuccess?.();

      // Limpiar formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        address: "",
        propertyNumber: "",
        notes: "",
        photos: [],
      });
    } catch (error) {
      console.error("Error:", error);
      setError(
        t(
          "quoteForm.errors.submission",
          "Error al enviar la cotización. Inténtalo de nuevo.",
        ),
      );
      toast.error(
        t(
          "quoteForm.errors.submission",
          "Error al enviar la cotización. Inténtalo de nuevo.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <div className="space-y-6">
        <div className="space-y-2 text-center mb-3">
          <p className="text-muted-foreground">
            {t("quoteForm.subtitle", "No repairs, no fees, no obligation.")}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 relative h-fit">
          <div className="space-y-4 md:space-y-5">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="w-full">
                <AddressAutocomplete
                  value={formData.address}
                  onChange={(address) => handleInputChange("address", address)}
                  placeholder={t(
                    "quoteForm.fields.address",
                    "Property address * (select from suggestions)",
                  )}
                  className="mt-1 bg-gray-50"
                  onFocusTrigger={handleInteraction}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder={t("quoteForm.fields.name", "Full name *")}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1 bg-gray-50 pl-10 h-13"
                  required
                  onFocus={handleInteraction}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="w-full">
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("quoteForm.fields.phone", "Phone *")}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10 h-13 bg-gray-50"
                    required
                    onFocus={handleInteraction}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t("quoteForm.fields.email", "Email *")}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 h-13 bg-gray-50"
                  required
                  onFocus={handleInteraction}
                />
              </div>
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="notes"
                placeholder={t(
                  "quoteForm.fields.notes",
                  "Tell us about your situation (Optional)",
                )}
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="mt-1 bg-gray-50 resize-none pl-10"
                rows={3}
                onFocus={handleInteraction}
              />
              <p className="text-sm text-center mt-5 text-muted-foreground">
                {t(
                  "quoteForm.security",
                  "Your information is 100% secure and confidential",
                )}
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {t("quoteForm.errors.incomplete", "Campos incompletos")}
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center my-2">
            <div ref={recaptchaRef}></div>
          </div>

          <div className="py-3 w-full bg-white border-t border-muted">
            <Button
              type="submit"
              variant="secondary"
              className="w-full disabled:opacity-50 md:py-6"
              disabled={isSubmitting}
              onMouseEnter={handleInteraction}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent-foreground border-t-transparent" />
                  {t("quoteForm.button.loading", "Sending quote...")}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {t("quoteForm.button.submit", "Get My Fair Cash Offer")}
                </div>
              )}
            </Button>
          </div>

          {recaptchaError && (
            <div className="text-red-500 text-sm text-center mb-2">
              {recaptchaError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
