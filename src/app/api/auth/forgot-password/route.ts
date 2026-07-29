import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jsonError } from "@/lib/auth";
import { appBaseUrl, sendMail } from "@/lib/mail";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    if (!email) return jsonError("Registered email is required");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return jsonError("This email is not registered. Please register first.", 404);
    }

    // Invalidate old unused tokens
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, usedAt: null },
    });

    const rawToken = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(rawToken),
        expiresAt,
      },
    });

    const resetUrl = `${appBaseUrl()}/users/reset-password?token=${rawToken}`;

    await sendMail({
      to: user.email,
      subject: "Reset your DevotricX password",
      text: `Hello ${user.name},\n\nUse this link to reset your password (valid for 1 hour):\n${resetUrl}\n\nIf you did not request this, ignore this email.`,
      html: `
        <p>Hello ${user.name},</p>
        <p>Click the button below to reset your password. This link is valid for <strong>1 hour</strong>.</p>
        <p><a href="${resetUrl}" style="display:inline-block;background:#E11D2E;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600">Change Password</a></p>
        <p>Or copy this link:<br/><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: "Password reset link has been sent to your registered email.",
    });
  } catch (e) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "Could not send reset link";
    if (
      msg.includes("Email service not configured") ||
      msg.includes("RESEND") ||
      msg.includes("SMTP")
    ) {
      return jsonError(
        "Email is not set up yet. Add SMTP_USER and SMTP_PASS in .env (Gmail App Password), then restart the server.",
        503,
      );
    }
    return jsonError("Could not send reset link", 500);
  }
}
