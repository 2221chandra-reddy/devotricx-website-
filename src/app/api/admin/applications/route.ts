import { NextRequest, NextResponse } from "next/server";
import { getSession, jsonError } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { ApplicationStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return jsonError("Unauthorized", 401);

  const status = req.nextUrl.searchParams.get("status") || "";
  const jobId = req.nextUrl.searchParams.get("jobId") || "";

  const applications = await prisma.application.findMany({
    where: {
      ...(status ? { status: status as ApplicationStatus } : {}),
      ...(jobId ? { jobId } : {}),
    },
    include: {
      student: { include: { profile: true } },
      job: true,
    },
    orderBy: { appliedAt: "desc" },
  });

  return NextResponse.json({ applications });
}
