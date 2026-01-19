"use client";
import { Button } from "@/components/ui/button";
import { DribbbleIcon, TwitchIcon, Info, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "@/components/TranslationsProvider";

const teamMembers = [
  {
    name: "Michael Haboud",
    title: "Founder & CEO",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    fullBio:
      "Michael Haboud is a seasoned entrepreneur with over 15 years of experience in the real estate and technology sectors. As the former co-founder of Opendoor, he revolutionized the way people buy and sell homes. His early work at Spotify and Clearbit shaped his understanding of user experience and data-driven decision making. Michael's vision is to make real estate transactions as simple as ordering a coffee.",
    imageUrl: "/Michael-Haboud.jpg",
    experience: "15+ years",
    expertise: [
      "Real Estate",
      "Technology",
      "Entrepreneurship",
      "User Experience",
    ],
    education: "Stanford University - Computer Science",
  },
  {
    name: "Jane Doe",
    title: "Engineering Manager",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    fullBio:
      "Jane Doe brings exceptional leadership and technical expertise to our engineering team. With a proven track record of leading high-performing teams at Figma, Pitch, and Protocol Labs, she has mastered the art of balancing technical excellence with team growth. Jane specializes in scalable architecture and fostering inclusive engineering cultures.",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    experience: "12+ years",
    expertise: [
      "Team Leadership",
      "Scalable Architecture",
      "Product Development",
      "Agile Methodologies",
    ],
    education: "MIT - Software Engineering",
  },
  {
    name: "Bob Smith",
    title: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    fullBio:
      "Bob Smith is a strategic product leader with deep experience in edtech and developer tools. His work at Linear, Lambda School, and On Deck has given him unique insights into user needs and market opportunities. Bob excels at translating complex business requirements into intuitive product experiences that users love.",
    imageUrl:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    experience: "10+ years",
    expertise: [
      "Product Strategy",
      "User Research",
      "Market Analysis",
      "Cross-functional Leadership",
    ],
    education: "UC Berkeley - Business Administration",
  },
  {
    name: "Peter Johnson",
    title: "Frontend Developer",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
    fullBio:
      "Peter Johnson is a frontend specialist who has crafted exceptional user experiences at some of the most innovative companies. His work at Linear, Coinbase, and Postscript has honed his skills in creating responsive, accessible, and performant web applications. Peter is passionate about modern web technologies and user-centered design.",
    imageUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    experience: "8+ years",
    expertise: [
      "React",
      "TypeScript",
      "Performance Optimization",
      "Accessibility",
    ],
    education: "University of Washington - Computer Science",
  },
  {
    name: "David Lee",
    title: "Backend Developer",
    bio: "Lead backend dev at Clearbit. Former Clearbit and Loom.",
    fullBio:
      "David Lee is a backend architect with deep expertise in building robust, scalable systems. His leadership role at Clearbit and experience at Loom has given him mastery over complex data processing, API design, and system reliability. David is passionate about clean code, testing, and system architecture.",
    imageUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
    experience: "9+ years",
    expertise: [
      "System Architecture",
      "API Design",
      "Database Design",
      "DevOps",
    ],
    education: "Georgia Tech - Computer Engineering",
  },
  {
    name: "Sarah Williams",
    title: "Product Designer",
    bio: "Founding design team at Figma. Former Pleo, Stripe, and Tile.",
    fullBio:
      "Sarah Williams is a visionary designer who was part of the founding design team at Figma. Her work at Pleo, Stripe, and Tile has shaped her understanding of financial technology and user experience. Sarah believes in design that not only looks beautiful but solves real user problems and drives business outcomes.",
    imageUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    experience: "11+ years",
    expertise: [
      "UX/UI Design",
      "Design Systems",
      "User Research",
      "Prototyping",
    ],
    education: "Parsons School of Design - Graphic Design",
  },
  {
    name: "Michael Brown",
    title: "UX Researcher",
    bio: "Lead user research for Slack. Contractor for Netflix and Udacity.",
    fullBio:
      "Michael Brown is a user research expert who has led research initiatives at Slack, helping shape one of the most beloved workplace communication tools. His work with Netflix and Udacity has given him insights into entertainment and education platforms. Michael is passionate about understanding user behavior and translating insights into actionable design decisions.",
    imageUrl:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
    experience: "13+ years",
    expertise: [
      "User Research",
      "Data Analysis",
      "Usability Testing",
      "Behavioral Psychology",
    ],
    education: "Stanford University - Psychology",
  },
  {
    name: "Elizabeth Johnson",
    title: "Customer Success",
    bio: "Lead CX at Wealthsimple. Former PagerDuty and Sqreen.",
    fullBio:
      "Elizabeth Johnson is a customer experience leader who has transformed how companies interact with their users. Her work at Wealthsimple, PagerDuty, and Sqreen has given her deep insights into fintech, DevOps, and security platforms. Elizabeth believes that exceptional customer success is the foundation of sustainable business growth.",
    imageUrl:
      "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600",
    experience: "14+ years",
    expertise: [
      "Customer Experience",
      "Support Operations",
      "User Onboarding",
      "Customer Advocacy",
    ],
    education: "University of Michigan - Business Administration",
  },
];

export default function TeamSection() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col max-w-5xl justify-center py-8 sm:py-12 px-6 lg:px-8 mx-auto gap-16">
      <div className="text-center mx-auto">
        <b className="text-center text-muted-foreground text-base font-semibold">
          {t("team.hiring")}
        </b>
        <h2 className="title">{t("team.title")}</h2>
        <div className="decorador mx-auto" />
        <p className="mt-6 text-base sm:text-lg">{t("team.description")}</p>
        <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-center gap-3">
          <Button className="btn-primary" size="lg">
            {t("team.buttons.openPositions")}
          </Button>
          <Button size="lg" variant="outline">
            {t("team.buttons.aboutUs")}
          </Button>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 gap-y-6 md:gap-8 md:gap-y-10">
        {teamMembers.map((member) => (
          <div key={member.name} className="group flex flex-col">
            <div className="relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer relative overflow-hidden rounded-lg">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full aspect-square rounded-lg object-cover bg-secondary transition-transform duration-300 group-hover:scale-105"
                      width={600}
                      height={600}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Info className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-md sm:max-w-lg">
                  <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                        width={64}
                        height={64}
                      />
                      <div>
                        <DialogTitle className="text-xl">
                          {member.name}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                          {member.title}
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed">{member.fullBio}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-muted-foreground">
                          {t("team.dialog.experience")}
                        </span>
                        <p>{member.experience}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-muted-foreground">
                          {t("team.dialog.education")}
                        </span>
                        <p>{member.education}</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-muted-foreground text-sm">
                        {t("team.dialog.expertise")}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {member.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted rounded-md text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground text-sm">{member.title}</p>
            <p className="mt-3 text-sm leading-relaxed">{member.bio}</p>

            <div className="mt-auto pt-3 flex items-center gap-2.5">
              <Button
                className="bg-muted hover:bg-green-500 hover:text-white text-muted-foreground shadow-none transition-all duration-300"
                size="icon"
                asChild
              >
                <Link href="#" target="_blank">
                  <FaWhatsapp className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                className="bg-muted hover:bg-pink-500 hover:text-white text-muted-foreground shadow-none transition-all duration-300"
                size="icon"
                asChild
              >
                <Link href="#" target="_blank">
                  <Instagram className="w-4 h-4" />
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-muted cursor-pointer hover:bg-blue-400 hover:text-white text-muted-foreground shadow-none transition-all duration-300"
                    size="icon"
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md sm:max-w-lg">
                  <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                        width={64}
                        height={64}
                      />
                      <div>
                        <DialogTitle className="text-xl">
                          {member.name}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                          {member.title}
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed">{member.fullBio}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-muted-foreground">
                          {t("team.dialog.experience")}
                        </span>
                        <p>{member.experience}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-muted-foreground">
                          {t("team.dialog.education")}
                        </span>
                        <p>{member.education}</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-muted-foreground text-sm">
                        {t("team.dialog.expertise")}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {member.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted rounded-md text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
