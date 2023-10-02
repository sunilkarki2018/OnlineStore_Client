import {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductsAsync,
} from "../redux/reducers/productReducer";
import { createStore } from "../redux/store";
import { CreateProductInput } from "../types/Product/CreateProductInput";
import server from "./shared/server";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Test normal actions in productReducers", () => {
  test("Should fetch all products", async () => {
    await store.dispatch(fetchAllProductsAsync());
    expect(store.getState().product.productsList.length).toBe(3);
  });

  test("Should delete an existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(1));
    expect(resultAction.payload).toBe(1);
  });
  test("should create new Product", async () => {
    const input: CreateProductInput = {
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: 1,
      images: ["https://i.imgur.com/O1LUkwy.jpeg"],
    };
    await store.dispatch(createProductAsync(input));
    expect(store.getState().product.productsList.length).toBe(1);
  });
  test("should not create new Product with wrong categoryId", async () => {
    const input: CreateProductInput = {
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: 100,
      images: ["https://i.imgur.com/O1LUkwy.jpeg"],
    };
    await store.dispatch(createProductAsync(input));
    expect(store.getState().product.productsList.length).toBe(0);
  });
});
