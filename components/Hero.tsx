"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Hero() {
  // Use resolvedTheme to handle the "system" default state correctly
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section 
      id="home" 
      // Removed hardcoded bg-white/dark:bg-slate-950 so it inherits your globals.css theme
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-8 overflow-hidden rounded-full border-4 border-slate-200 dark:border-slate-800 shadow-xl bg-slate-200 dark:bg-slate-800"
      >
        {mounted && (
          <Image
            // Ensure these match your actual files in the /public folder
            src={resolvedTheme === 'dark' ? '/dark.jpg' : '/light.jpg'}
            key={resolvedTheme}
            alt={`${PORTFOLIO_DATA.personal.name} profile picture`}
            fill
            className="object-cover"
            priority
          />
        )}
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6"
      >
        Hi, I'm {PORTFOLIO_DATA.personal.name}
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-10"
      >
        {PORTFOLIO_DATA.personal.tagline}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Link 
          href="#projects" 
          className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent-light transition-colors"
        >
          View My Work
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          href="#contact" 
          className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-slate-300 dark:border-slate-700 text-foreground font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <Mail className="w-5 h-5" />
          Contact Me
        </Link>
      </motion.div>
    </section>
  );
}