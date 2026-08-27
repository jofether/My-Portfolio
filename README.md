# Developer Portfolio

A dark-mode, glassmorphism developer portfolio built with Next.js 14 (App
Router), Tailwind CSS, Framer Motion, Lucide React icons, and Firebase
Firestore.

## Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Backend:** Firebase Cloud Firestore (contact form + optional dynamic
  project loading)
- **Deployment target:** Vercel

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 1. Personalize your content

Everything about you lives in **`lib/data.ts`** — name, title, bio, skills,
projects, and work experience. Every placeholder is wrapped in
`[BRACKETS]`; search the file for `[` to find every field to fill in.

## 2. Connect Firebase

The contact form and the "load projects dynamically" feature in
`components/Projects.tsx` both use Firebase, but the site works and looks
complete without it — the contact form will show a clear error instead of
failing silently, and the project grid automatically falls back to the
static list in `lib/data.ts`.

**Client SDK (`lib/firebase.ts`)** — used by `Projects.tsx` to *read* from
the `projects` Firestore collection:

1. Create a project at https://console.firebase.google.com and enable
   **Cloud Firestore** (Build → Firestore Database → Create database).
2. Register a Web App in Project Settings → General → "Your apps", and copy
   the config values.
3. Copy `.env.local.example` to `.env.local` and fill in the
   `NEXT_PUBLIC_FIREBASE_*` values.
4. (Optional) Add documents to a `projects` collection in Firestore, shaped
   like the `Project` type in `lib/data.ts`, to have them override the
   static fallback list automatically.

**Admin SDK (`app/api/contact/route.ts`)** — used server-side to *write*
contact-form submissions to the `messages` collection:

1. Firebase Console → Project Settings → Service Accounts → "Generate new
   private key". This downloads a JSON file — keep it secret.
2. Add three more values to `.env.local` (these are server-only, no
   `NEXT_PUBLIC_` prefix):
   ```
   FIREBASE_PROJECT_ID=
   FIREBASE_CLIENT_EMAIL=
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```
   Keep the private key's `\n` sequences literal — the route unescapes them
   at runtime.

## 3. Add your résumé

Drop a PDF at `public/resume.pdf` (or update `personal.resumeUrl` in
`lib/data.ts` to point elsewhere).

## 4. Deploy to Vercel

```bash
npx vercel
```

Add the same environment variables from `.env.local` to your Vercel
project's Settings → Environment Variables before deploying.

## Project structure

```
/app
  layout.tsx        — global layout, fonts, metadata, dark theme
  page.tsx           — assembles all sections
  api/contact/route.ts — writes contact submissions to Firestore
/components
  Navbar.tsx, Hero.tsx, About.tsx, Projects.tsx, ProjectCard.tsx,
  Experience.tsx, Contact.tsx, Footer.tsx
/lib
  firebase.ts        — Firebase client SDK init
  data.ts            — all placeholder content lives here
```

## Accessibility & performance notes

- Keyboard focus states are visible on every interactive element.
- `prefers-reduced-motion` is respected — animations shorten to near-zero.
- Images use `next/image` with responsive `sizes` for optimal loading.
