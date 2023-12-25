import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1/";

//axios.defaults.baseURL = "http://localhost:5238/api/v1/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  getAuth: (url: string, headerData: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${headerData}`,
        },
      })
      .then(responseBody),
};

const Product = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
  add: (productData: {}) => requests.post("products", productData),
  update: (id: number, productData: {}) =>
    requests.put(`products/${id}`, productData),
  delete: (id: number) => requests.del(`products/${id}`),
};

const Category = {
  list: () => requests.get("categories"),
};

const User = {
  list: () => requests.get("users"),
  details: (id: number) => requests.get(`users/${id}`),
  login: (userData: {}) => requests.post("auth/login", userData),
  profile: (headerData: string) =>
    requests.getAuth("auth/profile", headerData),
  add: (userData: {}) => requests.post("users", userData),
  update: (id: number, userData: {}) => requests.put(`users/${id}`, userData),
  delete: (id: number) => requests.del(`users/${id}`),
};

const apis = {
  Product,
  Category,
  User,
};

export default apis;
