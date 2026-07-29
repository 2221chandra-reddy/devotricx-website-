import { redirect } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/admin/login");

  const users = await prisma.user.findMany({
    where: { role: "STUDENT" },
    include: { profile: true, _count: { select: { applications: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PortalShell
      title="Admin Dashboard"
      role="ADMIN"
      links={[
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/jobs", label: "Jobs" },
        { href: "/admin/applications", label: "Applications" },
      ]}
    >
      <h1 className="font-display text-3xl font-bold">User Management</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F1F5F9] text-[#475569]">
            <tr>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Apps</th>
              <th className="px-4 py-3">Resume</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-[#E2E8F0]">
                <td className="px-4 py-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-[#F1F5F9]">
                    {u.profile?.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={u.profile.photoUrl}
                        alt={u.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-[#94A3B8]">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.phone || "-"}</td>
                <td className="px-4 py-3">{u.profile?.location || "-"}</td>
                <td className="px-4 py-3">{u._count.applications}</td>
                <td className="px-4 py-3">
                  {u.profile?.resumeUrl ? (
                    <a href={u.profile.resumeUrl} target="_blank" className="text-[#EF4444]">
                      Download
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalShell>
  );
}
