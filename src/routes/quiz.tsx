import { createResource, createSignal } from "solid-js";
import { PhotoWithBird } from "~/lib/shared/types";
import "./quiz.sass";
import Button from "~/component/Button";
import ImageShow from "~/component/ImageShow";
import OrderList from "~/component/OrderList";
import { Order } from "@prisma/client";
import { getBaseUrl } from "~/lib/shared/url";

export interface QuizConfig {
  orders: Order[];
}

export default function Quiz() {
  const baseUrl = getBaseUrl();
  const getRandomPhotoForOrders: (
    orders: Order[],
  ) => Promise<PhotoWithBird> = async (orders: Order[]) => {
    const orderIds = orders.map((order) => order.id).join(",");
    const res = await fetch(`${baseUrl}/api/photo/random?orders=${orderIds}`);
    return res.json();
  };

  const getOrders: () => Promise<Order[]> = async () => {
    const res = await fetch(`${baseUrl}/api/orders`);
    return res.json();
  };

  const deletePhoto = async () => {
    if (!photo()) return;
    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer la photo de ${photo()?.bird.name} ?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${baseUrl}/api/photo/${photo()?.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Échec de la suppression");
      alert("Photo supprimée !");
      refetch();
      setShow(false);
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer la photo");
    }
  };

  const [count, setCount] = createSignal<number>(1);
  const [config, setConfig] = createSignal<QuizConfig | null>(null);
  const [show, setShow] = createSignal<boolean>(false);

  const [photo, { refetch }] = createResource(
    () => config()?.orders ?? null,
    getRandomPhotoForOrders,
  );
  const [orders] = createResource<Order[]>(getOrders);
  return (
    <>
      <OrderList orders={orders()} setConfig={setConfig} config={config()} />
      <hr />
      {config() && config()!.orders.length > 0 && (
        <div class="quiz">
          <Button onClick={() => setCount(1)} color="grey">
            {count()} [Réinitialiser]
          </Button>
          <Button
            onClick={() => {
              if (!show()) {
                setShow(true);
              } else {
                refetch();
                setShow(false);
              }
              setCount(count() + 1);
            }}
          >
            {show() ? "Suivant" : "Afficher"}
          </Button>
          <ImageShow photo={photo()} />
          {
            <h3
              class="bird-name"
              style={{ filter: show() ? "none" : "blur(20px)" }}
            >
              {photo()?.bird.name}
            </h3>
          }
          <Button hidden={true} onClick={deletePhoto} color="darkred">
            Supprimer
          </Button>
        </div>
      )}
    </>
  );
}
