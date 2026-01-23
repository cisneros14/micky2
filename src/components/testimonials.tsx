"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "@/components/TranslationsProvider";

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  testimonial: string;
  avatar: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="min-w-96 max-w-sm bg-white rounded-xl p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
            {testimonial.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.designation}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" asChild>
        <Link href="#" target="_blank">
          <FcGoogle className="text-lg" />
        </Link>
      </Button>
    </div>
    <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
  </div>
);

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: t("testimonials.items.0.name", "John Doe"),
      designation: t("testimonials.items.0.role", "Software Engineer"),
      company: t("testimonials.items.0.company", "TechCorp"),
      testimonial: t(
        "testimonials.items.0.text",
        "This product has completely transformed the way we work. The efficiency and ease of use are unmatched!",
      ),
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: t("testimonials.items.1.name", "Sophia Lee"),
      designation: t("testimonials.items.1.role", "Data Analyst"),
      company: t("testimonials.items.1.company", "InsightTech"),
      testimonial: t(
        "testimonials.items.1.text",
        "This tool has saved me hours of work! The analytics and reporting features are incredibly powerful.",
      ),
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 3,
      name: t("testimonials.items.2.name", "Michael Johnson"),
      designation: t("testimonials.items.2.role", "UX Designer"),
      company: t("testimonials.items.2.company", "DesignPro"),
      testimonial: t(
        "testimonials.items.2.text",
        "An amazing tool that simplifies complex tasks. Highly recommended for professionals in the industry.",
      ),
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: t("testimonials.items.3.name", "Emily Davis"),
      designation: t("testimonials.items.3.role", "Marketing Specialist"),
      company: t("testimonials.items.3.company", "BrandBoost"),
      testimonial: t(
        "testimonials.items.3.text",
        "I've seen a significant improvement in our team's productivity since we started using this service.",
      ),
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: t("testimonials.items.4.name", "Daniel Martinez"),
      designation: t("testimonials.items.4.role", "Full-Stack Developer"),
      company: t("testimonials.items.4.company", "CodeCrafters"),
      testimonial: t(
        "testimonials.items.4.text",
        "The best investment we've made! The support team is also super responsive and helpful.",
      ),
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: t("testimonials.items.5.name", "Jane Smith"),
      designation: t("testimonials.items.5.role", "Product Manager"),
      company: t("testimonials.items.5.company", "InnovateX"),
      testimonial: t(
        "testimonials.items.5.text",
        "The user experience is top-notch! The interface is clean, intuitive, and easy to navigate.",
      ),
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="h-full w-full">
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-center text-primary text-balance px-6">
          {t("testimonials.title", "What Our Clients Say")}
        </h2>
        <p className="mt-4 text-center text-lg text-pretty max-w-2xl mx-auto px-6">
          {t(
            "testimonials.description",
            "Real stories from homeowners who chose a fast, simple, and stress-free sale",
          )}
        </p>
        <div className="mt-14 relative">
          <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-linear-to-r from-background to-transparent" />
          <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-linear-to-l from-background to-transparent" />
          <Marquee pauseOnHover className="[--duration:60s]">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse className="mt-0 [--duration:60s]">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
