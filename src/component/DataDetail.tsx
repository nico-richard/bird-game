import {
  createResource,
  For,
  onCleanup,
  onMount,
  Setter,
} from 'solid-js'
import './DataDetail.sass'
import { PhotoWithBird } from '~/lib/shared/types'
import Button from '~/component/Button'
import { Tag } from '@prisma/client'
import TagItem from '~/component/TagItem'

interface DataDetailsProps {
  selectedTaxonId: number | null
  setSelectedTaxonId: Setter<number | null>
}

const DataDetail = (props: DataDetailsProps) => {
  const fetchPhotosForBirds: () => Promise<
    PhotoWithBird[]
  > = async () => {
    const res = await fetch(
      `/api/photo/${props.selectedTaxonId}`
    )
    return res.json()
  }
  const fetchBirdTags: () => Promise<Tag[]> = async () => {
    const res = await fetch(
      `/api/tag/bird/${props.selectedTaxonId}`
    )
    return res.json()
  }
  const [photosForBird] = createResource(
    fetchPhotosForBirds
  )
  const [tags] = createResource(fetchBirdTags)
  onMount(() => {
    document.body.style.overflow = 'hidden'
  })

  onCleanup(() => {
    document.body.style.overflow = ''
  })

  return (
    <div
      class="modal-backdrop"
      onClick={() => props.setSelectedTaxonId(null)}
    >
      <div
        class="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div class="header">
          {photosForBird() && (
            <h2 class="name">
              {photosForBird()?.[0].bird.name ?? ''}
            </h2>
          )}
          <Button
            classes={['close']}
            onClick={() => props.setSelectedTaxonId(null)}
          >
            Fermer
          </Button>
        </div>
        <div class="tags">
          <For each={tags()}>
            {(tag) => (
              <TagItem>{tag.name.toUpperCase()}</TagItem>
            )}
          </For>
        </div>
        <div class="bird-photos">
          {photosForBird()?.map((photo: PhotoWithBird) => (
            <img src={photo.url} alt="" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DataDetail
