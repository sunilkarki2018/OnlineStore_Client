import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Product = {
  list: () => requests.get("products"),
  details: (id: string) => requests.get(`products/${id}`),
  add: (productData: {}) => requests.post("products", productData),
  update: (id: string, productData: {}) => requests.put(`products/${id}`, productData),
  delete: (id: string) => requests.del(`products/${id}`),
};

const Category = {
  list: () => requests.get("categories"),
};

const apis = {
  Product,
  Category
};

export default apis;
