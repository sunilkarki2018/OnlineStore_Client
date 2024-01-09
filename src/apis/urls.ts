import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://ecommerce2024v1.azurewebsites.net/api/v1/";

//axios.defaults.baseURL = "http://localhost:5238/api/v1/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postWithToken: (url: string, body: {}, headerData: string) =>
    axios
      .post(url, body, {
        headers: {
          Authorization: `Bearer ${headerData}`,
        },
      })
      .then(responseBody),
  getAuth: (url: string, headerData: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${headerData}`,
        },
      })
      .then(responseBody),
  getWithToken: (url: string, headerData: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${headerData}`,
        },
      })
      .then(responseBody),
  deleteWithToken: (url: string, headerData: string) =>
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${headerData}`,
        },
      })
      .then(responseBody),
  detailWithToken: (url: string, headerData: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${headerData}`,
        },
      })
      .then(responseBody),
  putWithToken: (url: string, body: {}, headerData: string) =>
    axios
      .patch(url, body, {
        headers: {
          Authorization: `Bearer ${headerData}`,
        },
      })
      .then(responseBody),
};

const Product = {
  list: () => requests.get("products"),
  details: (id: string) => requests.get(`products/${id}`),
  add: (productData: {}) => requests.post("products", productData),
  update: (id: string, productData: {}) =>
    requests.put(`products/${id}`, productData),
  delete: (id: string) => requests.del(`products/${id}`),
  listWithToken: (headerData: string) =>
  requests.getWithToken(`products`, headerData),
addWithToken: (productData: {}, headerData: string) =>
  requests.postWithToken(`products`, productData, headerData),
updateWithToken: (id: string,productData: {}, headerData: string) =>
  requests.putWithToken(`products/${id}`, productData, headerData),
deletWithToken: (id: string, headerData: string) =>
  requests.deleteWithToken(`products/${id}`, headerData),
};

const ProductLine = {
  list: () => requests.get("productlines"),
  details: (id: string) => requests.get(`productlines/${id}`),
  add: (productData: {}) => requests.post("productlines", productData),
  update: (id: string, productlineData: {}) =>
    requests.put(`productlines/${id}`, productlineData),
  delete: (id: string) => requests.del(`productlines/${id}`),
  addWithToken: (productlineData: {}, headerData: string) =>
    requests.postWithToken(`productlines`, productlineData, headerData),
  updateWithToken: (id: string,productlineData: {}, headerData: string) =>
    requests.putWithToken(`productlines/${id}`, productlineData, headerData),
  deletWithToken: (id: string, headerData: string) =>
    requests.deleteWithToken(`productlines/${id}`, headerData),
};

const Category = {
  list: () => requests.get("categorys"),
};
const ProductSize = {
  list: () => requests.get("productsizes"),
};

const Order = {
  list: () => requests.get("orders"),
  details: (id: string) => requests.get(`orders/${id}`),
  add: (productData: {}) => requests.post("orders", productData),
  addWithToken: (productData: {}, headerData: string) =>
    requests.postWithToken(`orders`, productData, headerData),
  update: (id: string, productData: {}) =>
    requests.put(`orders/${id}`, productData),
  delete: (id: string) => requests.del(`orders/${id}`),
  listWithToken: (headerData: string) =>
    requests.getWithToken(`orders`, headerData),
  deletWithToken: (id: string, headerData: string) =>
    requests.deleteWithToken(`orders/${id}`, headerData),
  detailsWithToken: (id: string, headerData: string) =>
    requests.detailWithToken(`orders/${id}`, headerData),
};

const User = {
  list: () => requests.get("users"),
  details: (id: string) => requests.get(`users/${id}`),
  login: (userData: {}) => requests.post("auth/login", userData),
  profile: (headerData: string) => requests.getAuth("auth/profile", headerData),
  add: (userData: {}) => requests.post("users", userData),
  update: (id: string, userData: {}) => requests.put(`users/${id}`, userData),
  delete: (id: string) => requests.del(`users/${id}`),
};

const apis = {
  Product,
  Category,
  User,
  Order,
  ProductLine,
  ProductSize
};

export default apis;
