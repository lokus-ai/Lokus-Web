<div align="center">

<img src="public/lokus-logo.svg" alt="Lokus" width="80" height="80" />

# Lokus Platform

**Website, Authentication, Plugin Registry & API Services**

The web infrastructure powering the Lokus ecosystem.

[lokusmd.com](https://lokusmd.com) · [API Docs](https://docs.lokusmd.com/api) · [Status](https://status.lokusmd.com)

---

[![Deployment](https://img.shields.io/badge/deployment-production-success?style=flat&labelColor=1a1a2e&color=22c55e)](https://lokusmd.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&labelColor=1a1a2e&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&labelColor=1a1a2e&logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3FCF8E?style=flat&labelColor=1a1a2e&logo=supabase)](https://supabase.com)

</div>

<br />

## Overview

This repository contains the web platform for Lokus, including:

| Service | Description |
|---------|-------------|
| **Marketing Site** | Landing page, blog, changelog at lokusmd.com |
| **Authentication** | OAuth 2.0 + PKCE flow for desktop app |
| **Plugin Registry** | Marketplace API for plugin discovery & distribution |
| **User Dashboard** | Account management, plugin publishing, API tokens |
| **Documentation** | User guides and API reference |

<br />

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare (CDN + WAF)                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    lokusmd.com (Next.js)                    │
├──────────────┬──────────────┬──────────────┬────────────────┤
│   Website    │     Auth     │   Registry   │   Dashboard    │
│   /          │  /api/auth/* │  /api/v1/*   │  /dashboard/*  │
└──────────────┴──────────────┴──────────────┴────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase (PostgreSQL)                    │
├──────────────┬──────────────┬──────────────────────────────┤
│    Users     │   Plugins    │       Auth Tokens            │
└──────────────┴──────────────┴──────────────────────────────┘
```

<br />

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth + Custom OAuth |
| **Storage** | Supabase Storage (plugin assets) |
| **Animations** | Framer Motion |
| **3D Graphics** | Three.js, React Three Fiber |
| **Deployment** | Docker, Nginx |

<br />

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase project (for auth & database)

### Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Required variables:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_BASE_URL=https://lokusmd.com
```

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

<br />

## Project Structure

```
lokus-web/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public pages
│   │   ├── page.tsx              # Landing page
│   │   ├── blog/                 # Blog posts
│   │   └── changelog/            # Release notes
│   ├── api/                      # API routes
│   │   ├── auth/                 # OAuth endpoints
│   │   │   ├── authorize/        # OAuth authorization
│   │   │   ├── token/            # Token exchange
│   │   │   ├── refresh/          # Token refresh
│   │   │   └── profile/          # User profile
│   │   └── v1/                   # Public API
│   │       └── registry/         # Plugin registry
│   ├── dashboard/                # Authenticated pages
│   │   ├── plugins/              # User's plugins
│   │   ├── publish/              # Plugin publishing
│   │   └── settings/             # Account settings
│   ├── login/                    # Authentication
│   └── signup/                   # Registration
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   └── ...                       # Feature components
├── lib/                          # Utilities
│   ├── supabase/                 # Supabase clients
│   └── utils.ts                  # Helper functions
└── public/                       # Static assets
```

<br />

## API Reference

### Authentication

The platform implements OAuth 2.0 with PKCE for secure desktop app authentication.

```
GET  /api/auth/authorize    # Start OAuth flow
POST /api/auth/token        # Exchange code for tokens
POST /api/auth/refresh      # Refresh access token
GET  /api/auth/profile      # Get user profile
```

### Plugin Registry

```
GET  /api/v1/registry/search              # Search plugins
GET  /api/v1/registry/plugin/:id          # Get plugin details
POST /api/v1/registry/publish             # Publish plugin (auth required)
GET  /api/v1/registry/download/:id/:ver   # Download plugin
```

See [API Documentation](https://docs.lokusmd.com/api) for complete reference.

<br />

## Deployment

### Docker

```bash
# Build image
docker build -t lokus-web .

# Run container
docker run -p 3000:3000 --env-file .env.local lokus-web
```

### Docker Compose (Production)

```yaml
services:
  website:
    build: .
    container_name: lokus-website
    restart: always
    env_file: .env
    environment:
      - NODE_ENV=production
      - PORT=3000
    networks:
      - lokus
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name lokusmd.com www.lokusmd.com;

    location / {
        proxy_pass http://lokus-website:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

<br />

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_BASE_URL` | Production URL | Yes |
| `DISCOURSE_SSO_SECRET` | Discourse SSO secret | No |
| `DISCOURSE_URL` | Discourse forum URL | No |

<br />

## Database Schema

### Users (Supabase Auth)
- Managed by Supabase Auth
- Extended with user metadata (avatar, name)

### Plugins
```sql
CREATE TABLE plugins (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    author_id UUID REFERENCES auth.users,
    version TEXT NOT NULL,
    downloads INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Auth Codes (OAuth)
```sql
CREATE TABLE auth_codes (
    code TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    code_challenge TEXT NOT NULL,
    redirect_uri TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

<br />

## Security

- **OAuth 2.0 + PKCE** — Secure authentication for desktop apps
- **Row Level Security** — Supabase RLS policies on all tables
- **Rate Limiting** — Nginx rate limiting on API endpoints
- **CORS** — Configured for desktop app origins
- **CSP** — Content Security Policy headers
- **HSTS** — HTTP Strict Transport Security

<br />

## Monitoring

| Service | Purpose |
|---------|---------|
| Cloudflare Analytics | Traffic & performance |
| Supabase Dashboard | Database metrics |
| Sentry | Error tracking (optional) |
| Umami | Privacy-friendly analytics |

<br />

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

<br />

## Related Repositories

| Repository | Description |
|------------|-------------|
| [lokus](https://github.com/lokus-ai/lokus) | Desktop application |
| [lokus-docs](https://github.com/lokus-ai/lokus-docs) | Documentation site |
| [lokus-plugins](https://github.com/lokus-ai/lokus-plugins) | Official plugins |

<br />

## License

This project is part of the Lokus ecosystem, licensed under [BSL 1.1](../lokus/LICENSE).

<br />

---

<div align="center">

**[lokusmd.com](https://lokusmd.com)** · **[Documentation](https://docs.lokusmd.com)** · **[GitHub](https://github.com/lokus-ai)**

<sub>Powering the Lokus ecosystem.</sub>

</div>
