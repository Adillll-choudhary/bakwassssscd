import Hero from "@/components/sections/Hero";
import dynamic from 'next/dynamic';
import { workProjects } from "@/data/work";

const Clients = dynamic(() => import("@/components/sections/Clients"));
const Services = dynamic(() => import("@/components/sections/Services"));
const FeaturedWebsites = dynamic(() => import("@/components/sections/FeaturedWebsites"));
const Manifesto = dynamic(() => import("@/components/sections/Manifesto"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const SectionTransitionPortal = dynamic(() => import("@/components/ui/SectionTransitionPortal"));
const SectionStoryHUD = dynamic(() => import("@/components/ui/SectionStoryHUD"));

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Coldune Studio",
    "url": "https://coldunestudio.com",
    "logo": "https://coldunestudio.com/logo.webp",
    "foundingDate": "2026-04",
    "founders": [
      {
        "@type": "Person",
        "name": "Jamal Adil"
      },
      {
        "@type": "Person",
        "name": "Arslan"
      }
    ],
    "description": "Premium creative agency specialized in cinematic branding, immersive web design, and digital impact.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Greater Noida",
      "addressCountry": "IN"
    }
  };

  const websiteProjects = workProjects.filter(p => p.group === "websites");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01. HERO */}
      <Hero />

      {/* TRANSITION: HERO -> CLIENTS */}
      <SectionTransitionPortal 
        nextSectionId="clients"
        chapterNumber="CHAPTER 02"
        title="Client Collaborations"
        subtitle="Trusted Referrals & High-Impact Case Studies"
      />

      {/* 02. CLIENTS */}
      <Clients />

      {/* TRANSITION: CLIENTS -> SERVICES (Exact user request: "next you will see what we offers you means services") */}
      <SectionTransitionPortal 
        nextSectionId="services"
        chapterNumber="CHAPTER 03"
        title="What We Offer You — The Services"
        subtitle="Website Architecture, Cinematic Branding & Autonomous AI Systems"
      />

      {/* 03. SERVICES */}
      <Services />

      {/* TRANSITION: SERVICES -> FEATURED WEBSITES */}
      <SectionTransitionPortal 
        nextSectionId="websites"
        chapterNumber="CHAPTER 04"
        title="Selected Digital Works"
        subtitle="14 Interactive 3D Websites & Immersive Digital Experiences"
      />

      {/* 04. FEATURED WEBSITES */}
      <FeaturedWebsites projects={websiteProjects} />

      {/* TRANSITION: WEBSITES -> MANIFESTO */}
      <SectionTransitionPortal 
        nextSectionId="manifesto"
        chapterNumber="CHAPTER 05"
        title="The Coldune Manifesto"
        subtitle="Our Philosophy Of Raw Creative Excellence & Market Dominance"
      />

      {/* 05. MANIFESTO */}
      <Manifesto />

      {/* TRANSITION: MANIFESTO -> CONTACT */}
      <SectionTransitionPortal 
        nextSectionId="contact"
        chapterNumber="CHAPTER 06"
        title="Initiate Your Project"
        subtitle="Connect With Founders Jamal & Arslan To Build Your Digital Legacy"
      />

      {/* 06. CONTACT */}
      <Contact />

      {/* GLOBAL INTERACTIVE STORY HUD (Particle vortex, real-time scroll loading, and narrative prompts) */}
      <SectionStoryHUD />
    </>
  );
}
