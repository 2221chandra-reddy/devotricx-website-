# Careers + Users + Admin Portal

## Why live /careers can fail on Vercel

SQLite (`file:./dev.db`) only works on your PC. Vercel serverless cannot use a local SQLite file, so DB calls crash with a server error.

### Fix for production (required)

1. Create a free Postgres DB: https://neon.tech  
2. Copy the connection string  
3. In Vercel → Project → Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://...your-neon-url...
AUTH_SECRET=any-long-random-secret
APP_URL=https://www.devotrix.com
```

4. Then we switch Prisma to PostgreSQL and redeploy (ask the agent to do this after Neon is ready).

Until then, `/careers` shows the login page without crashing, but register/login/jobs need the cloud DB.

## Local

```bash
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Admin: `MNR@devotricx.com` / `DevotricX123`
