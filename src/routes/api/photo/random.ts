import { randomPhoto } from "~/lib/server";

export const GET = async () => {
  const photo = await randomPhoto();
  return new Response(JSON.stringify(photo));
};
