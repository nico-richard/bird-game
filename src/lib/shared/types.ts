import { Prisma } from "@prisma/client";

export type BirdWithOrdersAndPhotos = Prisma.BirdGetPayload<{
  include: { order: true; photos: true };
}>;

export type PhotoWithBird = Prisma.PhotoGetPayload<{
  include: { bird: true };
}>;
