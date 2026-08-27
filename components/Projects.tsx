"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { PORTFOLIO_DATA, type Project } from "@/lib/data";
import ProjectCard from "./ProjectCard";

const BASE_FILTERS = ["All", "Featured"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(
    PORTFOLIO_DATA.projects
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Attempt to load projects dynamically from Firestore's "projects"
  // collection. Falls back to the static PORTFOLIO_DATA.projects array
  // (from lib/data.ts) if Firebase isn't configured or the fetch fails.
  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      const db = getDb();
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        if (!snapshot.empty && isMounted) {
          const fetched = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Project)
          );
          setProjects(fetched);
        }
      } catch (error) {
        // Network / permissions issue — silently keep the static fallback.
        console.error("Falling back to static project data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Build the filter tab list dynamically from every technology used.
  const filters = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => techSet.add(t)));
    return [...BASE_FILTERS, ...Array.from(techSet)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "Featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.technologies.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent-light">
            Projects
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Things I&apos;ve built.
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                activeFilter === filter
                  ? "border-accent bg-accent text-white"
                  : "border-white/10 bg-white/5 text-foreground/70 hover:border-white/20 hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="glass-card h-80 animate-pulse bg-white/5"
              />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <p className="text-foreground/60">
            No projects match this filter yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
