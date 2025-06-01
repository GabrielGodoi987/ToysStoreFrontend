import type { AxiosInstance } from 'axios';
import { api } from 'src/boot/axios';
import type { ICategory } from 'src/interfaces/ICategory';

export class CategoryService {
  private axiosApi: AxiosInstance;
  private route: string;

  constructor(route: string) {
    this.axiosApi = api;
    this.route = route;
  }

  public async getCategories() {
    try {
      const response = await this.axiosApi.get('/categories');
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  public async getCategoryById(id: number) {
    try {
      const response = await this.axiosApi.get(`/categories/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
  }

  public async createCategory(category: FormData) {
    try {
      const response = await this.axiosApi.post('/categories', category);
      return response;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  public async updateCategory(id: number, category: ICategory) {
    try {
      const response = await this.axiosApi.put(`/categories/${id}`, category);
      return response;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }
  public async deleteCategory(id: number) {
    try {
      const response = await this.axiosApi.delete(`/categories/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
  public async deleteManyCategories(ids: number[]) {
    try {
      const response = await this.axiosApi.delete('/categories', { data: { ids } });
      return response;
    } catch (error) {
      console.error('Error deleting categories:', error);
      throw error;
    }
  }
}
