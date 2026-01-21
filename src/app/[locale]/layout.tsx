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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Structured Data para SEO
const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Easy Closers",
  url: "https://easyclosers.com",
  logo: "https://easyclosers.com/logo.png", // Asegúrate de tener un logo.png en public
  sameAs: [
    "https://facebook.com/easyclosers",
    "https://twitter.com/easyclosers",
    "https://instagram.com/easyclosers",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-800-555-5555", // Reemplazar con el teléfono real
    contactType: "customer service",
  },
};

export const metadata: Metadata = {
  title: {
    default:
      "Easy Closers - We Buy Houses For Cash | No Repairs, No Commissions",
    template: "%s | Easy Closers",
  },
  description:
    "Sell your house fast for cash. No repairs, no cleaning, no showings required. Get a fair offer in 24-48 hours. Over 25 years of experience buying homes as-is.",
  keywords:
    "sell house fast, cash home buyers, we buy houses, no repairs, no commissions, sell house as-is, quick home sale, cash offer, real estate investors",
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
    title: "Easy Closers - We Buy Houses For Cash | No Repairs, No Commissions",
    description:
      "Sell your house fast for cash. No repairs, no cleaning, no showings required. Get a fair offer in 24-48 hours. Over 25 years of experience buying homes as-is.",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Closers - We Buy Houses For Cash | No Repairs, No Commissions",
    description:
      "Sell your house fast for cash. No repairs, no cleaning, no showings required. Get a fair offer in 24-48 hours. Over 25 years of experience buying homes as-is.",
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
