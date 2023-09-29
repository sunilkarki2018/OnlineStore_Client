import {
  deleteProductAsync,
  fetchAllProductsAsync,
} from "../../features/products/productReducer";
import { createStore } from "../store/store";
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
    const resultAction = await store.dispatch(deleteProductAsync(10));
    expect(resultAction.payload).toBe(10);
  });
});
