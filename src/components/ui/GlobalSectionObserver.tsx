"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Only run on desktop to prevent mobile scrolling chaos
export default function GlobalSectionObserver() {
    const isLocked = useRef(false);

    useEffect(() => {
        if (typeof window === "undefined" || window.innerWidth < 768) return;

        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ limitCallbacks: true });
        
        // Add a slight delay to ensure all Next.js dynamic sections are mounted
        const initObserver = setTimeout(() => {
            // Find all major sections
            const sections = document.querySelectorAll("section");
            


            sections.forEach((section, index) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 80%", // Trigger when the next section is about to enter (in the gap)
                    fastScrollEnd: true,
                    onEnter: () => {
                        if (isLocked.current || index === 0) return; // Skip Hero on load
                        

                        
                        // Trigger the Pixel Matrix Overlay and pass the section to snap to
                        window.dispatchEvent(new CustomEvent('trigger-pixel-transition', {
                            detail: { target: section }
                        }));
                    },
                    onEnterBack: () => {
                        if (isLocked.current || index === 0) return;
                        
                        window.dispatchEvent(new CustomEvent('trigger-pixel-transition', {
                            detail: { target: section }
                        }));
                    }
                });
            });
            
            // Refresh ScrollTrigger to calculate heights
            ScrollTrigger.refresh();
        }, 1000);

        return () => {
            clearTimeout(initObserver);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return null;
}
