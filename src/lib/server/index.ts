import { birds } from "~/lib/data/birds/birds.data";
import { prisma } from "~/db/prisma";
import { autocompleteName, fetchBirdData } from "~/lib/client/api";
import { BirdWithOrdersAndPhotos, PhotoWithBird } from "~/lib/shared/types";
import { PhotoModel } from "../../../generated/prisma/models/Photo";
import { OrderModel } from "../../../generated/prisma/models/Order";

export const getAllBirds: () => Promise<
  BirdWithOrdersAndPhotos[]
> = async () => {
  "use server";
  return prisma.bird.findMany({ include: { order: true, photos: true } });
};

export const getPhotosForBird: (
  birdId: number,
) => Promise<PhotoWithBird[]> = async (birdId: number) => {
  "use server";
  return prisma.photo.findMany({
    where: { birdId: birdId },
    include: { bird: true },
  });
};

export const deletePhoto: (photoId: number) => Promise<PhotoModel> = async (
  photoId: number,
) => {
  "use server";
  return prisma.photo.delete({
    where: { id: photoId },
  });
};

export const getBirds = async () => {
  "use server";
  return prisma.bird.findMany();
};

export const countBirds = async () => {
  "use server";
  return prisma.bird.count();
};

export const countPhotos: () => Promise<number> = async () => {
  "use server";
  return prisma.photo.count();
};

export const randomPhotoForOrders = async (
  orderIds: number[],
): Promise<PhotoWithBird | null> => {
  "use server";
  const ids = await prisma.photo.findMany({
    where: orderIds.length
      ? {
          bird: {
            orderId: { in: orderIds },
          },
        }
      : undefined,
    select: { id: true },
  });

  if (!ids.length) return null;

  const randomId = ids[Math.floor(Math.random() * ids.length)].id;

  return prisma.photo.findUnique({
    where: { id: randomId },
    include: { bird: true },
  });
};

export const fillAllBirdsWithData = async () => {
  "use server";
  for (let bird of birds) {
    const order = await prisma.order.upsert({
      where: { name: bird.order },
      update: {},
      create: { name: bird.order },
    });
    const foundBird = await prisma.bird.findFirst({
      where: { name: { contains: bird.name } },
    });
    if (!foundBird) {
      console.log("no bird found for name : " + bird.name);
      continue;
    }
    await prisma.bird.update({
      where: { name: foundBird.name },
      data: { category: bird.category, orderId: order.id },
    });
  }
  return "done";
};

export const getAllPhotos: () => Promise<PhotoWithBird[]> = async () => {
  "use server";
  return prisma.photo.findMany({
    take: 100,
    include: {
      bird: true,
    },
  });
};

export const getAllOrders: () => Promise<OrderModel[]> = async () => {
  "use server";
  return prisma.order.findMany();
};

export const addAllBirds = async () => {
  "use server";
  for (let bird of birds) {
    await autocompleteName(bird.name);
    await prisma.bird.create({
      data: { name: bird.name, naturalist_id: 13 },
    });
  }
};

export const addOnePhoto = async () => {
  "use server";
  for (let bird of birds) {
    const existing = await prisma.bird.findUnique({
      where: { name: bird.name },
    });
    if (existing?.id) {
      continue;
    }
    try {
      const foundBird = await autocompleteName(bird.name);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newBird = await prisma.bird.upsert({
        where: { naturalist_id: foundBird.id },
        update: {},
        create: { name: foundBird.matched_term, naturalist_id: foundBird.id },
      });
      const birdData = await fetchBirdData(foundBird.id);
      for (let taxonPhoto of birdData.taxon_photos) {
        await prisma.photo.upsert({
          where: { naturalist_id: taxonPhoto.photo.id },
          update: {},
          create: {
            naturalist_id: taxonPhoto.photo.id,
            url: taxonPhoto.photo.medium_url,
            birdId: newBird.id,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  return "done";
};
