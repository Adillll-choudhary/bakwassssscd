import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to combine class names conditionally and merge Tailwind classes.
 * Used throughout the project via `import { cn } from "@/lib/utils"`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
