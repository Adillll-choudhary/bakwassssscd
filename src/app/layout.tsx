import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Outfit, Syne, Caveat, Dancing_Script, DM_Sans, Poppins } from "next/font/google";
import localFont from "next/font/local";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/ui/Preloader";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { ContactModalProvider } from "@/context/ContactModalContext";
import "./globals.css";
import BackToTop from "@/components/layout/BackToTop";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import GlobalAudio from "@/components/layout/GlobalAudio";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FONT LOADING â€” Optimized: 3 fonts only (was 5)
   Removed: Audiowide, Poppins (not needed for body/headings)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const siestha = localFont({
  src: "./fonts/Siestha-Regular.otf",
  variable: "--font-siestha",
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  style: ["normal", "italic"],
  preload: true,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coldunestudio.com"),
  title: {
    default: "Coldune Studio | Elite Web Design & Cinematic Branding Agency",
    template: "%s | Coldune Studio"
  },
  description: "Coldune Studio is a premium digital agency specializing in cinematic branding, high-performance web development, and immersive UI/UX design. We engineer visual impact and digital legacies.",
  keywords: [
    "Coldune", "Coldune Studio", "Creative Agency", "Cinematic Branding",
    "Immersive Web Design", "Visual Production", "UI/UX Design", "Web Development",
    "Digital Impact", "Branding Agency India", "Greater Noida Agency",
    "Jamal Adil", "Arslan"
  ],
  authors: [{ name: "Jamal Adil" }, { name: "Arslan" }],
  creator: "Coldune Studio",
  publisher: "Coldune Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://coldunestudio.com',
  },
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
  openGraph: {
    title: "Coldune Studio | Elite Web Design & Cinematic Branding Agency",
    description: "Coldune Studio is a premium digital agency specializing in cinematic branding, high-performance web development, and immersive UI/UX design. We don't just create content, we engineer impact.",
    url: "https://coldunestudio.com",
    siteName: "Coldune Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://coldunestudio.com/logo.webp",
        width: 1200,
        height: 630,
        alt: "Coldune Studio - Creative Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coldune Studio | Creative Engineering & Visual Impact",
    description: "Enter the nexus of high-performance design and strategy. We engineer visual impact.",
    images: ["https://coldunestudio.com/logo.webp"],
    creator: "@coldunestudio",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background scroll-smooth ">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${cormorant.variable} ${outfit.variable} ${syne.variable} ${caveat.variable} ${dancingScript.variable} ${siestha.variable} ${dmSans.variable} ${poppins.variable} antialiased bg-background text-text-primary  max-w-[100vw] selection:bg-accent/30 selection:text-accent`}
      >
        <ContactModalProvider>
          <Cursor />
          <Preloader />
          <ErrorBoundary componentName="Main App">
            <Navbar />
            <main className="min-h-screen relative w-full">
              {children}
            </main>
            <BackToTop />
            <GlobalAudio />
          </ErrorBoundary>
        </ContactModalProvider>
      </body>
    </html>
  );
}

