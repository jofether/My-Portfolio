"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function About() {
  const { bio, location } = PORTFOLIO_DATA.personal;

  return (
    <section id="about" className="py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent-light">
            About
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            The short version, and the long one.
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Bio narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 text-foreground/75"
          >
            <div className="mb-4 flex items-center gap-2 text-sm text-foreground/50">
              <MapPin size={15} />
              {location}
            </div>
            {bio.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Skill stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {PORTFOLIO_DATA.skills.map((group) => (
              <div key={group.category} className="glass-card p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground/60">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80 transition-transform hover:scale-105 hover:border-accent/40 hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
