import fs from "fs";
import { prisma as postgres } from "~/prisma/prisma";

async function importData() {
  const raw = fs.readFileSync("dump.json", "utf-8");
  try {
    const { orders, birds, photos } = JSON.parse(raw);

    console.log("Import orders...");
    for (const order of orders) {
      await postgres.order.create({
        data: { id: order.id, name: order.name },
      });
    }

    console.log("Import birds...");
    for (const bird of birds) {
      await postgres.bird.create({
        data: {
          id: bird.id,
          name: bird.name,
          naturalist_id: bird.naturalist_id,
          category: bird.category,
          orderId: bird.orderId,
        },
      });
    }

    console.log("Import photos...");
    for (const photo of photos) {
      await postgres.photo.create({
        data: {
          id: photo.id,
          naturalist_id: photo.naturalist_id,
          url: photo.url,
          birdId: photo.birdId,
        },
      });
    }

    console.log("✅ Import terminé");
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

importData()
  .catch(console.error)
  .finally(() => postgres.$disconnect());
