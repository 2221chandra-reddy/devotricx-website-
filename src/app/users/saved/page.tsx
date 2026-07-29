import { redirect } from "next/navigation";
import UserPortalShell from "@/components/portal/UserPortalShell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function SavedJobsPage() {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") redirect("/users/login");
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: { profile: true },
  });

  return (
    <UserPortalShell userName={session.name} photoUrl={user?.profile?.photoUrl}>
      <h1 className="font-display text-2xl font-bold">Saved Jobs</h1>
      <p className="mt-2 text-sm text-[#64748B]">Save jobs from Careers to revisit them here. Coming soon.</p>
    </UserPortalShell>
  );
}
