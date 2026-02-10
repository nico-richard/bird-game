import { Prisma } from "@prisma/client";

export type BirdWithOrders = Prisma.BirdGetPayload<{
  include: { order: true };
}>;

export type PhotoWithBird = Prisma.PhotoGetPayload<{
  include: { bird: true };
}>;
