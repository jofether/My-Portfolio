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
    name: "Jofether Sampollo Mendoza",
    title: "Software Engineer",
    tagline: "Building scalable backend architecture, cloud infrastructure, and AI-integrated applications.",
    bio: [
      "I am a Software Engineer who recently graduated in July 2026, specializing in full-stack development, cloud infrastructure, and AI integration. My technical foundation is built on delivering secure, high-performance web applications tailored to solve complex organizational challenges.",
      "Drawing from a unique background in operational management and financial administration, I approach software engineering with a systems-level mindset. Whether I am architecting role-based access controls in PHP, managing databases in Firebase, or deploying containerized applications via Docker and Google Cloud Platform (GCP), I prioritize scalable and efficient solutions.",
      "Leveraging modern frameworks like Next.js and TypeScript alongside tools like the Gemini API, I build intelligent, forward-thinking solutions that bridge administrative efficiency with seamless digital user experiences."
    ],
    location: "Candelaria, Quezon, Philippines",
    email: "jofethersampollo@gmail.com",
    github: "https://github.com/jofether",
    linkedin: "https://www.linkedin.com/in/jofether-mendoza-ba8369436",
    twitter: "https://x.com/yomanyoman12345",
    instagram: "https://www.instagram.com/arkaybnidyetong/",
    resumeUrl: "/resume.pdf", 
  },

  highlights: [
    { icon: "Clock", label: "Fresh Graduate" },
    { icon: "Code2", label: "TypeScript Main Language" },
    { icon: "Laptop", label: "Software Engineer" },
  ],

  skills: [
    {
      category: "Frontend",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion"
      ],
    },
    {
      category: "Backend & Cloud",
      items: [
        "Node.js",
        "PHP",
        "Firebase",
        "Google Cloud Platform (GCP)",
        "SQL",
        "REST APIs"
      ],
    },
    {
      category: "Tools, DevOps & AI",
      items: [
        "Git & GitHub", 
        "Docker", 
        "Gemini API", 
        "GitHub Actions"
      ],
    },
  ],

  projects: [
    {
      id: "project-1",
      title: "SmartQuiz",
      description: "A comprehensive application featuring deep integration with Firebase services.",
      longDescription: "Managed end-to-end development via GitHub, integrating Firebase for real-time data handling, database services, and hosting.",
      technologies: ["Firebase", "GitHub Actions", "Next.js"],
      imageUrl: "https://placehold.co/600x400/1e1e2e/ffffff?text=SmartQuiz",
      liveUrl: "https://[SMARTQUIZ_LIVE_URL].com",
      githubUrl: "https://github.com/jofether/SmartQuiz",
      featured: true,
    },
    {
      id: "project-2",
      title: "CryptoCrafters",
      description: "Collaborative software development project focused on secure data architecture.",
      longDescription: "Engineered robust backend database integrations to handle complex data structures and team collaboration workflows.",
      technologies: ["Backend Architecture", "Database Management", "Node.js"],
      imageUrl: "https://placehold.co/600x400/1e1e2e/ffffff?text=CryptoCrafters",
      liveUrl: "https://[CRYPTOCRAFTERS_LIVE_URL].com",
      githubUrl: "https://github.com/jofether/CryptoCrafters",
      featured: true,
    },
    {
      id: "project-3",
      title: "VistaLingua",
      description: "Software solution leveraging advanced cloud integration.",
      longDescription: "Developed reliable performance architectures utilizing extensive database management and seamless cloud service integrations.",
      technologies: ["GCP", "Cloud Integration", "TypeScript"],
      imageUrl: "https://placehold.co/600x400/1e1e2e/ffffff?text=VistaLingua",
      liveUrl: "https://[VISTALINGUA_LIVE_URL].com",
      githubUrl: "https://github.com/jofether/VistaLingua",
      featured: false,
    },
  ] as Project[],

  experience: [
    {
      role: "Finance & Operations Assistant",
      company: "Godsglory and Legacy Corporation, Candelaria, Quezon",
      period: "August 2022 — Present",
      description: "Directed daily operations and financial administration by overseeing sales transactions, digital order processing, and inventory management, while maintaining data accuracy through meticulous record-keeping and the generation of end-of-month Statements of Account (SOA).",
      tech: ["Financial Administration", "Inventory Management", "Data Accuracy", "Operations"],
    },
    {
      role: "Web Developer",
      company: "Batangas State University (IPDO)",
      period: "June 2025 — July 2025",
      description: "Engineered a dynamic web application utilizing PHP and integrated role-based access control (RBAC) to securely manage institutional workflows.",
      tech: ["PHP", "RBAC", "Database Integration", "Web Development"],
    },
    {
      role: "Managing Head for Jemuel Recreational Hub",
      company: "Godsglory and Legacy Corporation, Candelaria, Quezon",
      period: "February 2019 — June 2022",
      description: "Streamlined administrative systems, data reporting, and operational protocols, demonstrating strong problem-solving and project management capabilities.",
      tech: ["Project Management", "Process Optimization", "Data Reporting", "Administration"],
    },
  ] as Experience[],
};