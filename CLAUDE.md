# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start development server
bun build        # Production build
bun start        # Start production server
bun lint         # Biome lint check
bun format       # Biome format (writes changes)
```

The `start.sh` script sets up SSH tunnels for remote backend ports (7000, 7001) and starts both `core` and `gd-frota-web` dev servers simultaneously.

## Tech Stack

- **Framework**: Next.js (App Router) + React 19
- **Styling**: Styled Components v6 (SSR via Next.js compiler plugin)
- **Server state**: TanStack React Query v5 (with server-side dehydration/prefetch)
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios
- **Linting/Formatting**: Biome 2 (replaces ESLint + Prettier)
- **Language**: TypeScript strict mode, path alias `@/*` → `./src/*`

## Architecture

This is a **multi-tenant admin dashboard** with RBAC (Role-Based Access Control).

### Route Structure (`src/app/`)

- `(public)/` — Login page (unauthenticated)
- `(private)/[empresa_id]/dashboard/` — Protected routes scoped to a tenant
  - `(dashboard)/` — Dashboard cards overview
  - `app/[app_slug]/overview/` — Per-app management
  - `pessoas/` — User management + permissions (`[user_id]/permissoes/`)
  - `chamados/abertos/` — Support tickets

Routing and auth are handled in `src/proxy.ts` (Next.js middleware): unauthenticated requests redirect to `/`; authenticated requests at `/` redirect to `/{empresa_id}/dashboard`; JWT expiration is validated server-side.

### Auth & Session

- Auth context: `src/context/auth.tsx` — provides `login`, `logout`, `selectTenant`, `hasAppAccess`, `isCompanyAdmin`
- Token and `empresa_id` stored in **sessionStorage** (ephemeral) and cookies
- `src/services/http/auth.ts` — Axios instance with `withCredentials`, Bearer token header, and 403 interceptor that dispatches a `forbidden` event when `SUDO_REQUIRED`
- **Sudo mode** (`src/services/sudo-manager.ts`): a modal password prompt for elevated-privilege operations, managed via `sudo-provider.tsx`

### API Services (`src/services/http/`)

- `api.ts` — Base Axios instance pointing to `http://localhost:7000`
- `auth.ts` — Auth endpoints (`/auth/login`, `/usuarios/me`) with interceptors
- `users.ts`, `roles.ts`, `apps.ts` — Domain-specific endpoints
- `third-party/brasil-api.ts` — External Brasil API

Backend base URL is `NEXT_PUBLIC_AUTH_API_URL` (env var).

### Provider Stack (root layout)

`QueryClient → Auth → Sudo → StyledComponents → Theme → GlobalStyles → Toast`

All providers are in `src/app/_components/providers/`.

### Styling Conventions

Components follow a two-file pattern:
- `index.tsx` — component logic
- `styles.ts` — styled-components definitions

Theme (`src/config/theme.ts`) defines dark/light variants. Primary color is `#CD533B`. Global styles use a 62.5% font-size base (10px = 1rem) and Work Sans font.

### Layout & Navigation

- `src/config/route-map.tsx` — drives the sidebar and navbar dynamically based on the current pathname
- `src/util/breadcup.ts` — auto-generates breadcrumbs from URL segments, mapping slugs to human-readable labels

### Form Validation

Zod schemas live in `src/schemas/`. All user-facing error messages are in **Portuguese**.
