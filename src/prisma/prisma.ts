import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaNeon({
  connectionString: process.env.STORAGE_DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });
