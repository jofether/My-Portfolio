"use client"; // Required for framer-motion in Next.js App Router

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Hero() {
  return (
    <section 
      id="home" 
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950"
    >
      {/* Profile Picture with Pop-in Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-48 h-48 mx-auto mb-8 overflow-hidden rounded-full border-4 border-slate-200 dark:border-slate-800 shadow-xl"
      >
        <Image
          src="/profile.jpg"
          alt="Jofether Sampollo Mendoza profile picture"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Main Introduction with Slide-up Animation */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
      >
        Hi, I'm Jofether Sampollo Mendoza
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10"
      >
        A software engineer specializing in scalable full-stack development, cloud infrastructure, and AI integrations. Building robust applications to solve complex problems.
      </motion.p>

      {/* Call to Action Buttons with Icons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Link 
          href="#projects" 
          className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          View My Work
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          href="#contact" 
          className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <Mail className="w-5 h-5" />
          Contact Me
        </Link>
      </motion.div>
    </section>
  );
}