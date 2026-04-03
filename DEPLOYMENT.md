# NaamEvent Deployment Guide

## Target Architecture

- GitHub: source of truth
- Vercel: deploy `frontend/`
- Render: deploy Spring Boot backend and MinIO from [`render.yaml`](/c:/Projects/naam-events/render.yaml)
- Supabase: PostgreSQL database

## Code Changes Already Added

- [`render.yaml`](/c:/Projects/naam-events/render.yaml) creates:
  - `naamevent-backend`
  - `naamevent-minio`
- [`backend/Dockerfile`](/c:/Projects/naam-events/backend/Dockerfile) packages the Spring Boot app for Render
- [`backend/src/main/java/com/naamevent/api/config/AppConfig.java`](/c:/Projects/naam-events/backend/src/main/java/com/naamevent/api/config/AppConfig.java) supports Render private-network MinIO via `MINIO_HOSTPORT`
- [`backend/src/main/java/com/naamevent/api/controller/AdminUploadController.java`](/c:/Projects/naam-events/backend/src/main/java/com/naamevent/api/controller/AdminUploadController.java) generates upload URLs from the current backend request
- [`backend/src/main/java/com/naamevent/api/controller/HealthController.java`](/c:/Projects/naam-events/backend/src/main/java/com/naamevent/api/controller/HealthController.java) provides `/api/health` for Render health checks

## 1. Push to GitHub

1. Create a GitHub repository.
2. Push this project to the repository.
3. Keep the repo structure as:

```text
frontend/
backend/
render.yaml
```

## 2. Create Supabase Database

1. Open Supabase and create or reuse your project.
2. Copy the Postgres connection details.
3. Use the JDBC URL in this format:

```text
jdbc:postgresql://db.ulqwvjntrzoobbnbwsdj.supabase.co:5432/postgres?sslmode=require
```

4. Keep these values ready:
   - `DB_URL`
   - `DB_USERNAME=postgres`
   - `DB_PASSWORD`

## 3. Deploy Backend and MinIO on Render

### Use the Blueprint

1. Open Render.
2. Click `New` -> `Blueprint`.
3. Connect your GitHub repository.
4. Render will detect [`render.yaml`](/c:/Projects/naam-events/render.yaml).
5. Continue setup and enter the secret values Render asks for.

### Secrets to enter in Render

- `DB_URL`
  Use:
  `jdbc:postgresql://db.ulqwvjntrzoobbnbwsdj.supabase.co:5432/postgres?sslmode=require`
- `DB_PASSWORD`
  Use your actual Supabase database password
- `CORS_ORIGIN`
  Use your Vercel domain later, for example:
  `https://naamevent.vercel.app`
- `ADMIN_PASSWORD`
  Choose your admin password
- `MINIO_ROOT_USER`
  Recommended: `admin`
- `MINIO_ROOT_PASSWORD`
  Recommended: a strong password

### What Render will create

- `naamevent-backend`
  Public web service
- `naamevent-minio`
  Private service with persistent disk mounted at `/data`

### Important backend env values already handled by the blueprint

- `DB_USERNAME=postgres`
- `ADMIN_USERNAME=admin`
- `JWT_SECRET` generated automatically
- `MINIO_HOSTPORT` injected automatically from the MinIO private service
- `MINIO_SECURE=false`
- `MINIO_BUCKET_NAME=naameventgudiyattam`

### After Render deploys

1. Open the backend service.
2. Copy its public URL.
3. Test:
   - `/api/health`
   - `/api/services`
   - `/api/auth/login`

Example:

```text
https://naamevent-backend.onrender.com/api/health
```

## 4. Deploy Frontend on Vercel

1. Open Vercel.
2. Import the same GitHub repository.
3. Set the project root directory to `frontend`.
4. Framework preset should be `Next.js`.
5. Add these environment variables:

- `NEXT_PUBLIC_API_BASE_URL=https://your-render-backend-url/api`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=919080086413`
- `NEXT_PUBLIC_PHONE_NUMBER=+91 90800 86413`
- `NEXT_PUBLIC_COMPANY_ADDRESS=Your real business address`
- `NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/naam_events_gudiyattam?igsh=MTE0empxcnFpY3J0OA==`

6. Deploy.

## 5. Update Render CORS

After Vercel gives you the real domain:

1. Open Render backend service settings.
2. Set `CORS_ORIGIN` to the exact Vercel domain.
3. Redeploy the backend once.

## 6. GitHub Auto Deploy Flow

After both projects are connected:

1. Push code to GitHub.
2. Vercel automatically redeploys the frontend.
3. Render automatically redeploys the backend and keeps MinIO attached to its persistent disk.

## 7. First Production Checks

1. Open the Vercel site.
2. Confirm:
   - Home page loads
   - Services and gallery load from backend
   - Booking form submits
   - Contact form submits
3. Open `/admin/login`
4. Log in with:
   - username: `admin`
   - password: your chosen `ADMIN_PASSWORD`
5. Upload a test image from admin and confirm it renders publicly

## 8. If You Want Zero Manual Render Service Creation

Use the Blueprint path only. Do not create backend and MinIO as separate manual services first. The GitHub-connected Blueprint plus [`render.yaml`](/c:/Projects/naam-events/render.yaml) is the automatic setup.

## 9. Optional Changes You Can Make

- Change `MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD` to strong credentials in Render
- Replace the default seeded service/gallery images in Supabase using the admin panel
- Add a real production address in Vercel env vars
- Add a custom domain to both Vercel and Render

## 10. Files That Matter for Deployment

- [`render.yaml`](/c:/Projects/naam-events/render.yaml)
- [`backend/Dockerfile`](/c:/Projects/naam-events/backend/Dockerfile)
- [`backend/src/main/resources/application.yml`](/c:/Projects/naam-events/backend/src/main/resources/application.yml)
- [`frontend/.env.example`](/c:/Projects/naam-events/frontend/.env.example)
- [`backend/.env.example`](/c:/Projects/naam-events/backend/.env.example)
