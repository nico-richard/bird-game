import { createResource, onCleanup, onMount, Setter } from "solid-js";
import "./DataDetail.sass";
import { PhotoWithBird } from "~/lib/shared/types";
import Button from "~/component/Button";

interface DataDetailsProps {
  selectedTaxonId: number | null;
  setSelectedTaxonId: Setter<number | null>;
}

const DataDetail = (props: DataDetailsProps) => {
  const fetchPhotosForBirds: () => Promise<PhotoWithBird[]> = async () => {
    console.log(props.selectedTaxonId);
    const res = await fetch(`/api/photo/${props.selectedTaxonId}`);
    return res.json();
  };
  const [photosForBird] = createResource(fetchPhotosForBirds);
  onMount(() => {
    document.body.style.overflow = "hidden";
  });

  onCleanup(() => {
    document.body.style.overflow = "";
  });

  return (
    <div class="modal-backdrop" onClick={() => props.setSelectedTaxonId(null)}>
      <div class="modal" onClick={(e) => e.stopPropagation()}>
        <div class="header">
          {photosForBird.loading && <p>Chargement…</p>}

          {photosForBird.error && <p>Erreur de chargement</p>}
          {photosForBird() && (
            <h2 class="name">{photosForBird()?.[0].bird.name ?? ""}</h2>
          )}
          <Button
            classes={["close"]}
            onClick={() => props.setSelectedTaxonId(null)}
          >
            Fermer
          </Button>
        </div>

        <div class="bird-photos">
          {photosForBird()?.map((photo: PhotoWithBird) => (
            <img src={photo.url} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataDetail;
