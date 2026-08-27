// ============================================================================
// PORTFOLIO DATA
// ----------------------------------------------------------------------------
// Edit the values below to personalize your site. Every field marked with
// [BRACKETS] is a placeholder — replace it with your real information.
// This file is also used as a fallback/local source if Firestore is empty
// or unreachable, so keep the `projects` array reasonably up to date.
// ============================================================================

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
};

export const PORTFOLIO_DATA = {
  personal: {
    name: "[YOUR_NAME_HERE]",
    title: "[YOUR_TITLE_HERE — e.g., Full Stack Engineer & UI Designer]",
    tagline:
      "[YOUR_TAGLINE_HERE — e.g., I build accessible, high-performance web applications.]",
    bio: [
      "[YOUR_BIO_PARAGRAPH_1 — Introduce yourself: who you are, what you specialize in, and how you got started building for the web.]",
      "[YOUR_BIO_PARAGRAPH_2 — Talk about your engineering philosophy: how you approach problems, what quality bar you hold yourself to, and what kind of teams/projects excite you.]",
      "[YOUR_BIO_PARAGRAPH_3 — Optional: mention interests outside of code, what you're currently learning, or your long-term goals.]",
    ],
    location: "[YOUR_LOCATION_HERE — e.g., San Francisco, CA or Remote]",
    email: "[YOUR_EMAIL_HERE@example.com]",
    github: "https://github.com/[YOUR_GITHUB_USERNAME]",
    linkedin: "https://linkedin.com/in/[YOUR_LINKEDIN_USERNAME]",
    twitter: "https://twitter.com/[YOUR_TWITTER_USERNAME]",
    resumeUrl: "/resume.pdf", // Place your résumé PDF in /public and update this path
  },

  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "[ADD_SKILL]",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "Firebase",
        "PostgreSQL",
        "REST APIs",
        "[ADD_SKILL]",
      ],
    },
    {
      category: "Tools & DevOps",
      items: ["Git", "Docker", "Vercel", "Figma", "Jest", "[ADD_SKILL]"],
    },
  ],

  // NOTE: these are used as the fallback/seed data. Live data is fetched from
  // the Firestore "projects" collection in components/Projects.tsx, and this
  // array is used automatically if that fetch fails or returns nothing.
  projects: [
    {
      id: "project-1",
      title: "[PROJECT_1_NAME]",
      description:
        "[PROJECT_1_SHORT_DESCRIPTION — e.g., A real-time SaaS dashboard for tracking server analytics.]",
      longDescription:
        "[PROJECT_1_FULL_DETAILS — What problem did it solve? What architecture did you use? What were the results?]",
      technologies: ["Next.js", "Tailwind CSS", "Firebase", "TypeScript"],
      imageUrl:
        "https://via.placeholder.com/600x400/1e1e2e/ffffff?text=Project+1+Preview",
      liveUrl: "https://[PROJECT_1_LIVE_URL].com",
      githubUrl: "https://github.com/[YOUR_GITHUB_USERNAME]/[PROJECT_1_REPO]",
      featured: true,
    },
    {
      id: "project-2",
      title: "[PROJECT_2_NAME]",
      description:
        "[PROJECT_2_SHORT_DESCRIPTION — e.g., E-commerce store with integrated Stripe payments.]",
      longDescription: "[PROJECT_2_FULL_DETAILS]",
      technologies: ["React", "Node.js", "Tailwind CSS"],
      imageUrl:
        "https://via.placeholder.com/600x400/1e1e2e/ffffff?text=Project+2+Preview",
      liveUrl: "https://[PROJECT_2_LIVE_URL].com",
      githubUrl: "https://github.com/[YOUR_GITHUB_USERNAME]/[PROJECT_2_REPO]",
      featured: true,
    },
    {
      id: "project-3",
      title: "[PROJECT_3_NAME]",
      description:
        "[PROJECT_3_SHORT_DESCRIPTION — e.g., AI-powered content generator CLI tool.]",
      longDescription: "[PROJECT_3_FULL_DETAILS]",
      technologies: ["Python", "TypeScript", "OpenAI API"],
      imageUrl:
        "https://via.placeholder.com/600x400/1e1e2e/ffffff?text=Project+3+Preview",
      liveUrl: "https://[PROJECT_3_LIVE_URL].com",
      githubUrl: "https://github.com/[YOUR_GITHUB_USERNAME]/[PROJECT_3_REPO]",
      featured: false,
    },
  ] as Project[],

  experience: [
    {
      role: "[YOUR_ROLE_TITLE — e.g., Frontend Developer]",
      company: "[COMPANY_NAME]",
      period: "[2023 — Present]",
      description:
        "[KEY_RESPONSIBILITIES_AND_ACHIEVEMENTS — Highlight metrics, tech used, and impact.]",
      tech: ["React", "Tailwind CSS", "Next.js"],
    },
    {
      role: "[PREVIOUS_ROLE_TITLE — e.g., Web Developer Intern]",
      company: "[PREVIOUS_COMPANY_NAME]",
      period: "[2022 — 2023]",
      description: "[KEY_RESPONSIBILITIES_AND_ACHIEVEMENTS]",
      tech: ["JavaScript", "HTML/CSS", "Git"],
    },
  ] as Experience[],
};
