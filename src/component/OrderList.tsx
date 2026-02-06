import { createSignal, For, Setter } from "solid-js";
import { QuizConfig } from "~/routes/quiz";
import "./OrderList.sass";
import Button from "./Button";
import { Order } from "@prisma/client";

interface OrderListProps {
  orders?: Order[];
  config: QuizConfig | null;
  setConfig: Setter<QuizConfig | null>;
}

const OrderList = (props: OrderListProps) => {
  const [orders, setOrders] = createSignal<Order[]>([]);
  const [displayConf, setDisplayConf] = createSignal<boolean>(false);
  return (
    <div class="container">
      <div class="header">
        <div>
          <h3>Configuration</h3>
          <p>
            (ordre{props.config && props.config!.orders.length > 0 ? "s" : ""} :{" "}
            {props.config && props.config!.orders.length > 0
              ? props.config && props.config!.orders.length
              : 0}
            )
          </p>
        </div>
        <Button onClick={() => setDisplayConf(!displayConf())}>
          {displayConf() ? "Cacher" : "Afficher"}
        </Button>
        <Button
          hidden={!displayConf()}
          onClick={() => {
            props.setConfig({ orders: orders() ?? [] });
            setDisplayConf(false);
          }}
        >
          Confirmer
        </Button>
        <Button
          hidden={!displayConf()}
          onClick={() => {
            setOrders([]);
            props.setConfig({ orders: [] });
          }}
        >
          Réinitialiser
        </Button>
      </div>
      {displayConf() && (
        <div class="order-list">
          <For
            each={props.orders?.sort((a, b) => a.name.localeCompare(b.name))}
          >
            {(order) => (
              <div
                class="order-item"
                style={{
                  "background-color": orders()?.includes(order)
                    ? "var(--color-secondary)"
                    : "var(--color-primary)",
                }}
                onClick={() => {
                  if (!orders()?.includes(order)) {
                    setOrders([...(orders() ?? []), order]);
                  } else {
                    setOrders(orders()?.filter((o) => o.id !== order.id) ?? []);
                  }
                }}
              >
                {order.name}
              </div>
            )}
          </For>
        </div>
      )}
    </div>
  );
};

export default OrderList;
