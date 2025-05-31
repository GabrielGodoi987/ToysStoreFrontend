import axios, { type AxiosInstance } from 'axios';


declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ baseURL: "http://localhost:8082" });


export { api };
