import { deleteTag } from "~/lib/server";
import { APIEvent } from "@solidjs/start/server/spa";

export const DELETE = async ({ params }: APIEvent) => {
  if (!params.id) {
    return new Error("id is required");
  }
  const tag = await deleteTag(+params.id);
  console.log(`Delete tag: ${JSON.stringify(tag)}`);
  return new Response(JSON.stringify(tag));
};
