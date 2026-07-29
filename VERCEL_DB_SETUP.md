# Fix live login / careers (Vercel + Neon)

## Already done in code
- Prisma uses **PostgreSQL** (Neon)
- Build runs `prisma db push` + seed (creates admin automatically)

## Add these in Vercel → Settings → Environment Variables

Use **Production** (and Preview if you want):

| Name | Value |
|------|--------|
| `DATABASE_URL` | Neon **pooled** connection string (`...-pooler...neon.tech...`) |
| `DIRECT_URL` | Neon **direct** connection string (host without `-pooler`) |
| `AUTH_SECRET` | any long random text, e.g. `devotricx-live-secret-2026` |
| `APP_URL` | `https://www.devotrix.com` |

Copy the URLs from the Neon console (Connect button). Do **not** commit them to GitHub.

Then **Deployments → Redeploy**.

## Admin login
- https://www.devotrix.com/admin/login
- Email: `MNR@devotricx.com`
- Password: `DevotricX123`

## Security
If the DB password was shared in chat, rotate it in Neon and update Vercel + local `.env`.
