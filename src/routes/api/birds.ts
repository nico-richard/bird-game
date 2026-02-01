import { getAllBirds } from "~/lib/server";

export const GET = async () => {
  const birds = await getAllBirds();
  return new Response(JSON.stringify(birds));
};
