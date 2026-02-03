import { APIEvent } from "@solidjs/start/server/spa";

export const GET = async ({ params }: APIEvent) => {
  if (!params.id) {
    return new Error("id is required");
  }
  const bird = await fetch(`https://api.inaturalist.org/v1/taxa/${params.id}`);
  const json = await bird.json();
  return new Response(JSON.stringify(json.results[0], null, 4));
};
