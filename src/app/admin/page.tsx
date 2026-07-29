import { redirect } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/applications", label: "Applications" },
];

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/admin/login");

  const [users, jobs, applications, shortlisted, selected] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.job.count(),
    prisma.application.count(),
    prisma.application.count({ where: { status: "SHORTLISTED" } }),
    prisma.application.count({ where: { status: "SELECTED" } }),
  ]);

  const cards = [
    ["Total Users", users],
    ["Total Jobs", jobs],
    ["Total Applications", applications],
    ["Shortlisted", shortlisted],
    ["Selected", selected],
  ];

  return (
    <PortalShell title="Admin Dashboard" role="ADMIN" links={adminLinks}>
      <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-[#475569]">Overview of users, jobs and hiring pipeline.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label as string} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#475569]">{label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
