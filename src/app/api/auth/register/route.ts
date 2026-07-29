import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  createSessionToken,
  hashPassword,
  jsonError,
  setSessionCookie,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const password = String(body.password || "");
    const confirmPassword = String(body.confirmPassword || "");
    const college = String(body.college || "").trim();
    const course = String(body.course || "").trim();
    const graduationYear = body.graduationYear ? Number(body.graduationYear) : null;
    const skills = String(body.skills || "").trim();
    const location = String(body.location || "").trim();

    if (!name || !email || !password) {
      return jsonError("Name, email and password are required");
    }
    if (password.length < 6) return jsonError("Password must be at least 6 characters");
    if (!confirmPassword) return jsonError("Confirm password is required");
    if (password !== confirmPassword) {
      return jsonError("Password and confirm password must be the same");
    }
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return jsonError("Email already registered", 409);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        passwordHash: await hashPassword(password),
        role: "STUDENT",
        profile: {
          create: {
            college: college || null,
            course: course || null,
            graduationYear,
            skills: skills || null,
            location: location || null,
          },
        },
      },
    });

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
    return jsonError("Registration failed", 500);
  }
}
