"use client";

import { cn } from "@/lib/utils";
import type React from "react";
import { useTranslation } from "@/components/TranslationsProvider";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  MapPin,
  Building,
  User,
  MessageSquare,
  CircleAlert,
  Check,
  MapPinHouse,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

declare global {
  interface Window {
    google: any;
    grecaptcha: any;
    initMap?: () => void;
    onRecaptchaForm?: (token: string) => void;
    onRecaptchaExpired?: () => void;
    onRecaptchaLoadForm?: () => void;
  }
}

// Hook personalizado para cargar Google Maps
function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si ya está cargado
    if (window.google && window.google.maps && window.google.maps.places) {
      setIsLoaded(true);
      return;
    }

    // Si ya hay un script cargándose
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    );
    if (existingScript) {
      const checkGoogleMaps = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          setIsLoaded(true);
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
      delete window.initMap; // Limpiar callback
    };

    script.onerror = () => {
      setError(
        "Google Maps requiere facturación habilitada en Google Cloud Console"
      );
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup si el componente se desmonta
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  return { isLoaded, error };
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
}

function AddressAutocomplete({
  value,
  onChange,
  placeholder,
  className,
}: AddressAutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const { isLoaded, error } = useGoogleMaps();

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

  // Inicializar manualmente cuando Google Maps esté listo
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

  // Sincronizar displayValue con value externo
  useEffect(() => {
    if (value !== displayValue) {
      setDisplayValue(value);
      setIsValidAddress(false);
    }
  }, [value]);

  // Mostrar error si hay problemas cargando Google Maps
  if (error) {
    return (
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`${placeholder} (Autocompletado no disponible)`}
          className={className}
        />
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400"
          title="Google Maps requiere facturación habilitada"
        >
          ⚠️
        </div>
      </div>
    );
  }

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
        const results = await getGeocode({ address: description });
        const { lat, lng } = await getLatLng(results[0]);
        // Coordenadas disponibles para uso futuro
      }
    } catch (error) {
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
              : ""
          )}
          onFocus={() =>
            setShowSuggestions(displayValue.length > 2 && ready && isLoaded)
          }
          onBlur={() => {
            // Delay para permitir click en sugerencias
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {!isLoaded ? (
            <div
              className="animate-spin h-3 w-3 border border-gray-300 border-t-blue-500 rounded-full"
              title="Cargando Google Maps..."
            ></div>
          ) : !ready ? (
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
            Por favor, selecciona una dirección de las sugerencias para mayor
            precisión
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
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  // Cargar el script de reCAPTCHA y renderizar el widget
  useEffect(() => {
    // Definir callbacks globales
    window.onRecaptchaForm = function (token: string) {
      setRecaptchaToken(token);
      setRecaptchaError(null);
    };
    window.onRecaptchaExpired = function () {
      setRecaptchaToken(null);
      setRecaptchaError("El reto reCAPTCHA expiró. Intenta de nuevo.");
    };

    const loadRecaptcha = () => {
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
    };

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
            sitekey: "6LfhXd4rAAAAAM1qMSDMmGpaBhkdkp6O7ViH4D0i",
            callback: "onRecaptchaForm",
            "expired-callback": "onRecaptchaExpired",
          });
        } catch (error) {
          console.error("Error rendering reCAPTCHA:", error);
        }
      }
    };

    // Callback global para cuando se carga el script
    (window as any).onRecaptchaLoadForm = renderWidget;

    loadRecaptcha();

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
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.propertyType &&
    formData.address;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecaptchaError(null);

    if (!recaptchaToken) {
      setRecaptchaError("Por favor, resuelve el reCAPTCHA para continuar.");
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
        "No pudimos verificar que eres humano. Intenta de nuevo."
      );
      if ((window as any).grecaptcha && (window as any).grecaptcha.reset) {
        (window as any).grecaptcha.reset();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos para la API
      const cotizacionData = {
        cliente_nombre: formData.name,
        cliente_correo: formData.email,
        cliente_telefono: formData.phone,
        tipo_propiedad: formData.propertyType,
        ubicacion: formData.address,
        numero_propiedad: formData.propertyNumber,
        notas: formData.notes || null,
      };

      // Enviar a la API pública
      const response = await fetch("/api/public/cotizaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cotizacionData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la cotización");
      }

      toast.success("¡Gracias! Hemos recibido tu solicitud de cotización.");
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
      setError("Error al enviar la cotización. Inténtalo de nuevo.");
      toast.error("Error al enviar la cotización. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const { t } = useTranslation();

  return (
    <Card className="w-full shadow-xl rounded-3xl bg-card text-card-foreground">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-primary">
              Get Your Cash Offer
            </h2>
            <p className="text-muted-foreground">
              No repairs, no fees, no obligation.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 relative h-fit">
            <div className="space-y-4 md:space-y-5">
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="sm:mr-2 flex-[2]">
                  <AddressAutocomplete
                    value={formData.address}
                    onChange={(address) =>
                      handleInputChange("address", address)
                    }
                    placeholder={t(
                      "propertyQuoteForm.addressPlaceholder",
                      "Dirección de la propiedad * (selecciona de las sugerencias)"
                    )}
                    className="mt-1 bg-gray-50"
                  />
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="propertyNumber"
                      placeholder={t(
                        "propertyQuoteForm.propertyNumberPlaceholder",
                        "Número, Piso (opcional)"
                      )}
                      value={formData.propertyNumber}
                      onChange={(e) =>
                        handleInputChange("propertyNumber", e.target.value)
                      }
                      className="mt-1 bg-gray-50 pl-10 h-13 "
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <div className="bg-gray-50 w-full rounded-md relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Select
                      required
                      value={formData.propertyType}
                      onValueChange={(value) =>
                        handleInputChange("propertyType", value)
                      }
                    >
                      <SelectTrigger className="mt-1 w-full pl-10 !h-13">
                        <SelectValue
                          placeholder={t(
                            "propertyQuoteForm.propertyTypePlaceholder",
                            "Tipo de propiedad *"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casa">
                          {t("propertyQuoteForm.type.casa", "Casa")}
                        </SelectItem>
                        <SelectItem value="departamento">
                          {t(
                            "propertyQuoteForm.type.departamento",
                            "Departamento"
                          )}
                        </SelectItem>
                        <SelectItem value="condominio">
                          {t("propertyQuoteForm.type.condominio", "Condominio")}
                        </SelectItem>
                        <SelectItem value="terreno">
                          {t("propertyQuoteForm.type.terreno", "Terreno")}
                        </SelectItem>
                        <SelectItem value="lote">
                          {t("propertyQuoteForm.type.lote", "Lote")}
                        </SelectItem>
                        <SelectItem value="oficina">
                          {t("propertyQuoteForm.type.oficina", "Oficina")}
                        </SelectItem>
                        <SelectItem value="local">
                          {t("propertyQuoteForm.type.local", "Local comercial")}
                        </SelectItem>
                        <SelectItem value="bodega">
                          {t("propertyQuoteForm.type.bodega", "Bodega")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t(
                        "propertyQuoteForm.phonePlaceholder",
                        "Teléfono *"
                      )}
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="pl-10 h-13 bg-gray-50"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder={t(
                      "propertyQuoteForm.namePlaceholder",
                      "Nombre completo *"
                    )}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1 bg-gray-50 pl-10 h-13"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t(
                      "propertyQuoteForm.emailPlaceholder",
                      "Email *"
                    )}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 h-13 bg-gray-50"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="notes"
                  placeholder={t(
                    "propertyQuoteForm.notesPlaceholder",
                    "Comentarios adicionales (opcional)"
                  )}
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="mt-1 bg-gray-50 resize-none pl-10"
                  rows={3}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Campos incompletos</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="py-3 sticky bottom-0 left-0 right-0 w-full bg-white border-t border-muted">
              <Button
                type="submit"
                className="w-full border !px-8 !py-6 text-lg bg-green-700 hover:bg-green-800 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent-foreground border-t-transparent" />
                    {t(
                      "propertyQuoteForm.submitting",
                      "Enviando cotización..."
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {t(
                      "propertyQuoteForm.submitButton",
                      "Obtener mi oferta gratis"
                    )}
                    <Send className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </div>

            <div className="flex justify-center my-2">
              <div ref={recaptchaRef}></div>
            </div>
            {recaptchaError && (
              <div className="text-red-500 text-sm text-center mb-2">
                {recaptchaError}
              </div>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
