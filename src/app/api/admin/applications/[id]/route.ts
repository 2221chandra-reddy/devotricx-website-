import { NextRequest, NextResponse } from "next/server";
import { getSession, jsonError } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { ApplicationStatus } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return jsonError("Unauthorized", 401);
  const { id } = await params;
  const body = await req.json();
  const status = body.status as ApplicationStatus;
  if (!status) return jsonError("Status required");

  const application = await prisma.application.update({
    where: { id },
    data: { status },
    include: { student: true, job: true },
  });

  // Email hook placeholder — wire Resend/Nodemailer later
  console.log(
    `[email-placeholder] To: ${application.student.email} | Status: ${status} | Job: ${application.job.jobTitle}`,
  );

  return NextResponse.json({ ok: true, application });
}
