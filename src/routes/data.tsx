import { createMemo, createResource, createSignal, For } from "solid-js";
import "./data.sass";
import { BirdWithOrdersAndPhotos, PhotoWithBird } from "~/lib/shared/types";
import DataDetail from "~/component/DataDetail";
import { Bird } from "@prisma/client";
import { getBaseUrl } from "~/lib/shared/url";

export default function Data() {
  const baseUrl = getBaseUrl();
  const getAllPhotos: () => Promise<PhotoWithBird[]> = async () => {
    const res = await fetch(`${baseUrl}/api/photos`);
    return res.json();
  };
  const getPhotoCount: () => Promise<number> = async () => {
    const res = await fetch(`${baseUrl}/api/photo/count`);
    return res.json();
  };
  const fetchAllBirds: () => Promise<BirdWithOrdersAndPhotos[]> = async () => {
    const res = await fetch(`${baseUrl}/api/birds`);
    return res.json();
  };

  const [selectedTaxonId, setSelectedTaxonId] = createSignal<number | null>(
    null,
  );

  const [photos] = createResource(getAllPhotos);
  const [photoCount] = createResource(getPhotoCount);
  const [allBirds] = createResource(fetchAllBirds);

  const birdCount = createMemo(() => allBirds()?.length ?? 0);
  const birdsGroupedByFamily = createMemo(() =>
    (allBirds() ?? []).reduce<Record<string, Bird[]>>((families, bird) => {
      if (bird.order) {
        (families[bird.order.name] ??= []).push(bird);
      }
      return families;
    }, {}),
  );

  return (
    <div>
      <h2>Sommaire</h2>
      <ul class="summary">
        <li>
          <a href="#birds">Oiseaux ({birdCount()})</a>
        </li>
        <li>
          <a href="#photos">Photos ({photoCount()})</a>
        </li>
      </ul>
      <hr />
      <h2 id="birds">Oiseaux ({birdCount()})</h2>
      <div class="bird-list">
        {Object.entries(birdsGroupedByFamily())
          .sort((a, b) => a[1].length - b[1].length)
          .map(([order, birds]) => (
            <div class="bird-item">
              <h3>{order}</h3>
              {birds.map((bird) => (
                <div
                  class="data-to-click"
                  onClick={() => {
                    setSelectedTaxonId(bird.id);
                  }}
                >
                  {bird.name}
                </div>
              ))}
            </div>
          ))}
      </div>
      {selectedTaxonId() && (
        <DataDetail
          setSelectedTaxonId={setSelectedTaxonId}
          selectedTaxonId={selectedTaxonId()}
        />
      )}
      <h2 id="photos">Photos ({photoCount()})</h2>
      <div class="gallery">
        <For each={photos()}>
          {(photo) => (
            <div>
              <img src={photo.url} alt="" loading="lazy" />
              <p>{photo.bird.name}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
