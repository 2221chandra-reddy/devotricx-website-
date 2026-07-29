import Link from "next/link";
import { redirect } from "next/navigation";
import UserPortalShell from "@/components/portal/UserPortalShell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function UserApplicationsPage() {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") redirect("/users/login");

  const [applications, user] = await Promise.all([
    prisma.application.findMany({
      where: { studentId: session.id },
      include: { job: true },
      orderBy: { appliedAt: "desc" },
    }),
    prisma.user.findUnique({
      where: { id: session.id },
      include: { profile: true },
    }),
  ]);

  return (
    <UserPortalShell userName={session.name} photoUrl={user?.profile?.photoUrl}>
      <h1 className="font-display text-3xl font-bold">My Applications</h1>
      <div className="mt-6 space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold">{app.job.jobTitle}</h2>
                <p className="text-sm text-[#475569]">{app.job.companyName}</p>
                <p className="mt-1 text-xs text-[#475569]">
                  Applied {new Date(app.appliedAt).toLocaleString()}
                </p>
              </div>
              <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-semibold">
                {app.status.replaceAll("_", " ")}
              </span>
            </div>
            <Link href={`/careers/${app.jobId}`} className="mt-3 inline-block text-sm text-[#E11D2E]">
              View job
            </Link>
          </div>
        ))}
        {applications.length === 0 ? (
          <p className="text-[#475569]">
            No applications yet.{" "}
            <Link href="/careers" className="text-[#E11D2E]">
              Browse careers
            </Link>
          </p>
        ) : null}
      </div>
    </UserPortalShell>
  );
}
