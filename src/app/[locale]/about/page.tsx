import ContactForm from "@/components/ContactForm";
import HeroAbout2 from "./heroAbout2";
import HeroAbout from "./heroAbout";
import StatsSection from "./statsSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Metadata } from "next";
import CallToActionBanner from "@/components/CallToActionBanner";
import Testimonials from "@/components/testimonials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";

  const title = isEnglish
    ? "About Easy Closers - 25+ Years Buying Houses For Cash | Real Estate Experts"
    : "Acerca de Easy Closers - 25+ Años Comprando Casas en Efectivo | Expertos Inmobiliarios";

  const description = isEnglish
    ? "Learn about Easy Closers' 25+ years of experience buying houses for cash. Meet our team of real estate experts who have helped thousands of homeowners sell fast."
    : "Conoce los 25+ años de experiencia de Easy Closers comprando casas en efectivo. Conoce nuestro equipo de expertos inmobiliarios que han ayudado a miles de propietarios a vender rápido.";

  const keywords = isEnglish
    ? "about easy closers, real estate team, cash home buyers, house buying company, real estate experts, home buying experience"
    : "acerca de easy closers, equipo inmobiliario, compradores de casas en efectivo, empresa compradora de casas, expertos inmobiliarios, experiencia comprando casas";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://easyclosers.com/${locale}/about`,
      images: [
        {
          url: "/img5.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/img5.webp"],
    },
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: "/en/about",
        es: "/es/about",
      },
    },
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col gap-5 md:gap-30 md:py-10 ">
        <HeroAbout />
        <HeroAbout2 />
        <StatsSection />
        <Testimonials />
        <CallToActionBanner />
      </main>
    </div>
  );
}
