"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Scale, FileText } from "lucide-react";

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: "privacy" | "terms";
}

const legalContent = {
    privacy: {
        title: "Privacy Policy",
        icon: Shield,
        content: [
            {
                heading: "Data Collection",
                text: "We collect information you provide directly to us via our contact forms, including name, email, and project details. This data is used solely to provide and improve our creative services."
            },
            {
                heading: "Usage Analytics",
                text: "Through our performance-optimized infrastructure, we may collect anonymized data regarding site interactions to ensure the ultra-smooth performance of our digital assets."
            },
            {
                heading: "Data Protection",
                text: "Coldune Studio employs industry-standard security protocols to protect your information. We do not sell, trade, or otherwise transfer your data to outside parties."
            },
            {
                heading: "Cookies",
                text: "We use essential cookies to maintain site functionality and performance metrics. You can manage your cookie preferences through your browser settings."
            }
        ]
    },
    terms: {
        title: "Terms of Service",
        icon: Scale,
        content: [
            {
                heading: "Service Engagement",
                text: "By acquiring our systems or services, you agree to a professional collaboration aimed at creative excellence. All project scopes are defined in individual service agreements."
            },
            {
                heading: "Intellectual Property",
                text: "Upon final payment, full intellectual property rights for delivered assets transfer to the client, unless otherwise specified in the service contract. Coldune Studio retains the right to showcase works in its portfolio."
            },
            {
                heading: "Execution & Delivery",
                text: "We are committed to delivering high-performance digital assets within agreed timelines. Delays due to client feedback or technical evolution will be communicated transparently."
            },
            {
                heading: "Payment Terms",
                text: "All payments are processed as capital deployments for digital infrastructure. Standard retainers are billed monthly in advance unless a bespoke milestone plan is established."
            }
        ]
    }
};

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
    const data = legalContent[type];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[85vh] bg-[#0A0B0E] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-[0_50px_100px_rgba(0,0,0,1)]"
                    >
                        {/* Header */}
                        <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-center bg-[#0D0E12]">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                                    <data.icon size={28} />
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-serif font-black text-accent italic tracking-tighter">
                                        {data.title}
                                    </h2>
                                    <p className="text-xs text-accent uppercase tracking-[0.3em] mt-1">Coldune Studio // Legal Archive</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-accent hover:text-accent hover:bg-white/5 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
                            <div className="space-y-16">
                                {data.content.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-px w-8 bg-accent/30" />
                                            <h3 className="text-xl md:text-2xl font-serif font-bold text-accent italic">{item.heading}</h3>
                                        </div>
                                        <p className="text-accent text-lg leading-relaxed font-light pl-12">
                                            {item.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                                <p className="text-xs text-accent uppercase tracking-[0.2em] italic">
                                    Last Updated: April 2026
                                </p>
                                <button
                                    onClick={onClose}
                                    className="px-10 py-4 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
                                >
                                    I Understand
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
