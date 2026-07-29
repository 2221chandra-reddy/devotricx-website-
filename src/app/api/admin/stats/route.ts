import { NextResponse } from "next/server";
import { getSession, jsonError } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return jsonError("Unauthorized", 401);

  const [students, jobs, applications, shortlisted, selected] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.job.count(),
    prisma.application.count(),
    prisma.application.count({ where: { status: "SHORTLISTED" } }),
    prisma.application.count({ where: { status: "SELECTED" } }),
  ]);

  return NextResponse.json({
    stats: { students, jobs, applications, shortlisted, selected },
  });
}
