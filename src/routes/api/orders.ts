import { getAllOrders } from "~/lib/server";

export const GET = async () => {
  const orders = await getAllOrders();
  return new Response(JSON.stringify(orders));
};
