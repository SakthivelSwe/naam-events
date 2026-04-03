# NaamEvent

NaamEvent is a full-stack event management platform with a professional public website, a protected admin dashboard, a Spring Boot REST API, and PostgreSQL persistence.

## Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
- Backend: Spring Boot, Spring Security, Spring Data JPA, Validation
- Database: PostgreSQL
- Media: Supabase Storage
- Deployment targets: Vercel, Render, Supabase

## Project Structure

```text
frontend/
backend/
render.yaml
```

## Frontend Features

- Home, Services, Gallery, Booking, and Contact pages
- Responsive layout with a trust-focused business design
- Booking and contact forms connected to backend APIs
- Backend-driven services and gallery content
- Protected `/admin` area for managing services, gallery, bookings, and contact requests

## Backend Features

- Public REST APIs:
  - `GET /api/services`
  - `GET /api/gallery`
  - `POST /api/bookings`
  - `POST /api/contacts`
- Admin REST APIs:
  - `POST /api/auth/login`
  - `GET/POST/PUT/DELETE /api/admin/services`
  - `GET/POST/PUT/DELETE /api/admin/gallery`
  - `GET /api/admin/bookings`
  - `GET /api/admin/contacts`
  - `POST /api/admin/uploads`
- JWT-protected admin access
- Seeded starter data for services and gallery

## Local Setup

### 1. Backend

Create `backend/.env` from `backend/.env.example`, then run:

```bash
mvn spring-boot:run
```

The API runs on `http://localhost:8080`.

### 2. Frontend

Create `frontend/.env.local` from `frontend/.env.example`, then run:

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`.

## Environment Variables

### Frontend

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_PHONE_NUMBER`
- `NEXT_PUBLIC_COMPANY_ADDRESS`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_TELEMETRY_DISABLED`

### Backend

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `CORS_ORIGIN`
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`

For local development you can use the direct Supabase database host with `DB_USERNAME=postgres`.
For Render deployment, use the Supabase session pooler host and the pooler username, which looks like `postgres.<project-ref>`.

## Database

- SQL schema: [`backend/database/schema.sql`](/c:/Projects/naam-events/backend/database/schema.sql)
- JPA entities manage tables automatically with `ddl-auto=update`

## Verification

- Backend: `mvn test`
- Frontend: `npm run build`

## Deployment

Deployment steps are documented in [`DEPLOYMENT.md`](/c:/Projects/naam-events/DEPLOYMENT.md). Render auto-deploy support is included in [`render.yaml`](/c:/Projects/naam-events/render.yaml).

## Security Note

The shared database password in the original request should be treated as exposed and rotated before production use.
