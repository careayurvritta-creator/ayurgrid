# PLAN: Ayurveda PMS Landing Page

## Goal

Create a blank landing page for the Ayurveda Practice Management System (PMS), install essential dependencies (Supabase, Tailwind, etc.), and set up the project structure.

## Tasks

### 1. Project Initialization

- [ ] Initialize Next.js app (if not exists) or clean up existing `ayurgrid` folder.
- [ ] Install dependencies:
  - `supabase-js`, `dotenv` (for env vars)
  - `lucide-react` (icons)
  - `clsx`, `tailwind-merge` (styling utils)
  - `zod` (validation)
  - `shadcn-ui` (basic components if needed)

### 2. Configuration

- [ ] Create/Update `.env.local` with Supabase and Vercel credentials (placeholders if not provided).
- [ ] Set up `utils/supabase/client.ts` for frontend client.
- [ ] Set up `utils/supabase/server.ts` for server-side auth/data (if needed for landing).
- [ ] Configure `tailwind.config.ts` with a basic "Ayurveda" theme (earth tones, clean typography).

### 3. Implementation

- [ ] Create `app/page.tsx`:
  - Clean, blank state with a simple "AyurGrid PMS" header for now.
  - Ensure it's responsive.
- [ ] Create `app/layout.tsx`:
  - Basic meta tags for SEO.
  - Font setup (Inter or similar clean font).

### 4. Verification

- [ ] **Build Check**: Run `npm run build` to ensure no errors.
- [ ] **Lint Check**: Run `npm run lint`.
- [ ] **Supabase Connection**: Create a simple script `tools/check_supabase.ts` to verify connection using BLAST protocol.

## Done When

- [ ] Next.js app is running locally.
- [ ] Supabase client is initialized.
- [ ] Landing page renders with no console errors.
- [ ] Project follows BLAST directory structure (`tools/`, `architecture/` folders created).
