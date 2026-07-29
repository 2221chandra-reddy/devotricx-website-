import { redirect } from "next/navigation";
import UserPortalShell from "@/components/portal/UserPortalShell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { company } from "@/lib/company";

export default async function HelpPage() {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") redirect("/users/login");
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: { profile: true },
  });

  return (
    <UserPortalShell userName={session.name} photoUrl={user?.profile?.photoUrl}>
      <h1 className="font-display text-2xl font-bold">Help & Support</h1>
      <div className="mt-5 rounded-3xl border border-[#E8ECF1] bg-white p-6 shadow-sm text-sm text-[#475569]">
        <p>Need help with applications or your profile?</p>
        <p className="mt-3">
          Email:{" "}
          <a href={`mailto:${company.email}`} className="font-semibold text-[#E11D2E]">
            {company.email}
          </a>
        </p>
        <p className="mt-2">
          WhatsApp:{" "}
          <a href={company.whatsapp} target="_blank" rel="noreferrer" className="font-semibold text-[#E11D2E]">
            {company.phone}
          </a>
        </p>
      </div>
    </UserPortalShell>
  );
}
