import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TranslationsProvider } from "@/components/TranslationsProvider";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Structured Data para SEO Local
const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Easy Closers",
  url: "https://easyclosers.com",
  logo: "https://easyclosers.com/logo.png",
  image: "https://easyclosers.com/banner6.jpg",
  description:
    "We buy houses for cash in California. Sell your house fast in Cerritos, Los Angeles, and Orange County without repairs or commissions.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "18000 Studebaker Rd #700",
    addressLocality: "Cerritos",
    addressRegion: "CA",
    postalCode: "90703",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "33.8644",
    longitude: "-118.0956",
  },
  areaServed: [
    {
      "@type": "State",
      name: "California",
    },
    {
      "@type": "City",
      name: "Cerritos",
    },
    {
      "@type": "City",
      name: "Los Angeles",
    },
    {
      "@type": "AdministrativeArea",
      name: "Orange County",
    },
    {
      "@type": "AdministrativeArea",
      name: "Riverside County",
    },
    {
      "@type": "AdministrativeArea",
      name: "San Bernardino County",
    },
  ],
  priceRange: "$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://facebook.com/profile.php?id=61577957411678",
    "https://instagram.com/easyclosers",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-888-788-4828",
    contactType: "customer service",
    areaServed: "CA",
    availableLanguage: ["English", "Spanish"],
  },
};

export const metadata: Metadata = {
  title: {
    default:
      "Sell Your House Fast in California | We Buy Houses Cash | Easy Closers",
    template: "%s | Easy Closers California",
  },
  description:
    "Sell your house fast for cash in California. No repairs, no cleaning, no fees. We buy houses in Cerritos, Los Angeles, Orange County & Riverside. Get a fair cash offer today.",
  keywords:
    "sell house fast california, we buy houses cash california, vender casa rapido california, sell my house fast cerritos, cash home buyers los angeles, real estate investors southern california, sell as-is california",
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
      "en-US": "/en",
      "es-ES": "/es",
    },
  },
  openGraph: {
    title: "Sell Your House Fast in California | No Repairs | Easy Closers",
    description:
      "We buy houses for cash across Southern California. Sell your home in Cerritos, LA, or Orange County in as little as 7 days. No commissions, no repairs.",
    url: "https://easyclosers.com",
    siteName: "Easy Closers",
    images: [
      {
        url: "/banner6.jpg",
        width: 1200,
        height: 630,
        alt: "Easy Closers - We Buy Houses For Cash in California",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your House Fast in California | Easy Closers",
    description:
      "We buy houses for cash in Cerritos, LA, and Orange County. No repairs needed. Get your fair cash offer today.",
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
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Function to load messages dynamically - Optimizada con cache
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!["en", "es"].includes(locale)) {
    notFound();
  }

  const messages = await loadMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="fav.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationsProvider messages={messages}>
          <JsonLd data={jsonLdData} />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </TranslationsProvider>
      </body>
    </html>
  );
}
