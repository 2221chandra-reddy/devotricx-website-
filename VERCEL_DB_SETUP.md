# Fix live login / careers (Vercel + Neon)

## Already done in code
- Prisma uses **PostgreSQL** (Neon)
- Build runs `prisma db push` + seed (creates admin automatically)

## Add these in Vercel → Settings → Environment Variables

Use **Production** (and Preview if you want):

| Name | Value |
|------|--------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_9PGbmKc7Ehoe@ep-small-butterfly-aydtup4g-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `DIRECT_URL` | `postgresql://neondb_owner:npg_9PGbmKc7Ehoe@ep-small-butterfly-aydtup4g.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `AUTH_SECRET` | `devotricx-live-secret-2026` |
| `APP_URL` | `https://www.devotrix.com` |

Then **Deployments → Redeploy** (or wait for the GitHub push deploy).

## Admin login
- https://www.devotrix.com/admin/login
- Email: `MNR@devotricx.com`
- Password: `DevotricX123`

## Security
You shared the DB password in chat. After live works, rotate the Neon password and update Vercel + local `.env`.
