import { type Component, createResource } from "solid-js";
import "./DataDetail.sass";
import { PhotoWithBird } from "~/lib/shared/types";
import { selectedTaxonId, setSelectedTaxonId } from "~/routes/data";

const DataDetail: Component = () => {
  const fetchPhotosForBirds: () => Promise<PhotoWithBird[]> = async () => {
    const res = await fetch(`api/photos/${selectedTaxonId()}`);
    return res.json();
  };
  const [photosForBird] = createResource(fetchPhotosForBirds);

  return (
    <div class="modal-backdrop" onClick={() => setSelectedTaxonId(null)}>
      <div class="modal" onClick={(e) => e.stopPropagation()}>
        <button class="close" onClick={() => setSelectedTaxonId(null)}>
          x
        </button>

        {photosForBird.loading && <p>Chargement…</p>}

        {photosForBird.error && <p>Erreur de chargement</p>}
        {photosForBird() && <h3>{photosForBird()?.[0].bird.name ?? ""}</h3>}

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
