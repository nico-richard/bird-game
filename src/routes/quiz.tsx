import { createResource, createSignal } from 'solid-js'
import { PhotoWithBird } from '~/lib/shared/types'
import './quiz.sass'
import Button from '~/component/Button'
import ImageShow from '~/component/ImageShow'
import Config from '~/component/Config'
import { Order, Tag } from '@prisma/client'
import { getBaseUrl } from '~/lib/shared/url'
import { getAllTags } from '~/lib/server'

export interface QuizConfig {
  orders?: Order[]
  tags?: Tag[]
}

export default function Quiz() {
  const baseUrl = getBaseUrl()
  const getRandomPhotoForConf: (
    config: QuizConfig
  ) => Promise<PhotoWithBird> = async (
    config: QuizConfig
  ) => {
    const params = new URLSearchParams()
    if (config.orders?.length) {
      params.set(
        'orders',
        config.orders.map((o) => o.id).join(',')
      )
    }
    if (config.tags?.length) {
      params.set(
        'tags',
        config.tags.map((t) => t.id).join(',')
      )
    }
    const res = await fetch(
      `${baseUrl}/api/photo/random?${params.toString()}`
    )
    if (!res.ok) {
      throw new Error('Erreur API')
    }
    return res.json()
  }

  const getOrders: () => Promise<Order[]> = async () => {
    const res = await fetch(`${baseUrl}/api/orders`)
    return res.json()
  }

  const deletePhoto = async () => {
    if (!photo()) return
    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer la photo de ${photo()?.bird.name} ?`
    )
    if (!confirmDelete) return

    try {
      const res = await fetch(
        `${baseUrl}/api/photo/${photo()?.id}`,
        {
          method: 'DELETE',
        }
      )
      if (!res.ok)
        throw new Error('Échec de la suppression')
      alert('Photo supprimée !')
      refetch()
      setShow(false)
    } catch (err) {
      console.error(err)
      alert('Impossible de supprimer la photo')
    }
  }

  const [count, setCount] = createSignal<number>(1)
  const [config, setConfig] =
    createSignal<QuizConfig | null>(null)
  const [show, setShow] = createSignal<boolean>(false)

  const [photo, { refetch }] = createResource(
    config,
    getRandomPhotoForConf
  )
  const [orders] = createResource<Order[]>(getOrders)
  const [tags] = createResource<Tag[]>(getAllTags)
  return (
    <>
      <Config
        orders={orders()}
        setConfig={setConfig}
        config={config()}
        tags={tags()}
      />
      <hr />
      {config() &&
        config()!.orders &&
        config()!.orders!.length > 0 && (
          <div class="quiz">
            <Button
              onClick={() => setCount(1)}
              color="grey"
            >
              {count()} [Réinitialiser]
            </Button>
            <Button
              onClick={() => {
                if (!show()) {
                  setShow(true)
                } else {
                  refetch()
                  setShow(false)
                }
                setCount(count() + 1)
              }}
            >
              {show() ? 'Suivant' : 'Afficher'}
            </Button>
            <ImageShow photo={photo()} />
            {
              <h3
                class="bird-name"
                style={{ opacity: show() ? '1' : '0' }}
              >
                {photo()?.bird.name}
              </h3>
            }
            {/*<Button onClick={deletePhoto} color="darkred">*/}
            {/*  Supprimer*/}
            {/*</Button>*/}
          </div>
        )}
    </>
  )
}
