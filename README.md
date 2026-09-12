# Jofether Sampollo Mendoza — Portfolio Website

A modern, dark-mode developer portfolio built with Next.js 14 (App Router), TypeScript: 9, Tailwind CSS, and Framer Motion, featuring cloud infrastructure integration and interactive UI elements.

---

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend & Database:** Firebase Firestore (Contact form and data handling)
- **Deployment:** Vercel

---

## 🛠️ Featured Projects

1. **SmartQuiz** — Comprehensive application featuring deep integration with Firebase services and automated workflows via GitHub Actions.
2. **CryptoCrafters** — Collaborative software development project focused on secure backend database architecture and data management.
3. **VistaLingua** — Advanced cloud-integrated software solution leveraging scalable performance architectures.

---

## ⚙️ Getting Started

Follow these steps to run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/jofether/my-portfolio.git](https://github.com/jofether/my-portfolio.git)
   cd my-portfolio
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser to view the application.

📂 Project Structure
Plaintext
/app
  layout.tsx          — Global layout, metadata, and theme provider
  page.tsx            — Main entry point assembling all portfolio sections
  api/
    chat/             — Chatbot route configuration
    contact/          — Backend handler for contact form submissions
/components
  Navbar.tsx          — Floating glassmorphic navigation header
  Hero.tsx            — Intro section featuring dynamic typewriter titles
  About.tsx           — Professional background and structured technical skills
  Projects.tsx        — Project showcase grid with interactive filters
  ProjectCard.tsx     — Individual project card components
  Experience.tsx      — Timeline of professional and operational background
  Contact.tsx         — Interactive messaging and contact form
  Footer.tsx          — Social links, direct Gmail routing, and back-to-top
/lib
  firebase.ts         — Firebase client SDK configuration
  data.ts             — Centralized portfolio content and metadata
📄 Résumé Integration
Your active PDF resume is stored in the public directory at public/resume.pdf, linked directly to the navbar and hero action buttons.

🌐 Deployment
This project is optimized for deployment on Vercel:

Bash
npx vercel