import { createSignal, For, Setter } from 'solid-js'
import { QuizConfig } from '~/routes/quiz'
import './Config.sass'
import Button from './Button'
import { Order, Tag } from '@prisma/client'

interface OrderListProps {
  orders?: Order[]
  tags?: Tag[]
  config: QuizConfig | null
  setConfig: Setter<QuizConfig | null>
}

const Config = (props: OrderListProps) => {
  const [orders, setOrders] = createSignal<Order[]>([])
  const [tags, setTags] = createSignal<Tag[]>([])
  const [displayConf, setDisplayConf] =
    createSignal<boolean>(false)
  return (
    <div class="container">
      <div class="header">
        <div>
          <h3>Configuration</h3>
          <p>
            (ordre
            {props.config &&
            props.config.orders &&
            props.config.orders.length > 0
              ? 's'
              : ''}{' '}
            :{' '}
            {props.config &&
            props.config.orders &&
            props.config.orders.length > 0
              ? props.config &&
                props.config.orders &&
                props.config.orders.length
              : 0}
            ) (étiquette
            {props.config &&
            props.config.tags &&
            props.config.tags.length > 0
              ? 's'
              : ''}{' '}
            :{' '}
            {props.config &&
            props.config.tags &&
            props.config.tags.length > 0
              ? props.config &&
                props.config.tags &&
                props.config.tags.length
              : 0}
            )
          </p>
        </div>
        <Button
          onClick={() => setDisplayConf(!displayConf())}
        >
          {displayConf() ? 'Cacher' : 'Afficher'}
        </Button>
        <Button
          hidden={!displayConf()}
          onClick={() => {
            props.setConfig({
              orders: orders() ?? [],
              tags: tags() ?? [],
            })
            setDisplayConf(false)
          }}
        >
          Confirmer
        </Button>
        <Button
          hidden={!displayConf()}
          onClick={() => {
            setOrders([])
            props.setConfig({ orders: [] })
          }}
        >
          Réinitialiser
        </Button>
      </div>
      {displayConf() && (
        <div>
          <div class="list">
            <For
              each={props.orders?.sort((a, b) =>
                a.name.localeCompare(b.name)
              )}
            >
              {(order) => (
                <div
                  class="selectable-item"
                  style={{
                    'background-color': orders()?.includes(
                      order
                    )
                      ? 'var(--color-secondary)'
                      : 'var(--color-primary)',
                  }}
                  onClick={() => {
                    if (!orders()?.includes(order)) {
                      setOrders([
                        ...(orders() ?? []),
                        order,
                      ])
                    } else {
                      setOrders(
                        orders()?.filter(
                          (o) => o.id !== order.id
                        ) ?? []
                      )
                    }
                  }}
                >
                  {order.name}
                </div>
              )}
            </For>
            <div
              class="selectable-item"
              onClick={() => {
                setOrders(props.orders ?? [])
              }}
            >
              TOUS
            </div>
          </div>
          <hr />
          <div class="list">
            <For
              each={props.tags?.sort((a, b) =>
                a.name.localeCompare(b.name)
              )}
            >
              {(tag) => (
                <div
                  class="selectable-item"
                  style={{
                    'background-color': tags()?.includes(
                      tag
                    )
                      ? 'var(--color-secondary)'
                      : 'var(--color-primary)',
                  }}
                  onClick={() => {
                    if (!tags()?.includes(tag)) {
                      setTags([...(tags() ?? []), tag])
                    } else {
                      setTags(
                        tags()?.filter(
                          (o) => o.id !== tag.id
                        ) ?? []
                      )
                    }
                  }}
                >
                  {tag.name.toUpperCase()}
                </div>
              )}
            </For>
          </div>
        </div>
      )}
    </div>
  )
}

export default Config
