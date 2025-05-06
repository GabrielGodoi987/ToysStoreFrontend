import type { AxiosInstance } from 'axios';
import { api } from 'src/boot/axios';
import type { IToys } from 'src/interfaces/IToys';

export class ToysService {
  private axiosApi: AxiosInstance;
  private path: string;

  constructor(path: string) {
    this.axiosApi = api;
    this.path = path;
  }

  public async getAll() {
    try {
      const response = await this.axiosApi.get(this.path);
      return response;
    } catch (error) {
      console.error('Error fetching all toys:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }
  public async getById(id: number) {
    try {
      const response = await this.axiosApi.get(`${this.path}/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching toy by ID:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }
  public async getByCategoryId(categoryId: number) {
    try {
      const response = await this.axiosApi.get(`${this.path}/category/${categoryId}`);
      return response;
    } catch (error) {
      console.error('Error fetching toys by category ID:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }

  public async createToy(toy: IToys) {
    try {
      const response = await this.axiosApi.post(this.path, toy);
      return response;
    }  catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  public async updateToy(id: number, toy: IToys) {
    try {
      const response = await this.axiosApi.put(`${this.path}/${id}`, toy);
      return response;
    }  catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  public async deleteOneToy(id: number) {
    try {
      const response = await this.axiosApi.delete(`${this.path}/${id}`);
      return response;
    }  catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  public async deleteToys(ids: number[]) {
    try {
      const response = await this.axiosApi.delete(`${this.path}`, { data: { ids } });
      return response;
    }  catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }
}
