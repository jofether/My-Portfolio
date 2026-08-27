"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="glass-card group relative flex flex-col overflow-hidden transition-colors hover:border-accent/30"
    >
      {project.featured && (
        <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-[11px] font-medium text-white">
          <Star size={11} fill="currentColor" />
          Featured
        </span>
      )}

      {/* Image preview with hover zoom */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-foreground/65">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-foreground/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-white/10 pt-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-accent-light"
          >
            <ExternalLink size={15} />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-accent-light"
          >
            <Github size={15} />
            Source
          </a>
        </div>
      </div>
    </motion.div>
  );
}
