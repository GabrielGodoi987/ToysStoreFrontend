import type { ICategory } from "./ICategory";

export interface IToys {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ICategory;
  photos: []
}
