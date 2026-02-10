import { getAllTags } from "~/lib/server";

export const GET = async () => {
  const tags = await getAllTags();
  return new Response(JSON.stringify(tags));
};
