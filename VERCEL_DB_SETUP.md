# Fix live login / careers (Vercel + Neon)

Live error: **Database not connected**

SQLite only works on your PC. Vercel needs **Neon Postgres**.

## Steps (about 5 minutes)

### 1. Create Neon DB
1. Open https://console.neon.tech and sign up (free)
2. Create a project (any name, e.g. `devotricx`)
3. Click **Connect** → copy the **connection string**  
   It looks like: `postgresql://...@...neon.tech/neondb?sslmode=require`

### 2. Add env vars in Vercel
1. Open https://vercel.com → your project
2. **Settings → Environment Variables**
3. Add these for **Production** (and Preview if you want):

| Name | Value |
|------|--------|
| `DATABASE_URL` | paste Neon connection string |
| `AUTH_SECRET` | any long random text (example: `devotricx-live-secret-2026`) |
| `APP_URL` | `https://www.devotrix.com` |

### 3. Redeploy
1. Vercel → **Deployments** → latest → **Redeploy**  
   (or push any commit to GitHub)

### 4. Login
- URL: `https://www.devotrix.com/admin/login`
- Email: `MNR@devotricx.com`
- Password: `DevotricX123`

Build now runs `prisma db push` + seed so admin is created automatically.
