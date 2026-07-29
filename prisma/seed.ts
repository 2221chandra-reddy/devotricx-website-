import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "mnr@devotricx.com";
const ADMIN_PASSWORD = "DevotricX123";

async function main() {
  // Clear demo data — jobs start empty; students register themselves
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.user.deleteMany({ where: { role: "STUDENT" } });
  await prisma.user.deleteMany({
    where: {
      email: { in: ["admin@devotricx.com", "student@example.com"] },
    },
  });

  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      name: "MNR Admin",
      role: "ADMIN",
      passwordHash: adminHash,
    },
    create: {
      name: "MNR Admin",
      email: ADMIN_EMAIL,
      phone: "7672041816",
      role: "ADMIN",
      passwordHash: adminHash,
    },
  });

  console.log("Seed complete: admin only —", ADMIN_EMAIL);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
