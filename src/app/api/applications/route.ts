import { NextResponse } from "next/server";
import { getSession, jsonError } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") {
    return jsonError("Please login as a user to apply", 401);
  }

  const body = await req.json();
  const jobId = String(body.jobId || "");
  if (!jobId) return jsonError("Job ID required");

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || job.status !== "PUBLISHED") return jsonError("Job not available", 404);
  if (job.lastDate && job.lastDate < new Date()) {
    return jsonError("Application deadline has passed");
  }

  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session.id },
  });

  try {
    const application = await prisma.application.create({
      data: {
        studentId: session.id,
        jobId,
        resumeUrl: profile?.resumeUrl || null,
        status: "APPLIED",
      },
      include: { job: true },
    });
    return NextResponse.json({ ok: true, application });
  } catch {
    return jsonError("You already applied for this job", 409);
  }
}
