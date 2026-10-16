"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import ContactForm from "../ui/ContactForm";
import { useContactModal } from "@/context/ContactModalContext";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "About", href: "/about" },
];

const workCategories = [
    { name: "Shoots", slug: "shoots", icon: "📸" },
    { name: "Branding", slug: "branding", icon: "✨" },
    { name: "Edits", slug: "edits", icon: "✂️" },
    { name: "AI Content", slug: "ai-content", icon: "🤖" },
    { name: "Websites", slug: "websites", icon: "🌐" },
    { name: "Instagram Posts", slug: "instagram-posts", icon: "📱" },
    { name: "Strategic Growth", slug: "strategic-growth", icon: "🚀" },
    { name: "Logos", slug: "logos", icon: "💎" },
    { name: "Ads", slug: "ads", icon: "📢" },
];





const RollText = ({ text }: { text: string }) => {
    return (
        <span className="relative inline-flex overflow-hidden">
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                    style={{ transitionDelay: `${i * 30}ms` }}
                >
                    <span className="inline-block">{char === " " ? "\u00A0" : char}</span>
                    <span className="absolute left-0 top-full inline-block text-[#3CFF8F]">
                        {char === " " ? "\u00A0" : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isOpen, openModal, closeModal } = useContactModal();
    const [hasPreloaded, setHasPreloaded] = useState(false);
    const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handlePreloaderComplete = () => {
            setHasPreloaded(true);
        };

        if (typeof window !== 'undefined' && (window as any).preloaderDone) {
            setHasPreloaded(true);
        }

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("preloader-complete", handlePreloaderComplete);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("preloader-complete", handlePreloaderComplete);
        };
    }, []);

    // Close work dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (workDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setWorkDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [workDropdownOpen]);

    if (!mounted) return null;

    // User requested the navbar to stay permanently open/expanded, rather than collapsing on scroll
    return (
        <>
            {/* Minimalist Full-Width Navbar */}
            <motion.header 
                initial={{ y: -50, opacity: 0 }}
                animate={hasPreloaded ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 w-full z-[999] pl-2 pr-2 py-2 md:pl-4 md:pr-4 md:py-3 flex justify-between items-center pointer-events-none font-sans"
            >
                {/* --- LEFT: LOGO --- */}
                <div className="flex justify-start pointer-events-auto cursor-pointer">
                    <Link href="/" className="block hover:scale-105 transition-transform duration-300">
                        <Image 
                            src="/coldune-studio-logo-3.webp" 
                            alt="Coldune Studio" 
                            width={280} 
                            height={90} 
                            className="object-contain h-[55px] md:h-[85px] w-auto"
                            priority
                        />
                    </Link>
                </div>

                {/* --- RIGHT: NAVIGATION & CTA --- */}
                <div className="flex items-center gap-4 lg:gap-6 pointer-events-auto">
                    {/* Desktop Links */}
                    <div className="hidden md:flex flex-row gap-4 lg:gap-6 items-center">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                className="relative group cursor-pointer py-1 mt-1 text-[#D4D4D4] text-[11px] md:text-[13px] font-universo font-black tracking-widest uppercase"
                            >
                                <RollText text={link.name} />
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <button 
                        onClick={openModal}
                        className="relative group cursor-pointer py-1 mt-1 text-[#D4D4D4] text-[11px] md:text-[13px] font-universo font-black tracking-widest uppercase"
                    >
                        <RollText text="Start Project" />
                    </button>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center mt-1">
                        <button 
                            className="text-[#D4D4D4] hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[998] bg-[#050505] pt-32 pb-10 px-6 flex flex-col items-center text-center overflow-y-auto"
                    >
                        <div className="flex flex-col gap-2 w-full max-w-[400px]">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative group px-6 py-3 w-full flex justify-center items-center overflow-hidden rounded-full"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        className="text-4xl md:text-5xl font-universo font-black text-[#A8BEA4] group-hover:text-[#3CFF8F] uppercase tracking-widest transition-colors duration-300"
                                    >
                                        {link.name}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>
                        
                        <motion.button 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            onClick={() => {
                                openModal();
                                setMobileMenuOpen(false);
                            }}
                            className="mt-12 w-full max-w-[400px] py-5 rounded-full bg-[#064E3B] text-white text-xl font-bold hover:bg-[#065F46] transition-colors duration-300"
                        >
                            Start Project
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contact Form Modal */}
            <ContactForm isOpen={isOpen} onClose={closeModal} />
        </>
    );
}



