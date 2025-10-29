This repository is a Next.js App Router site (React + Tailwind) that serves a photography portfolio.

Key facts for AI coding agents (be concise, actionable):

- Project layout and important files

  - app/layout.js — global layout, fonts, site-wide metadata, Toaster. Use this file to modify global HTML structure, metadata, and accessibility landmarks. Example: the main element with id="content" landmark and an inline JSON-LD WebSite schema live here.
  - app/page.js, app/about/page.jsx, app/testimonials/page.jsx, app/workfolio/[genre]/page.jsx — route pages follow Next.js App Router conventions.
  - components/ — reusable UI: Header.jsx, Footer.jsx, SocialButtons.jsx, Client.jsx (AdvancedCameraReel). Prefer updating components here for UI changes.
  - app/api/\*/route.js — edge/serverless API routes (e.g., app/api/submit/route.js) — follow existing request/response patterns and export default handlers per Next.js route conventions.
  - public/ — static assets (favicons, OG images). When adding metadata references (OG images, icons), place files here and reference with absolute path like /og-image.jpg.

- Frameworks and patterns

  - Next.js (App Router) with server/client components: default app routes are server components unless 'use client' is declared at top. Only add client-only hooks (useState/useEffect) inside files with "use client" or existing client components in components/ (these are client-side already).
  - Tailwind CSS for styling (see tailwind.config.js, globals.css). Use class-based utility patterns rather than inline styles. Keep responsive variants consistent (w/ sm/md/lg breakpoints used across components).
  - Fonts loaded via next/font/google in app/layout.js. When editing fonts, modify the declared variables (e.g., --font-geist-sans) and reuse those CSS variables in components.
  - Framer Motion is used in components/Client.jsx for continuous animations. Preserve motion usage and the animate/transition contract when tweaking animations (for example, animate={{ x: [0, -reelWidth] }} with linear easing).

- SEO, accessibility and conventions

  - Metadata and OG/Twitter cards are set in app/layout.js via export const metadata. Use NEXT_PUBLIC_SITE_URL env var for canonical/OG URLs. Add images to /public and reference them in metadata.
  - Layout contains an accessible "Skip to content" link and wraps pages in a main element with id="content" — keep that pattern when changing root layout.
  - JSON-LD is included inline in app/layout.js for the WebSite schema. If adding Organization or Person schema, follow the same pattern and ensure no duplicate/conflicting scripts are emitted.

- Developer workflows (commands)

  - Install: npm ci (or npm install)
  - Dev server: npm run dev (starts Next.js dev on default port 3000)
  - Build: npm run build
  - Start (production): npm start or npm run start (depending on package scripts)
  - Lint/typecheck: follow the repo scripts in package.json (run npm run lint if present)

- Code style & small rules

  - Keep components as small, focused units saved under components/ and avoid mixing server-side data fetching with client UI logic. If a component uses hooks (useState/useEffect), mark it client-side.
  - When changing route files in app/, use the Next.js App Router conventions: file-based routing, page.jsx for pages, route.js for API handlers, layout.js for nested layouts.
  - Prefer static assets in /public and reference them with root-relative paths (for example, /favicon.ico).

- Integration & external services

  - The repo uses client-side toast notifications with react-hot-toast configured in app/layout.js (Toaster). When adding server-side POST endpoints (for example, app/api/submit/route.js), follow the existing fetch/POST shape and return JSON with status codes.

- Tests and validation

  - This repo doesn't include explicit test files in-tree. Ensure any code changes compile by running npm run build. For accessibility checks, confirm presence of the main element with id="content" and the skip link.

- When to ask clarifying questions
  - If a change requires adding env vars (for example, NEXT_PUBLIC_SITE_URL) or new static assets (OG images, favicons), ask where to place them and whether to commit them to the repo.
  - If modifying fonts or Tailwind config, confirm whether to update globals.css or tailwind.config.js to avoid global style regressions.

Examples from the codebase

- Animation speed prop: components/Client.jsx exposes speed = 20 (seconds for a full loop). If tuning motion, keep duration: speed and ease: 'linear' for continuous motion.
- Metadata added in app/layout.js uses process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' — keep this fallback when adding canonical links.

If anything here is incomplete or you'd like me to include additional rules (commit conventions, pre-commit hooks, or CI), tell me what to add and I'll update this file.
