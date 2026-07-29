import { NextRequest, NextResponse } from "next/server";
import { getSession, jsonError } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { JobStatus, WorkMode } from "@prisma/client";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return jsonError("Unauthorized", 401);
  const jobs = await prisma.job.findMany({
    include: { _count: { select: { applications: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ jobs });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return jsonError("Unauthorized", 401);

  const body = await req.json();
  const jobTitle = String(body.jobTitle || "").trim();
  const description = String(body.description || "").trim();
  if (!jobTitle || !description) return jsonError("Title and description required");

  const job = await prisma.job.create({
    data: {
      companyName: String(body.companyName || "DevotricX Technologies"),
      jobTitle,
      description,
      skills: String(body.skills || "").trim(),
      experience: String(body.experience || "").trim(),
      location: String(body.location || "").trim(),
      workMode: (body.workMode || "HYBRID") as WorkMode,
      salary: body.salary ? String(body.salary) : null,
      lastDate: body.lastDate ? new Date(body.lastDate) : null,
      status: (body.status || "PUBLISHED") as JobStatus,
    },
  });

  return NextResponse.json({ ok: true, job });
}
