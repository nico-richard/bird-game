import { getAllPhotos } from "~/lib/server";

export const GET = async () => {
  const photos = await getAllPhotos();
  return new Response(JSON.stringify(photos));
};
