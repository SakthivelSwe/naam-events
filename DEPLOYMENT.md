# NaamEvent Deployment Guide

## Target Architecture

- GitHub: source of truth
- Vercel: deploy `frontend/`
- Render: deploy Spring Boot backend from [`render.yaml`](/c:/Projects/naam-events/render.yaml)
- Supabase: PostgreSQL database and public Storage bucket

## What Changed for Free Tier

- MinIO has been removed from the codebase and deployment config
- Admin image uploads now go from the Spring backend to Supabase Storage
- [`render.yaml`](/c:/Projects/naam-events/render.yaml) now creates only one Render web service, which is compatible with the free tier

## 1. Push to GitHub

1. Create a GitHub repository if you have not already.
2. Push this project and keep the monorepo structure:

```text
frontend/
backend/
render.yaml
```

## 2. Prepare Supabase

### Database

Use your Supabase Postgres connection details.

For Render, do not use the direct `db.<project-ref>.supabase.co` host unless you have the Supabase IPv4 add-on. Supabase documents that direct database connections are IPv6 by default, and Supabase specifically lists Render as a platform that needs an IPv4-compatible option. Use the Supabase `Session pooler` connection string from the `Connect` screen instead.

Local development can still use the direct host if your local network supports IPv6.

Direct connection example for local use:

```text
jdbc:postgresql://db.ulqwvjntrzoobbnbwsdj.supabase.co:5432/postgres?sslmode=require
```

Keep these ready:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

For Render, use values shaped like this:

```text
DB_URL=jdbc:postgresql://aws-0-<region>.pooler.supabase.com:5432/postgres?sslmode=require
DB_USERNAME=postgres.<project-ref>
DB_PASSWORD=your-supabase-password
```

Get the exact host, username, and port from Supabase Dashboard -> `Connect` -> `Session pooler`.

### Storage

1. Open your Supabase project.
2. Go to `Storage`.
3. Create a bucket named `naameventgudiyattam`.
4. Mark the bucket as `Public`.
5. Go to `Project Settings` -> `API`.
6. Copy:
   - Project URL for `SUPABASE_URL`
   - Service role key for `SUPABASE_SERVICE_ROLE_KEY`

Use these backend values:

- `SUPABASE_URL=https://your-project-ref.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`
- `SUPABASE_STORAGE_BUCKET=naameventgudiyattam`

## 3. Deploy Backend on Render

### Option A: Use `render.yaml`

1. Open Render.
2. Click `New` -> `Blueprint`.
3. Connect your GitHub repository.
4. Render will detect [`render.yaml`](/c:/Projects/naam-events/render.yaml).
5. Continue with setup.

### Option B: Create a Web Service Manually

1. Open Render.
2. Click `New` -> `Web Service`.
3. Connect your GitHub repository.
4. Use these settings:
   - Root directory: `backend`
   - Runtime: `Docker`
   - Instance type: `Free`
   - Auto deploy: `Yes`

### Render backend environment variables

- `DB_URL=jdbc:postgresql://aws-0-<region>.pooler.supabase.com:5432/postgres?sslmode=require`
- `DB_USERNAME=postgres.<project-ref>`
- `DB_PASSWORD=your-supabase-db-password`
- `CORS_ORIGIN=https://your-vercel-domain.vercel.app`
- `JWT_SECRET=your-base64-secret`
- `ADMIN_USERNAME=admin`
- `ADMIN_PASSWORD=your-admin-password`
- `SUPABASE_URL=https://your-project-ref.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`
- `SUPABASE_STORAGE_BUCKET=naameventgudiyattam`

### After Render deploys

Test these endpoints:

- `https://your-render-backend.onrender.com/api/health`
- `https://your-render-backend.onrender.com/api/services`

## 4. Deploy Frontend on Vercel

1. Open Vercel.
2. Import the same GitHub repository.
3. Set root directory to `frontend`.
4. Confirm framework is `Next.js`.
5. Add these environment variables:

- `NEXT_PUBLIC_API_BASE_URL=https://your-render-backend.onrender.com/api`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=919080086413`
- `NEXT_PUBLIC_PHONE_NUMBER=+91 90800 86413`
- `NEXT_PUBLIC_COMPANY_ADDRESS=Ganapathy Nagar, Gudiyattam, Vellore 632602`
- `NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/naam_events_gudiyattam?igsh=MTE0empxcnFpY3J0OA==`

Deploy the project.

## 5. Update Render CORS

After Vercel gives you the final frontend domain:

1. Open Render service settings.
2. Update `CORS_ORIGIN` to the exact Vercel URL.
3. Redeploy the backend once.

## 6. Auto Deploy Flow

After the first setup:

1. Push changes to GitHub.
2. Vercel automatically redeploys the frontend.
3. Render automatically redeploys the backend.

## 7. Production Checks

1. Open the Vercel site.
2. Confirm the public pages load.
3. Submit a booking and contact request.
4. Log in at `/admin/login`.
5. Upload a test image from the admin area.
6. Confirm the returned image URL is a public Supabase Storage URL and the image displays correctly.

## 8. Files That Matter for Deployment

- [`render.yaml`](/c:/Projects/naam-events/render.yaml)
- [`backend/Dockerfile`](/c:/Projects/naam-events/backend/Dockerfile)
- [`backend/src/main/resources/application.yml`](/c:/Projects/naam-events/backend/src/main/resources/application.yml)
- [`backend/.env.example`](/c:/Projects/naam-events/backend/.env.example)
- [`frontend/.env.example`](/c:/Projects/naam-events/frontend/.env.example)

## Sources

- Supabase IPv4 and IPv6 compatibility: https://supabase.com/docs/guides/troubleshooting/supabase--your-network-ipv4-and-ipv6-compatibility-cHe3BP
- Supabase connection strings and pooler guidance: https://supabase.com/docs/reference/postgres/connection-strings
