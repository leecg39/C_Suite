# AGENTS.md

## Cursor Cloud specific instructions

### What this project is
Single product (not a monorepo). A Vite + React 19 + TypeScript SPA called **대표님 AI / C-Level AI** — an executive AI dashboard where users chat with C-level agents (CFO/CTO/CMO/COO/CHRO) and generate strategic reports. All application code lives in `app/frontend`. There is **no backend service in this repo**: the SPA talks directly to **Supabase** (auth + Postgres + realtime) and to an **OpenAI-compatible** chat endpoint from the browser. Note: `.wiki.md` is outdated (it claims Next.js; the real stack is Vite).

### Package manager
Use **npm** in `app/frontend`. A committed `package-lock.json` is the source of truth; `pnpm-lock.yaml` is gitignored (root `.gitignore`). The `packageManager: pnpm@8.10.0` field in `package.json` is misleading — npm installs reproducibly against the committed lockfile.

### Standard commands (run in `app/frontend`)
See `app/frontend/package.json` scripts. Dev-focused workflow:
- Dev server: `npm run dev` (Vite, http://127.0.0.1:5173).
- Lint: `npm run lint` (eslint). NOTE: the repo currently has pre-existing lint errors (see below); `npm run lint | tail` masks the exit code — don't rely on a piped exit status.
- Build: `npm run build` (currently fails due to a pre-existing bug — see below).

### Environment variables
Config lives in `app/frontend/.env` (gitignored). See `app/frontend/.env.example` for the Supabase vars. The chat feature additionally needs OpenAI vars that are **not** in `.env.example`:
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- `VITE_OPENAI_API_KEY` (required for chat), optional `VITE_OPENAI_BASE_URL` (default `https://api.openai.com/v1`) and `VITE_OPENAI_MODEL` (default `gpt-4-turbo-preview`).
- Vite only reads `.env` at server start — **restart `npm run dev` after editing `.env`**.

### Running a fully-local backend (Supabase + mock LLM)
For end-to-end work without external SaaS accounts, run a local backend. This is **service startup**, not part of the update script:
1. Docker: this VM needs `sudo dockerd` with `storage-driver: fuse-overlayfs`, legacy iptables, and (Docker 29+) `features.containerd-snapshotter: false` in `/etc/docker/daemon.json`. The Supabase CLI is installed from GitHub releases.
2. `supabase start` (from a `supabase init` project dir) brings up Postgres/Auth/REST/Realtime. API at `http://127.0.0.1:54321`; it prints the anon key. Email confirmations are off by default, so signups are auto-confirmed.
3. Apply the schema/seed/RLS from `app/frontend/README_BACKEND.md` §3–4 (e.g. pipe the SQL into `docker exec -i supabase_db_... psql -U postgres -d postgres`).
4. **GOTCHA:** creating tables via `psql` does NOT grant PostgREST roles access the way the hosted Supabase dashboard does. Without grants you get `42501 permission denied for table` / HTTP 403 in the app. After applying the schema, run:
   ```sql
   GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
   GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
   GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
   ```
5. LLM: point `VITE_OPENAI_BASE_URL` at any OpenAI-compatible endpoint. Without a real key, a tiny local mock that streams `POST /v1/chat/completions` (SSE `data:` chunks + `data: [DONE]`, with permissive CORS + OPTIONS handling) is enough to exercise the chat path.

### Auth / data gotchas
- There is **no sign-up UI** — only a login form. Create users via the Supabase auth API/dashboard.
- `conversations.user_id` (and `reports.user_id`) are FKs to `public.users`, but authenticated users only exist in `auth.users`. The app's `signUp` tries to insert into `public.users` but that insert is blocked (no RLS INSERT policy on `users`, and `password_hash` is `NOT NULL`). So after creating an auth user you must also insert a matching `public.users` row, or conversation/report creation fails with a foreign-key error.

### Pre-existing application bugs (block the app from running; NOT environment issues)
The repo does not run out of the box past the landing page. These are code defects, not setup problems:
1. `app/frontend/src/pages/Login.tsx` imports `AlertCircle` from `@/components/ui/alert` (which doesn't export it). This breaks the Vite dep scan for the `/login` route and `npm run build`. `AlertCircle` should be imported from `lucide-react`.
2. `app/frontend/src/pages/Dashboard.tsx` calls `useMemo` (the `filteredRevenueData`/`filteredDepartmentData`/`filteredKpiData` hooks, ~line 296) *after* the early `return`s for `agentsLoading`/`agentsError`. Once data loads this throws "Rendered more hooks than during the previous render" and the dashboard renders blank. Hoist those hooks above the early returns (or make them plain consts).
3. `app/frontend/src/pages/Dashboard.tsx` uses `ChartTooltip`/`ChartTooltipContent` inside `recharts` `ResponsiveContainer`s without wrapping in shadcn's `ChartContainer`, causing "useChart must be used within a `<ChartContainer>`". Wrap each chart in `ChartContainer`.

### Chat behavior note
The assistant reply is shown only transiently while streaming (in the "응답 생성 중…" card) and is cleared on completion; the dashboard does not re-render persisted messages inline. To verify a send worked, check the `messages` table rather than expecting the reply to stay on screen.
