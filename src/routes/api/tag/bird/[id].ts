import { getTagsForBird } from '~/lib/server'
import { APIEvent } from '@solidjs/start/server/spa'

export const GET = async ({ params }: APIEvent) => {
  if (!params.id) {
    return new Error('id is required')
  }
  const photos = await getTagsForBird(+params.id)
  return new Response(JSON.stringify(photos))
}
