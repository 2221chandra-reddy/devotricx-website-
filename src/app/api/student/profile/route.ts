import { NextResponse } from "next/server";
import { getSession, jsonError } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { saveUpload } from "@/lib/uploads";

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") return jsonError("Unauthorized", 401);

  const form = await req.formData();
  const name = String(form.get("name") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const college = String(form.get("college") || "").trim();
  const course = String(form.get("course") || "").trim();
  const graduationYearRaw = String(form.get("graduationYear") || "").trim();
  const skills = String(form.get("skills") || "").trim();
  const location = String(form.get("location") || "").trim();
  const resume = form.get("resume");
  const photo = form.get("photo");

  let resumeUrl: string | undefined;
  let photoUrl: string | undefined;

  if (resume instanceof File && resume.size > 0) {
    if (resume.size > 5 * 1024 * 1024) return jsonError("Resume max size is 5MB");
    resumeUrl = await saveUpload(resume, "resumes");
  }
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > 2 * 1024 * 1024) return jsonError("Photo max size is 2MB");
    photoUrl = await saveUpload(photo, "photos");
  }

  const graduationYear = graduationYearRaw ? Number(graduationYearRaw) : null;

  const user = await prisma.user.update({
    where: { id: session.id },
    data: {
      name: name || undefined,
      phone: phone || null,
      profile: {
        upsert: {
          create: {
            college: college || null,
            course: course || null,
            graduationYear,
            skills: skills || null,
            location: location || null,
            resumeUrl: resumeUrl || null,
            photoUrl: photoUrl || null,
          },
          update: {
            college: college || null,
            course: course || null,
            graduationYear,
            skills: skills || null,
            location: location || null,
            ...(resumeUrl ? { resumeUrl } : {}),
            ...(photoUrl ? { photoUrl } : {}),
          },
        },
      },
    },
    include: { profile: true },
  });

  return NextResponse.json({ ok: true, user });
}
