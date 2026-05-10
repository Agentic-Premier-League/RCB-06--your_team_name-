# Career Copilot — Setup Guide

AI-powered internship platform built with Next.js 14, Supabase, and Google Gemini.

---

## Project Structure

```
RCB-06--your_team_name-/
├── career-copilot/   ← Next.js app (main project)
├── UIDesign/         ← Static HTML/CSS prototype with full navigation
└── SETUP.md
```

> **UI Preview:** Open `UIDesign/_static_html/index.html` in your browser to navigate all screens with working links — no screenshots needed.

---

## Run Locally

**Prerequisites:** Node.js 18+

```bash
cd career-copilot
npm install
npm run dev
```

App runs at **http://localhost:3000**

---

## Environment Variables

Create `career-copilot/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```

> **Without API keys:** The app runs with mock AI responses — all features work, AI outputs are pre-defined samples.

---

## Supabase Setup

Run this SQL in your Supabase project → **SQL Editor**:

```sql
create table profiles (
  id uuid references auth.users primary key,
  first_name text, last_name text,
  university text, grad_year int, skills text[],
  created_at timestamptz default now()
);
```

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Custom CSS Design System |
| Database + Auth | Supabase (PostgreSQL) |
| AI | Google Gemini (`gemini-2.0-flash`) |
| Icons | Phosphor Icons |
| Deployment | Vercel |

---

## Deploy to Vercel

1. Push repo to GitHub
2. Import in [vercel.com](https://vercel.com) → set **Root Directory** to `career-copilot`
3. Add environment variables in Vercel dashboard
4. Deploy
