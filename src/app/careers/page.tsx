import Link from "next/link";
import UserLoginExperience from "@/components/portal/UserLoginExperience";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export default async function CareersPage() {
  const session = await getSession();
  const jobs = await prisma.job.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  if (session?.role !== "STUDENT") {
    return <UserLoginExperience />;
  }

  return (
    <div className="min-h-screen bg-[#EEF2F6]">
      <header className="bg-white">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">
          <Link href="/" className="font-display text-[22px] font-bold tracking-tight text-[#0F172A]">
            DEVOTRIC<span className="text-[#E11D2E]">X</span>
          </Link>
          <Link
            href="/users/dashboard"
            className="rounded-lg bg-[#E11D2E] px-4 py-2.5 text-sm font-semibold text-white"
          >
            My Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-5 py-10">
        {jobs.length > 0 ? (
          <>
            <h1 className="font-display text-3xl font-bold text-[#0F172A]">Open Positions</h1>
            <p className="mt-2 text-[#64748B]">Apply for roles at DevotricX.</p>
            <div className="mt-8 grid gap-5">
              {jobs.map((job) => (
                <article key={job.id} className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-[#E11D2E] uppercase">
                        {job.companyName}
                      </p>
                      <h2 className="mt-1 font-display text-xl font-bold">{job.jobTitle}</h2>
                      <p className="mt-2 max-w-3xl text-sm text-[#64748B]">{job.description}</p>
                    </div>
                    <Link
                      href={`/careers/${job.id}`}
                      className="rounded-full bg-[#E11D2E] px-4 py-2 text-sm font-semibold text-white"
                    >
                      View & Apply
                    </Link>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#64748B]">
                    <span className="rounded-full bg-[#F1F5F9] px-3 py-1">{job.location}</span>
                    <span className="rounded-full bg-[#F1F5F9] px-3 py-1">{job.workMode}</span>
                    <span className="rounded-full bg-[#F1F5F9] px-3 py-1">{job.experience}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-10 text-center shadow-sm">
            <p className="text-[#64748B]">No published jobs yet.</p>
            <Link href="/users/dashboard" className="mt-4 inline-block text-sm font-semibold text-[#E11D2E]">
              Go to dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
