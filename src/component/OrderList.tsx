import { createSignal, For, Setter } from "solid-js";
import { OrderModel } from "../../generated/prisma/models/Order";
import { QuizConfig } from "~/routes/quiz";
import "./OrderList.sass";
import Button from "./Button";

interface OrderListProps {
  orders?: OrderModel[];
  config: QuizConfig | null;
  setConfig: Setter<QuizConfig | null>;
}

const OrderList = (props: OrderListProps) => {
  const [orders, setOrders] = createSignal<OrderModel[]>([]);
  const [displayConf, setDisplayConf] = createSignal<boolean>(false);
  return (
    <div class="container">
      <div class="header">
        <h3>Configuration</h3>
        <Button onClick={() => setDisplayConf(!displayConf())}>
          {displayConf() ? "Cacher" : "Afficher"}
        </Button>
        <Button onClick={() => props.setConfig({ orders: orders() ?? [] })}>
          Confirmer
        </Button>
        <Button
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
