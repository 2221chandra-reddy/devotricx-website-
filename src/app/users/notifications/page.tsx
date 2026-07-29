import { redirect } from "next/navigation";
import UserPortalShell from "@/components/portal/UserPortalShell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function NotificationsPage() {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") redirect("/users/login");
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: { profile: true },
  });

  return (
    <UserPortalShell userName={session.name} photoUrl={user?.profile?.photoUrl} notificationCount={2}>
      <h1 className="font-display text-2xl font-bold">Notifications</h1>
      <div className="mt-5 space-y-3">
        <div className="rounded-2xl border border-[#E8ECF1] bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">Welcome to DevotricX</p>
          <p className="mt-1 text-xs text-[#64748B]">Complete your profile to start applying.</p>
        </div>
        <div className="rounded-2xl border border-[#E8ECF1] bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">New careers board</p>
          <p className="mt-1 text-xs text-[#64748B]">Check open positions when admin publishes jobs.</p>
        </div>
      </div>
    </UserPortalShell>
  );
}
