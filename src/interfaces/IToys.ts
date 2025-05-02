import type { ICategory } from './ICategory';
import type { IPhoto } from './IPhoto';

export interface IToys {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  specifications: string[];
  price: number;
  category: ICategory;
  photos: IPhoto[];
}
