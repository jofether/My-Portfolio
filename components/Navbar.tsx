"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileText, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { PORTFOLIO_DATA } from "@/lib/data";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setIsOpen(false);
  
  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        // Reduced offset from 100 to 75 for a tighter fit
        const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 75;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-3xl items-center justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
      >
        <a
          href="#top"
          className="min-w-0 max-w-[55%] flex-shrink truncate text-sm font-semibold tracking-tight text-foreground md:max-w-none"
        >
          {PORTFOLIO_DATA.personal.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick(link.href)}
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Theme Toggle & Resume */}
        <div className="hidden md:flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground transition-colors"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-accent-light"
          >
            <FileText size={15} />
            Resume
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex flex-shrink-0 items-center gap-2 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="rounded-lg p-1.5 text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-20 w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#0B0F17]/95 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick(link.href)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-slate-200 pt-3 dark:border-white/10">
                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-md hover:bg-accent-light"
                >
                  <FileText size={15} />
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}