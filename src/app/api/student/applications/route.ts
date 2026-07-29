import { NextResponse } from "next/server";
import { getSession, jsonError } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") return jsonError("Unauthorized", 401);

  const applications = await prisma.application.findMany({
    where: { studentId: session.id },
    include: { job: true },
    orderBy: { appliedAt: "desc" },
  });
  return NextResponse.json({ applications });
}
