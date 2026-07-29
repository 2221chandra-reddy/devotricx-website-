import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Briefcase,
  CheckCircle2,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import UserPortalShell from "@/components/portal/UserPortalShell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function UserDashboard() {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") redirect("/users/login");

  const [apps, jobs, user, recentApps] = await Promise.all([
    prisma.application.count({ where: { studentId: session.id } }),
    prisma.job.count({ where: { status: "PUBLISHED" } }),
    prisma.user.findUnique({
      where: { id: session.id },
      include: { profile: true },
    }),
    prisma.application.findMany({
      where: { studentId: session.id },
      include: { job: true },
      orderBy: { appliedAt: "desc" },
      take: 3,
    }),
  ]);

  const photoUrl = user?.profile?.photoUrl;
  const profileComplete = Boolean(
    user?.phone && user?.profile?.skills && user?.profile?.resumeUrl && user?.profile?.photoUrl,
  );
  const initial = session.name.charAt(0).toUpperCase();

  const activity = [
    { title: "Welcome to DevotricX!", detail: "Your account is ready to apply for jobs.", time: "Just now" },
    {
      title: profileComplete ? "Profile looks complete" : "Profile created",
      detail: profileComplete
        ? "Keep your resume updated for better matches."
        : "Add photo, skills and resume to improve visibility.",
      time: "Just now",
    },
    ...recentApps.map((a) => ({
      title: `Applied: ${a.job.jobTitle}`,
      detail: a.job.companyName,
      time: new Date(a.appliedAt).toLocaleDateString(),
    })),
  ].slice(0, 3);

  return (
    <UserPortalShell userName={session.name} photoUrl={photoUrl} notificationCount={2}>
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl border border-[#E8ECF1] bg-white p-5 shadow-sm md:p-7">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#FEE2E2]/60 blur-3xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#FEE2E2] shadow">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoUrl} alt={session.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-[#E11D2E]">
                  {initial}
                </div>
              )}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Welcome back, {session.name}
              </h1>
              <p className="mt-1 text-sm text-[#64748B]">
                Track openings and your application progress.
              </p>
            </div>
          </div>
          <form action="/api/auth/logout" method="post" className="hidden">
            {/* logout handled client-side in shell */}
          </form>
          <div className="hidden items-end gap-2 pr-2 md:flex">
            <div className="rounded-2xl bg-[#F8FAFC] px-4 py-3 text-center">
              <Briefcase className="mx-auto text-[#E11D2E]" size={22} />
              <p className="mt-1 text-[11px] font-medium text-[#64748B]">Careers Hub</p>
            </div>
            <div className="rounded-2xl bg-[#FEF2F2] px-4 py-3 text-center">
              <Sparkles className="mx-auto text-[#E11D2E]" size={22} />
              <p className="mt-1 text-[11px] font-medium text-[#64748B]">Grow Faster</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-[#E8ECF1] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Open Jobs</p>
              <p className="mt-2 font-display text-3xl font-bold">{jobs}</p>
            </div>
            <div className="rounded-xl bg-[#FEF2F2] p-2.5 text-[#E11D2E]">
              <Briefcase size={18} />
            </div>
          </div>
          <Link href="/careers" className="mt-4 inline-block text-sm font-semibold text-[#E11D2E]">
            View all jobs
          </Link>
        </div>

        <div className="rounded-3xl border border-[#E8ECF1] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">My Applications</p>
              <p className="mt-2 font-display text-3xl font-bold">{apps}</p>
            </div>
            <div className="rounded-xl bg-[#F3E8FF] p-2.5 text-[#7C3AED]">
              <FileText size={18} />
            </div>
          </div>
          <Link
            href="/users/applications"
            className="mt-4 inline-block text-sm font-semibold text-[#7C3AED]"
          >
            View applications
          </Link>
        </div>

        <div className="rounded-3xl border border-[#E8ECF1] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Profile Update</p>
              <p className="mt-2 font-display text-3xl font-bold">
                {profileComplete ? "Done" : "Update"}
              </p>
            </div>
            <div className="rounded-xl bg-[#ECFDF5] p-2.5 text-[#059669]">
              <UserRound size={18} />
            </div>
          </div>
          <Link href="/users/profile" className="mt-4 inline-block text-sm font-semibold text-[#059669]">
            Complete your profile
          </Link>
        </div>
      </section>

      {/* Actions */}
      <section className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 rounded-full bg-[#E11D2E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#C41626]"
        >
          <Search size={16} />
          Browse Careers
        </Link>
        <Link
          href="/users/profile"
          className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#334155] hover:border-[#E11D2E]"
        >
          Complete Profile
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-medium text-[#059669]">
          <ShieldCheck size={13} />
          Your data is secure with us
        </span>
      </section>

      {/* Bottom panels */}
      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#E8ECF1] bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold">Recommended for You</h2>
          {jobs > 0 ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-[#64748B]">
                {jobs} open role{jobs === 1 ? "" : "s"} available right now.
              </p>
              <Link
                href="/careers"
                className="inline-flex rounded-full bg-[#E11D2E] px-4 py-2 text-sm font-semibold text-white"
              >
                Browse openings
              </Link>
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center text-center">
              <div className="rounded-full bg-[#FEF2F2] p-4 text-[#E11D2E]">
                <Briefcase size={28} />
              </div>
              <p className="mt-4 font-medium text-[#334155]">No job recommendations yet</p>
              <p className="mt-1 max-w-xs text-sm text-[#94A3B8]">
                Complete your profile so we can match you with the right roles.
              </p>
              <Link
                href="/users/profile"
                className="mt-5 inline-flex rounded-full bg-[#E11D2E] px-4 py-2 text-sm font-semibold text-white"
              >
                Complete Profile
              </Link>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-[#E8ECF1] bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {activity.map((item) => (
              <div key={item.title + item.time} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-[#FEF2F2] p-2 text-[#E11D2E]">
                  <CheckCircle2 size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0F172A]">{item.title}</p>
                  <p className="text-xs text-[#64748B]">{item.detail}</p>
                </div>
                <span className="shrink-0 text-[11px] text-[#94A3B8]">{item.time}</span>
              </div>
            ))}
          </div>
          <Link
            href="/users/applications"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#E2E8F0] py-2.5 text-sm font-semibold text-[#334155] hover:border-[#E11D2E]"
          >
            View All Activity
          </Link>
        </div>
      </section>
    </UserPortalShell>
  );
}
