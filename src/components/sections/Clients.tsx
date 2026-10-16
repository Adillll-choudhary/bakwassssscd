"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Map available logos
const clientLogos = [
    { name: "New Client", src: "/clients/logo.webp" },
    { name: "Faiqa Clothing", src: "/clients/IMG_3527.webp" },
    { name: "Essence Perfume", src: "/clients/IMG_3521.webp" },
    { name: "Wonderhill University", src: "/clients/IMG_3522.webp" },
    { name: "Hotchix Kitchen", src: "/clients/IMG_3523.webp" },
    { name: "The Ideal Restaurant", src: "/clients/IMG_3524.webp" },
    { name: "Visionary", src: "/clients/visionary.webp" },
    { name: "Crest Logistics", src: "/clients/crest.webp" },
    { name: "Hub System", src: "/clients/hub.webp" },
    { name: "Tune", src: "/clients/tune.webp" },
    { name: "Partner", src: "/clients/partner.webp" },
    { name: "SnackStop", src: "", font: "font-[var(--font-syne)] font-black italic text-2xl md:text-4xl" },
    { name: "ThynkTech", src: "/clients/thynktech.webp" },
    { name: "WL Client", src: "/clients/wl-logo.webp", isWhiteLogo: true },
    { name: "AAC Space", src: "/clients/aac-space.png", isWhiteLogo: true },
    { name: "UMA", src: "/clients/uma-logo.png", isWhiteLogo: true },
];

export default function Clients() {
    return (
        <section id="clients" className="py-32 md:py-60 mb-32 md:mb-64 bg-transparent relative overflow-hidden">
            <div className="w-full pl-6 pr-6 md:pl-16 md:pr-12">
                <div className="text-left mb-24 md:mb-40 ml-0 md:ml-0 lg:ml-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative inline-block text-left max-w-7xl"
                    >
                        <h2 className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase leading-[0.8] tracking-tight text-white relative whitespace-nowrap">
                            MOST OF OUR<br />
                            CLIENT WORK<br />
                            COMES FROM<br />
                            TRUSTED
                            <span className="absolute -bottom-2 md:-bottom-4 lg:-bottom-8 -right-24 md:-right-64 lg:-right-[400px] font-siestha normal-case text-[#3CFF8F] text-[16vw] md:text-[8rem] lg:text-[11rem] -rotate-[8deg]" style={{ textShadow: "0 4px 30px rgba(60,255,143,0.4)" }}>
                                Referrals
                            </span>
                        </h2>
                    </motion.div>
                </div>

                <div className="mx-auto flex flex-wrap justify-center gap-12 md:gap-x-20 md:gap-y-16 items-center">
                    {clientLogos.map((logo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="w-[40%] md:w-[25%] lg:w-[18%] flex items-center justify-center group/logo"
                        >
                            {logo.src ? (
                                <div 
                                    className="relative w-full max-w-[320px] md:max-w-[450px] aspect-[2/1] transition-all duration-700 group-hover:scale-105" 
                                    style={
                                        logo.name === "Faiqa Clothing" ? {} 
                                        : (logo as any).isWhiteLogo ? { filter: 'brightness(0) invert(1)' } 
                                        : { filter: 'invert(1) grayscale(1) contrast(10) brightness(1.2)', mixBlendMode: 'screen', isolation: 'isolate' }
                                    }
                                >
                                    <Image
                                        src={logo.src}
                                        alt={logo.name}
                                        fill
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            ) : (
                                <span className={`text-2xl md:text-4xl tracking-[0.05em] text-accent group-hover/logo:text-accent group-hover/logo:scale-105 transition-all duration-700 whitespace-nowrap ${logo.font} select-none uppercase`}>
                                    {logo.name}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#08090B_100%)] opacity-60" />
        </section>
    );
}
