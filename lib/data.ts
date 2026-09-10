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
      "I am a software engineer who recently graduated in July 2026, specializing in robust application development and infrastructure. My technical foundation lies in integrating complex databases and cloud services to create seamless user experiences.",
      "My engineering approach emphasizes reliable deployment and scalable architecture. I leverage tools like Docker for containerization and Google Cloud Platform for comprehensive service management, ensuring applications perform efficiently under load.",
      "Beyond core full-stack development, I actively work with modern AI tools, including the Gemini API, to build intelligent, forward-thinking solutions."
    ],
    location: "Candelaria, Calabarzon, Philippines",
    email: "[YOUR_EMAIL_HERE@example.com]",
    github: "https://github.com/jofether",
    linkedin: "https://linkedin.com/in/[YOUR_LINKEDIN_USERNAME]",
    twitter: "https://twitter.com/[YOUR_TWITTER_USERNAME]",
    instagram: "https://instagram.com/[YOUR_INSTAGRAM_USERNAME]",
    resumeUrl: "/resume.pdf", 
  },

  highlights: [
    { icon: "Clock", label: "Fresh Graduate" },
    { icon: "Code2", label: "Typescript Main Language" },
    { icon: "Laptop", label: "Software Engineer" },
  ],

  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion"
      ],
    },
    {
      category: "Backend & Cloud",
      items: [
        "Node.js",
        "Firebase",
        "Google Cloud Platform (GCP)",
        "Database Management",
        "REST APIs"
      ],
    },
    {
      category: "Tools, DevOps & AI",
      items: [
        "Git", 
        "GitHub Actions", 
        "Docker", 
        "Gemini API", 
        "Zotero"
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
      imageUrl: "https://via.placeholder.com/600x400/1e1e2e/ffffff?text=SmartQuiz",
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
      imageUrl: "https://via.placeholder.com/600x400/1e1e2e/ffffff?text=CryptoCrafters",
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
      imageUrl: "https://via.placeholder.com/600x400/1e1e2e/ffffff?text=VistaLingua",
      liveUrl: "https://[VISTALINGUA_LIVE_URL].com",
      githubUrl: "https://github.com/jofether/VistaLingua",
      featured: false,
    },
  ] as Project[],

  experience: [
    {
      role: "Software Engineering Intern",
      company: "Center for AI and Smart Technologies",
      period: "June 2025 — July 2025",
      description: "Developed and integrated smart technology solutions, optimizing application performance and collaborating on AI-driven feature implementations.",
      tech: ["AI Integration", "Cloud Services", "Software Development"],
    },
    {
      role: "Managing Head Trainee",
      company: "PCAPI R4A Chapter",
      period: "February 2026",
      description: "Completed intensive eight-hour training seminar focusing on operational compliance and management methodologies.",
      tech: ["Project Management", "Compliance"],
    },
  ] as Experience[],
};