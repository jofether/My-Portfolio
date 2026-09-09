"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Clock,
  Code2,
  Laptop,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";

// Maps the `icon` string in lib/data.ts highlights to an actual component.
const ICONS: Record<string, React.ElementType> = {
  Clock,
  Code2,
  Laptop,
};

// Simple typewriter effect for the role/title line under the headline.
function useTypewriter(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { name, title, tagline, github, linkedin, instagram, resumeUrl } =
    PORTFOLIO_DATA.personal;
  const typedTitle = useTypewriter(title, 55);

  const socialLinks = [
    { href: instagram, icon: Instagram, label: "Instagram" },
    { href: github, icon: Github, label: "GitHub" },
    { href: linkedin, icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <section id="home" className="overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-8">
        {/* ---------------- Left column: text ---------------- */}
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-6xl"
          >
            Hi, I&apos;m {name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-2xl font-bold text-foreground/80 sm:text-3xl"
          >
            {typedTitle}
            <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent align-middle" style={{ height: "1.1em" }} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-foreground/60 sm:text-lg lg:mx-0"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link
              href="#projects"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-slate-800 dark:bg-accent dark:hover:bg-accent-light sm:w-auto"
            >
              Explore Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-transparent px-7 py-3.5 font-semibold text-foreground transition-colors hover:bg-black/5 dark:border-slate-700 dark:hover:bg-white/5 sm:w-auto"
            >
              Download CV
              <Download className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Connect row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-3 lg:items-start"
          >
            <p className="text-xs font-semibold tracking-widest text-foreground/40">
              CONNECT
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a /* <-- FIX: Added the missing 'a' tag here */
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-foreground/70 transition-colors hover:border-accent/40 hover:text-accent dark:border-slate-700"
                >
                  <Icon className="h-5 w-5" /> {/* FIX: Changed to standard Tailwind sizing */}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------------- Right column: photo + floating cards ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md"
        >
          <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-200 shadow-xl dark:bg-slate-800">
            {mounted && (
              <Image
                src={resolvedTheme === "dark" ? "/dark.jpg" : "/light.jpg"}
                key={resolvedTheme}
                alt={`${name} profile picture`}
                fill
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Floating highlight cards */}
          <div className="absolute -left-4 bottom-6 flex w-[85%] flex-col gap-3 sm:-left-8 sm:w-[75%]">
            {PORTFOLIO_DATA.highlights.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Clock;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}