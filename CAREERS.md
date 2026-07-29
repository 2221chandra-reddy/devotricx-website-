# Careers + Users + Admin Portal

Built into the same DevotricX Next.js website.

## Flow

1. **Admin** logs in and posts jobs (careers list starts empty).
2. **Users** register, complete profile, then apply to published jobs.
3. **Admin** reviews applications and updates status.

## URLs

- Careers: `/careers`
- User register: `/users/register`
- User login: `/users/login`
- User dashboard: `/users/dashboard`
- Admin login: `/admin/login`
- Admin dashboard: `/admin`

## Admin login

- Email: `MNR@devotricx.com`
- Password: `DevotricX123`

No demo user accounts — users must register.

## Local setup

```bash
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

## Storage

- Database: SQLite (`prisma/dev.db`) for free local development
- Resumes/photos: `public/uploads/`
- Later you can move DB to PostgreSQL/Supabase and files to S3

## Notes

- Application status changes log an email placeholder in server console (wire Resend later)
- Duplicate applications for the same job are blocked
- Phone numbers are visible only in admin screens
