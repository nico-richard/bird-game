import { randomPhotoForConfig } from '~/lib/server'
import { APIEvent } from '@solidjs/start/server/spa'

export const GET = async ({ request }: APIEvent) => {
  const url = new URL(request.url)
  const orderParams = url.searchParams.get('orders')
  const tagParams = url.searchParams.get('tags')
  const orderIds = orderParams
    ? orderParams.split(',').map((o) => +o)
    : []
  const tagIds = tagParams
    ? tagParams.split(',').map((o) => +o)
    : []
  const photo = await randomPhotoForConfig(orderIds, tagIds)
  return new Response(JSON.stringify(photo))
}
