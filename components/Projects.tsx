"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { ChevronDown, Check } from "lucide-react";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the technology dropdown on outside click or Escape.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

  // Everything except "All" / "Featured" — these live in the dropdown so
  // the pinned row never grows unbounded as more projects/tech are added.
  const techFilters = useMemo(
    () => filters.filter((f) => !BASE_FILTERS.includes(f)),
    [filters]
  );
  const isTechFilterActive = !BASE_FILTERS.includes(activeFilter);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "Featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.technologies.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="py-10 md:py-16">
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

        {/* Filter controls — "All" and "Featured" stay pinned and always
            visible; every specific technology lives in the dropdown. This
            guarantees every filter is reachable at a glance, with nothing
            hidden behind a scroll or wrapped into a messy multi-row block. */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {BASE_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                activeFilter === filter
                  ? "border-accent bg-accent text-white"
                  : "border-slate-200 bg-slate-100/50 text-foreground/70 hover:border-slate-300 hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
              }`}
            >
              {filter}
            </button>
          ))}

          {/* Technology dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                isTechFilterActive
                  ? "border-accent bg-accent text-white"
                  : "border-slate-200 bg-slate-100/50 text-foreground/70 hover:border-slate-300 hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
              }`}
            >
              {isTechFilterActive ? activeFilter : "Technology"}
              <ChevronDown
                size={14}
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  role="listbox"
                  className="absolute left-0 top-full z-20 mt-2 max-h-72 w-56 overflow-y-auto rounded-xl border border-black/10 bg-background p-1.5 shadow-xl dark:border-white/10"
                >
                  {techFilters.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      role="option"
                      aria-selected={activeFilter === tech}
                      onClick={() => {
                        setActiveFilter(tech);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        activeFilter === tech
                          ? "bg-accent text-white"
                          : "text-foreground/70 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"
                      }`}
                    >
                      {tech}
                      {activeFilter === tech && <Check size={14} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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