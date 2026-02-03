import { randomPhotoForOrders } from "~/lib/server";
import { APIEvent } from "@solidjs/start/server/spa";

export const GET = async ({ request }: APIEvent) => {
  const url = new URL(request.url);
  const orderParams = url.searchParams.get("orders");
  const orderIds = orderParams ? orderParams.split(",").map((o) => +o) : [];
  const photo = await randomPhotoForOrders(orderIds);
  return new Response(JSON.stringify(photo));
};
