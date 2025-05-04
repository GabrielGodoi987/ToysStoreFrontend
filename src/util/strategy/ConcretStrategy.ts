import type { AxiosInstance } from 'axios';
import type { IStrategy } from './IStrategy';
import { api } from 'src/boot/axios';

export class ConcretStrategy<T> implements IStrategy<T> {
  private axiosApi: AxiosInstance;
  private url: string;

  constructor(url: string) {
    this.axiosApi = api;
    this.url = url;
  }

  async update(id: string, data: T): Promise<any> {
    try {
      const response = await this.axiosApi.put<T>(`${this.url}/${id}`, data);
      return response;
    } catch (e) {
      return e;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const response = await this.axiosApi.delete(`${this.url}/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<any> {
    try {
      const response = await this.axiosApi.get<T[]>(this.url);
      return response;
    } catch (e) {
      return e;
    }
  }
  async findOne(id: string): Promise<any> {
    try {
      const response = await this.axiosApi.get<T>(`${this.url}/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }
  async deleteAll(id: number[]): Promise<any> {
    try {
      const response = await this.axiosApi.delete(`${this.url}`, {
        data: { id },
      });
      return response;
    } catch (e) {
      return e;
    }
  }
  async create(): Promise<any> {
    try {
      const response = await this.axiosApi.post<T>(this.url);
      return response;
    } catch (e) {
      return e;
    }
  }
}
