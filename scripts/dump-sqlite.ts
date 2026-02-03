import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "~/prisma/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db", // ⚠️ adapte le chemin EXACT vers ton sqlite
});

const prisma = new PrismaClient({ adapter });

async function dump() {
  const orders = await prisma.order.findMany();
  const birds = await prisma.bird.findMany();
  const photos = await prisma.photo.findMany();

  console.log(JSON.stringify({ orders, birds, photos }, null, 2));
}

dump()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
