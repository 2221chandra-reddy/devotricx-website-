import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, jsonError } from "@/lib/auth";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = String(body.token || "").trim();
    const password = String(body.password || "");
    const confirmPassword = String(body.confirmPassword || "");

    if (!token) return jsonError("Reset link is invalid");
    if (!password || !confirmPassword) return jsonError("Password and confirm password are required");
    if (password.length < 6) return jsonError("Password must be at least 6 characters");
    if (password !== confirmPassword) return jsonError("Password and confirm password must be the same");

    const tokenHash = hashToken(token);
    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!record || record.usedAt || record.expiresAt < new Date()) {
      return jsonError("This reset link is invalid or expired. Please request a new one.", 400);
    }

    const passwordHash = await hashPassword(password);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
      prisma.passwordResetToken.deleteMany({
        where: { userId: record.userId, usedAt: null, NOT: { id: record.id } },
      }),
    ]);

    return NextResponse.json({
      ok: true,
      message: "Password updated successfully. You can login now.",
    });
  } catch (e) {
    console.error(e);
    return jsonError("Could not update password", 500);
  }
}
