# GoResumeBolt

**Full-stack AI resume builder and analyzer** — ATS-friendly resumes, multiple templates, and structured feedback via Google Gemini. React + Vite frontend, Express API, Supabase Auth and PostgreSQL with RLS.


---

## Why this project

Job seekers need resumes that pass ATS tools and read well to humans. This app mirrors real SaaS patterns: SPA auth with Supabase, JWT-protected REST APIs, Postgres with row-level security, and a third-party AI integration.

---

## Live demo (add your links)

`https://go-resume-orcin.vercel.app/`

---

## What I built

| Area | Highlights |
|------|------------|
| **Product** | Auth (email + OAuth-ready), multi-template editor, PDF AI analysis, history |
| **Frontend** | React 18, TypeScript, Vite, Tailwind, shadcn/ui, React Router, TanStack Query |
| **Backend** | Express (ESM), Supabase JWT verification, rate limiting, CORS, Helmet, uploads |
| **Data** | Supabase Postgres + **RLS** on `profiles`, `resumes`, `resume_analyses` |
| **AI** | Gemini scoring/suggestions, PDF parsing, PII-aware pipeline |
| **DevOps** | Env-based local vs Vercel/Render, health endpoint |

---

## Core features

- **Auth** — Supabase in the browser; Express validates JWTs on protected routes.
- **Builder** — Nine ATS-oriented templates (e.g. Modern Professional, Tech ATS, Minimalist Pro).
- **Analyzer** — PDF upload, optional job description, Gemini-powered feedback.
- **Security** — Helmet, CORS allowlist, rate limits, upload limits, RLS.

---

## Architecture (high level)

```text
Browser (Vite + React)
    ├── Supabase (Auth + client reads) — anon key + RLS
    └── Express API — JWT + service role
            ├── Supabase Postgres
            └── Google Gemini
```

More detail: `ARCHITECTURE.md`.

---

## Tech stack

**Frontend:** React · TypeScript · Vite · Tailwind · shadcn/ui · React Router · TanStack Query · Supabase JS · Zod · React Hook Form  

**Backend:** Node · Express · Supabase JS · Multer · pdf-parse · Google Generative AI · Helmet · express-rate-limit · CORS  

**Platform:** Supabase (Auth + Postgres) · Vercel / Render (optional)

---

## Repository structure

```text
GoResumeBolt/
├── frontend/          # React + Vite + TS — src/components, pages, lib/api.ts
├── backend/
│   ├── src/           # routes, services, middleware, server.js
│   └── database/schema.sql   # run once in Supabase SQL Editor
├── ARCHITECTURE.md
├── PROJECT_SUMMARY.md
└── README.md
```

---

## Prerequisites

Node.js 18+, npm, a [Supabase](https://supabase.com) project, a Google Gemini API key. Optional: Vercel + Render for deploys.

---

## Quick start (local)

1. **Database** — In Supabase **SQL Editor**, run all of `backend/database/schema.sql`.

2. **Backend**

   ```bash
   cd backend
   cp .env.example .env
   # Fill values (see comments in .env.example)
   npm install && npm run dev
   ```

   Default: `http://localhost:4000` · `GET /health`

3. **Frontend**

   ```bash
   cd frontend
   # Create .env with VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_API_URL=http://localhost:4000/api
   npm install && npm run dev
   ```

   App: `http://localhost:5173`

**Environment variables:** Copy and edit `backend/.env.example` → `backend/.env`. For the frontend, mirror Supabase URL + anon key and set `VITE_API_URL` to your API base (e.g. `http://localhost:4000/api`). **Production:** set `VITE_API_URL` on Vercel to your hosted API; keep localhost in local `.env` only.

---

## Deployment (short)

- **Render (backend):** Same vars as `backend/.env`; host usually sets `PORT`. Set `FRONTEND_URL` to your Vercel URL. Redeploy after env changes.
- **Vercel (frontend):** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL` = production API (`https://…/api`). Redeploy after changes.
- **Supabase:** **Authentication → URL configuration** — Site URL and redirect URLs = production frontend domain.

---

## Skills demonstrated

- **Frontend:** React (TypeScript, Vite) — UI, routing, and calling the backend API  
- **Backend:** Express.js REST API — routes, middleware, and JSON error handling  
- **Database:** Supabase / PostgreSQL — schema, tables, and wiring the app to stored data  
- **Auth:** Supabase Auth on the client + **JWT** verification on protected Express routes  
- **AI:** Google **Gemini** — API integration, prompts, and using model output in the app  
- **Config & deploy:** Environment variables, local vs production setup (e.g. Vercel + Render)  

---

## More docs

- **API routes:** `backend/README.md`  
- **Architecture:** `ARCHITECTURE.md`  
- **Feature / schema summary:** `PROJECT_SUMMARY.md`  

---

## License

ISC

---

## Author

**Murari Varma Mudunuri** · [murari23@gmail.com](mailto:murari23@gmail.com)
