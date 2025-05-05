import type { ICategory } from './ICategory';
import type { IPhoto } from './IPhoto';

export interface IToys {
  id: number | null;
  name: string;
  description: string;
  shortDescription: string;
  specifications: string[];
  price: number;
  categoryId: ICategory;
  photos: IPhoto[];
}
