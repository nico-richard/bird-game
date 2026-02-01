import birdsJson from "./birds.json";

export type DataType = "bird" | "mountain";
export interface DataModel<T extends DataType> {
  type: T;
  name: string;
  order: string;
  category: string;
}

export const birds: DataModel<"bird">[] = birdsJson as DataModel<"bird">[];

export interface INaturalistTaxon {
  id: number;
  name: string;
  wikipedia_url: string;
  matched_term: string;
}

export interface INaturalistTaxonData {
  id: number;
  name: string;
  wikipedia_url: string;
  default_photo: string;
  taxon_photos: INaturalistTaxonPhoto[];
}

export interface INaturalistTaxonPhoto {
  taxon_id: number;
  photo: INaturalistPhoto;
}

export interface INaturalistPhoto {
  id: number;
  medium_url: string;
}
