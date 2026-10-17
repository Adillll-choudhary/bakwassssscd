import Hero from "@/components/sections/Hero";
import dynamic from 'next/dynamic';

const Clients = dynamic(() => import("@/components/sections/Clients"));
const Manifesto = dynamic(() => import("@/components/sections/Manifesto"));
const ScrollFramesSection = dynamic(() => import("@/components/sections/ScrollFramesSection"));

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Clients />
      <Manifesto />
      <ScrollFramesSection />
    </>
  );
}
