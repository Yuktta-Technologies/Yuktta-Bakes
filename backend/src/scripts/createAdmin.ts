import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

async function main() {
  const email = "admin@yukttabakes.com";
  const password = "admin123"; // change later
  const name = "Admin";

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  console.log("✅ Admin created:", email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
