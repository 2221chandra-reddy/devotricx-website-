import Link from "next/link";
import { redirect } from "next/navigation";
import UserPortalShell from "@/components/portal/UserPortalShell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") redirect("/users/login");
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: { profile: true },
  });

  return (
    <UserPortalShell userName={session.name} photoUrl={user?.profile?.photoUrl}>
      <h1 className="font-display text-2xl font-bold">Settings</h1>
      <div className="mt-5 space-y-3 rounded-3xl border border-[#E8ECF1] bg-white p-6 shadow-sm">
        <p className="text-sm text-[#64748B]">Manage your account details from Profile.</p>
        <Link href="/users/profile" className="inline-flex rounded-full bg-[#E11D2E] px-4 py-2 text-sm font-semibold text-white">
          Go to Profile
        </Link>
        <Link href="/users/forgot-password" className="ml-2 inline-flex rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-semibold">
          Change Password
        </Link>
      </div>
    </UserPortalShell>
  );
}
