import {
  INaturalistTaxon,
  INaturalistTaxonData,
} from "~/lib/data/birds/birds.data";

export const autocompleteName: (
  name: string,
) => Promise<INaturalistTaxon> = async (name: string) => {
  const autocompleteRes = await fetch(
    `https://api.inaturalist.org/v1/taxa/autocomplete?q=${encodeURIComponent(
      name,
    )}&locale=fr`,
  );

  const autocompleteData = await autocompleteRes.json();
  const taxon: INaturalistTaxon = autocompleteData.results?.[0];

  if (!taxon) throw new Error("No bird found");

  return taxon;
};

export const fetchBirdData: (
  taxonId: number,
) => Promise<INaturalistTaxonData> = async (taxonId: number) => {
  const taxonRes = await fetch(
    `https://api.inaturalist.org/v1/taxa/${taxonId}`,
  );
  const taxonData = await taxonRes.json();
  if (!taxonData) throw new Error("No data found");
  return taxonData.results?.[0];
};
