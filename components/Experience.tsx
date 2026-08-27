"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent-light">
            Experience
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Where I&apos;ve worked.</h2>
        </motion.div>

        <div className="relative border-l border-white/10 pl-8 sm:pl-10">
          {/* Glowing accent line overlay */}
          <div
            aria-hidden="true"
            className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-accent via-accent-cyan/60 to-transparent"
          />

          <div className="space-y-14">
            {PORTFOLIO_DATA.experience.map((item, i) => (
              <motion.div
                key={`${item.company}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Node */}
                <span className="absolute -left-[2.65rem] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-[#0B0F17] text-accent-light sm:-left-[3.15rem]">
                  <Briefcase size={14} />
                </span>

                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground/50">
                  {item.period}
                </p>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.role}
                  <span className="text-foreground/50"> · {item.company}</span>
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
