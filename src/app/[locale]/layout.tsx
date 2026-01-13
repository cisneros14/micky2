import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TranslationsProvider } from "@/components/TranslationsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const messageCache = new Map<string, any>();

async function loadMessages(locale: string) {
  try {
    // Verificar cache primero
    if (messageCache.has(locale)) {
      return messageCache.get(locale);
    }

    const messages = await import(`@/locales/${locale}.json`);
    const result = messages.default;

    // Guardar en cache
    messageCache.set(locale, result);

    return result;
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    // Fallback to default locale if the requested locale file is not found
    const defaultMessages = await import(`@/locales/en.json`);
    return defaultMessages.default;
  }
}

// Structured Data para SEO - Memoizado para evitar recreaciones
const generateStructuredData = (locale: string) => {
  const isEnglish = locale === "en";

  const baseData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Easy Closers",
    alternateName: "Easy Closers",
    description: isEnglish
      ? "We buy houses for cash, as-is, and fast. No repairs, no commissions, no hassle. Get a fair offer in 24-48 hours."
      : "Compramos casas en efectivo, tal como están y rápido. Sin reparaciones, sin comisiones, sin complicaciones. Obtén una oferta justa en 24-48 horas.",
    url: "https://easyclosers.com",
    logo: "https://easyclosers.com/logo.png",
    image: "https://easyclosers.com/banner6.jpg",
    telephone: "+1-800-EASY-CLOSERS",
    email: "info@easyclosers.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressRegion: "California",
      addressLocality: "Los Angeles",
      postalCode: "90210",
    },
    areaServed: [
      {
        "@type": "State",
        name: "California",
        description: "Los Angeles, San Diego, Orange County, Riverside",
      },
      {
        "@type": "State",
        name: "Texas",
        description: "Houston, Dallas, San Antonio, Austin",
      },
      {
        "@type": "State",
        name: "Florida",
        description: "Miami, Orlando, Tampa, Jacksonville",
      },
    ],
    foundingDate: "1999",
    numberOfEmployees: "50+",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "700+",
      bestRating: "5",
      worstRating: "1",
    },
    serviceType: "Cash Home Buying",
    priceRange: "$$",
    paymentAccepted: ["Cash", "Bank Transfer"],
    currenciesAccepted: "USD",
    openingHours: "Mo-Fr 08:00-17:00",
    sameAs: [
      "https://www.facebook.com/easyclosers",
      "https://www.instagram.com/easyclosers",
      "https://www.youtube.com/easyclosers",
      "https://www.linkedin.com/company/easyclosers",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isEnglish ? "Home Buying Services" : "Servicios de Compra de Casas",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isEnglish
              ? "Cash Home Purchase"
              : "Compra de Casa en Efectivo",
            description: isEnglish
              ? "We buy houses for cash, as-is, no repairs needed"
              : "Compramos casas en efectivo, tal como están, sin reparaciones necesarias",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isEnglish ? "Fast House Sale" : "Venta Rápida de Casa",
            description: isEnglish
              ? "Sell your house in 7-14 days"
              : "Vende tu casa en 7-14 días",
          },
        },
      ],
    },
  };

  return baseData;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";

  const title = isEnglish
    ? "Easy Closers - We Buy Houses For Cash | No Repairs, No Commissions"
    : "Easy Closers - Compramos Casas en Efectivo | Sin Reparaciones, Sin Comisiones";

  const description = isEnglish
    ? "Sell your house fast for cash. No repairs, no cleaning, no showings required. Get a fair offer in 24-48 hours. Over 25 years of experience buying homes as-is."
    : "Vende tu casa rápido por efectivo. Sin reparaciones, sin limpieza, sin visitas. Obtén una oferta justa en 24-48 horas. Más de 25 años de experiencia comprando casas tal como están.";

  const keywords = isEnglish
    ? "sell house fast, cash home buyers, we buy houses, no repairs, no commissions, sell house as-is, quick home sale, cash offer, real estate investors"
    : "vender casa rápido, compradores de casas en efectivo, compramos casas, sin reparaciones, sin comisiones, vender casa tal como está, venta rápida de casa, oferta en efectivo, inversionistas inmobiliarios";

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Easy Closers" }],
    creator: "Easy Closers",
    publisher: "Easy Closers",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://easyclosers.com"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      title,
      description,
      url: "https://easyclosers.com",
      siteName: "Easy Closers",
      images: [
        {
          url: "/banner6.jpg",
          width: 1200,
          height: 630,
          alt: "Easy Closers - We Buy Houses For Cash",
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/banner6.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
    category: "Real Estate",
    classification: "Business",
    other: {
      "msapplication-TileColor": "#00517d",
      "theme-color": "#00517d",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": "Easy Closers",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await loadMessages(locale);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationsProvider messages={messages}>
          {children}
        </TranslationsProvider>
      </body>
    </html>
  );
}
