import { countPhotos } from "~/lib/server";

export const GET = async () => {
  const photoCount = await countPhotos();
  return new Response(JSON.stringify(photoCount));
};
