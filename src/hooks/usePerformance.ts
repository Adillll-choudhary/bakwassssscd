"use client";

import { useState, useEffect } from "react";

export function usePerformance() {
    const [isLowPower, setIsLowPower] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isiOS, setIsiOS] = useState(false);

    useEffect(() => {
        // 1. Basic Mobile Check
        const checkMobile = () => {
            const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || window.innerWidth < 768;
            setIsMobile(mobile);
            setIsiOS(/iPhone|iPad|iPod/i.test(userAgent));

            // 2. Hardware Tier Check
            // @ts-ignore - deviceMemory is experimental
            const memory = navigator.deviceMemory;
            const concurrency = navigator.hardwareConcurrency;

            // Low Power Criteria:
            // - Less than 4GB RAM (if reported)
            // - Less than 4 Logical Cores
            // - Mobile Device (default to tighter constraints)
            const isLowMemory = memory !== undefined && memory <= 4;
            const isLowCpu = concurrency !== undefined && concurrency <= 4;

            // iOS specific: iOS doesn't report deviceMemory, but older iPhones crash on high rendering.
            // We treat all mobile as "Optimization Targets", but stricter on Androids with low specs.

            if (mobile || isLowMemory || isLowCpu) {
                setIsLowPower(true);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return { isLowPower, isMobile, isiOS };
}
