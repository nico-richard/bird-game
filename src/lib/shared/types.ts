import { BirdGetPayload } from "../../../generated/prisma/models/Bird";
import { PhotoGetPayload } from "../../../generated/prisma/models/Photo";

export type BirdWithOrdersAndPhotos = BirdGetPayload<{
  include: { order: true; photos: true };
}>;

export type PhotoWithBird = PhotoGetPayload<{
  include: { bird: true };
}>;
