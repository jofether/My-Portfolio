import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { PORTFOLIO_DATA } from "@/lib/data";
import { ThemeProvider } from "@/components/ThemeProvider";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Update this metadata with your own name / description for SEO + social previews.
export const metadata: Metadata = {
  title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.title}`,
  description: PORTFOLIO_DATA.personal.tagline,
  openGraph: {
    title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.title}`,
    description: PORTFOLIO_DATA.personal.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="relative min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          {/* Ambient background glow — sits behind all content */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 bg-grid-glow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none fixed top-1/3 -left-40 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none fixed bottom-0 -right-40 -z-10 h-96 w-96 rounded-full bg-accent-cyan/10 blur-3xl"
          />
          
          {children}
          
          <Chatbot /> {/* <-- 2. Place it here so it renders on top of all pages */}
        </ThemeProvider>
      </body>
    </html>
  );
}