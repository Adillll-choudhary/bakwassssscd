"use client";
import { useState, useRef, useCallback, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function useScramble(text: string) {
    const [scrambledText, setScrambledText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Ensure state syncs if the text prop changes (fixes hot-reload and dynamic updates)
    useEffect(() => {
        setScrambledText(text);
    }, [text]);

    const scramble = useCallback(() => {
        let iteration = 0;
        const maxIterations = 12;
        const totalDuration = 250; // Total duration of the glitch in ms
        const intervalTime = totalDuration / maxIterations;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setScrambledText(
                text
                    .split("")
                    .map((char, index) => {
                        // Preserve spaces and newlines
                        if (char === " " || char === "\n") return char;
                        // Reveal correct characters incrementally from left to right
                        if (index < (iteration / maxIterations) * text.length) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            iteration++;

            if (iteration > maxIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setScrambledText(text); // Snap back to original perfect text
            }
        }, intervalTime);
    }, [text]);

    const reset = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setScrambledText(text);
    }, [text]);

    return { scrambledText, scramble, reset };
}
