import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jsonError } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job || job.status !== "PUBLISHED") return jsonError("Job not found", 404);
  return NextResponse.json({ job });
}
