"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className="flex h-screen flex-col items-center justify-center bg-black text-accent p-4 text-center space-y-4">
                <h2 className="text-3xl font-serif">Something went wrong!</h2>
                <p className="text-accent text-sm max-w-md">
                    We encountered a critical error. Please reload the page.
                </p>
                <button
                    onClick={() => reset?.()}
                    className="px-6 py-2 rounded-full bg-accent text-black text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                    Try again
                </button>
            </body>
        </html>
    );
}
