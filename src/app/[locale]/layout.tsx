import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Structured Data para SEO
const generateStructuredData = () => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Easy Closers",
    alternateName: "Easy Closers",
    description:
      "We buy houses for cash, as-is, and fast. No repairs, no commissions, no hassle. Get a fair offer in 24-48 hours.",
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
      name: "Home Buying Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cash Home Purchase",
            description: "We buy houses for cash, as-is, no repairs needed",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fast House Sale",
            description: "Sell your house in 7 days or less",
          },
        },
      ],
    },
  };

  return baseData;
};

export const metadata: Metadata = {
  title: "Easy Closers - We Buy Houses For Cash | No Repairs, No Commissions",
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
    locale: "en",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
