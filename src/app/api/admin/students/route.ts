import { NextRequest, NextResponse } from "next/server";
import { getSession, jsonError } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return jsonError("Unauthorized", 401);

  const q = req.nextUrl.searchParams.get("q")?.trim() || "";
  const students = await prisma.user.findMany({
    where: {
      role: "STUDENT",
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { email: { contains: q } },
              { phone: { contains: q } },
            ],
          }
        : {}),
    },
    include: { profile: true, _count: { select: { applications: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ students });
}
