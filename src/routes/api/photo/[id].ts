import { deletePhoto, getPhotosForBird } from "~/lib/server";
import { APIEvent } from "@solidjs/start/server/spa";

export const GET = async ({ params }: APIEvent) => {
  if (!params.id) {
    return new Error("id is required");
  }
  const photos = await getPhotosForBird(+params.id);
  return new Response(JSON.stringify(photos));
};

export const DELETE = async ({ params }: APIEvent) => {
  if (!params.id) {
    return new Error("id is required");
  }
  const photo = await deletePhoto(+params.id);
  console.log(`Deleted photo: ${JSON.stringify(photo)}`);
  return new Response(JSON.stringify(photo));
};
