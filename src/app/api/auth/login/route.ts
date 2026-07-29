import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  createSessionToken,
  ensureAdminUser,
  jsonError,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!email || !password) return jsonError("Email and password required");

    // Keep default admin account ready (local + cloud DB)
    if (email === "mnr@devotricx.com") {
      try {
        await ensureAdminUser();
      } catch (dbErr) {
        console.error("Admin bootstrap failed:", dbErr);
        return jsonError(
          "Database not connected on live server. Add Neon Postgres DATABASE_URL in Vercel, then redeploy.",
          503,
        );
      }
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return jsonError("Invalid email or password", 401);

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return jsonError("Invalid email or password", 401);

    const token = await createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    await setSessionCookie(token);

    return NextResponse.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "";
    if (
      msg.toLowerCase().includes("database") ||
      msg.toLowerCase().includes("sqlite") ||
      msg.toLowerCase().includes("prisma") ||
      msg.toLowerCase().includes("unable to open") ||
      msg.toLowerCase().includes("connect") ||
      msg.toLowerCase().includes("environ")
    ) {
      return jsonError(
        "Database not connected on live server. Create free Neon DB and set DATABASE_URL in Vercel.",
        503,
      );
    }
    return jsonError("Login failed. Please try again.", 500);
  }
}
