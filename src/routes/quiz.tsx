import { createResource, createSignal } from "solid-js";
import { PhotoWithBird } from "~/lib/shared/types";
import "./quiz.sass";
import Button from "~/app/component/Button";
import ImageShow from "~/app/component/ImageShow";

export default function Quiz() {
  const getRandomPhoto: () => Promise<PhotoWithBird> = async () => {
    const res = await fetch("http://localhost:3000/api/photo/random");
    return res.json();
  };

  const deletePhoto = async () => {
    if (!photo()) return;
    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer la photo de ${photo()?.bird.name} ?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/photo/${photo()?.id}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Échec de la suppression");
      alert("Photo supprimée !");
      refetch();
      setShow(false);
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer la photo");
    }
  };

  const [count, setCount] = createSignal(1);
  const [show, setShow] = createSignal(false);
  const [photo, { refetch }] = createResource(getRandomPhoto);
  return (
    <div class="quiz">
      <Button onClick={() => setCount(1)} color="grey">
        {count()} [Réinitialiser]
      </Button>
      <Button
        onClick={() => {
          refetch();
          setShow(false);
          setCount(count() + 1);
        }}
      >
        Suivant
      </Button>
      <Button onClick={() => setShow(!show())} color="#606c38">
        {show() ? "Cacher" : "Afficher"}
      </Button>
      <ImageShow photo={photo()} />
      {
        <h3
          class="bird-name"
          style={{ filter: show() ? "none" : "blur(10px)" }}
        >
          {photo()?.bird.name}
        </h3>
      }
      <Button hidden={true} onClick={deletePhoto} color="darkred">
        Supprimer
      </Button>
    </div>
  );
}
