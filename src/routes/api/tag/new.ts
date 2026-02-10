import { APIEvent } from "@solidjs/start/server/spa";
import { createTag } from "~/lib/server";

export const POST = async (event: APIEvent) => {
  const body = await new Response(event.request.body).json();
  console.log("courou");
  if (!body) {
    return new Error("body is required");
  }
  if (!body.name) {
    return new Error("name is required");
  }
  const photo = await createTag(body.name);
  console.log(`Add new tag photo: ${JSON.stringify(photo)}`);
  return new Response(JSON.stringify(photo));
};
