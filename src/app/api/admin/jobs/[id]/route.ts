import { NextRequest, NextResponse } from "next/server";
import { getSession, jsonError } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { JobStatus, WorkMode } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return jsonError("Unauthorized", 401);
  const { id } = await params;
  const body = await req.json();

  const job = await prisma.job.update({
    where: { id },
    data: {
      companyName: body.companyName ? String(body.companyName) : undefined,
      jobTitle: body.jobTitle ? String(body.jobTitle) : undefined,
      description: body.description ? String(body.description) : undefined,
      skills: body.skills ? String(body.skills) : undefined,
      experience: body.experience ? String(body.experience) : undefined,
      location: body.location ? String(body.location) : undefined,
      workMode: body.workMode ? (body.workMode as WorkMode) : undefined,
      salary: body.salary !== undefined ? String(body.salary || "") || null : undefined,
      lastDate: body.lastDate ? new Date(body.lastDate) : body.lastDate === null ? null : undefined,
      status: body.status ? (body.status as JobStatus) : undefined,
    },
  });

  return NextResponse.json({ ok: true, job });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return jsonError("Unauthorized", 401);
  const { id } = await params;
  await prisma.job.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
