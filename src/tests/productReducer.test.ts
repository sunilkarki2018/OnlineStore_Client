import {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductsAsync,
  fetchProductAsync,
  updateProductAsync,
} from "../redux/reducers/productReducer";
import { CreateProductInput } from "../types/Product/CreateProductInput";
import productServer from "./shared/productServer";
import { fakeStore } from "./fakeStore";
import { UpdateProductInput } from "../types/Product/UpdateProductInput";

let store = fakeStore();

beforeAll(() => productServer.listen());
beforeEach(() => {
  store = fakeStore();
});

afterEach(() => productServer.resetHandlers());

afterAll(() => productServer.close());

describe("Test normal actions in productReducers", () => {
  test("Should fetch all products", async () => {
    await store.dispatch(fetchAllProductsAsync());
    expect(store.getState().productReducer.productsList.length).toBe(3);
  });
  test("Should fetch single product", async () => {
    const data = {
      id: 1,
      title: "yes",
      price: 1212,
      description: "test",
      images: ["https://picsum.photos/640/640?r=2123"],
      creationAt: "2023-09-28T12:04:22.000Z",
      updatedAt: "2023-09-28T12:04:22.000Z",
      category: {
        id: 3,
        name: "Clothe555",
        image: "https://picsum.photos/640/640?r=1389",
        creationAt: "2023-09-27T14:46:55.000Z",
        updatedAt: "2023-09-28T08:09:34.000Z",
      },
    };
    await store.dispatch(fetchProductAsync(1));
    expect(store.getState().productReducer.productsList[0]).toMatchObject(data);
  });
  test("Should delete an existing product", async () => {
    await store.dispatch(deleteProductAsync(1));
    expect(store.getState().productReducer.productsList.length).toBe(2);
  });
  test("should create new Product", async () => {
    const input: CreateProductInput = {
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: 1,
      images: ["https://i.imgur.com/O1LUkwy.jpeg"],
    };
    const result = await store.dispatch(createProductAsync(input));
    expect(store.getState().productReducer.productsList.length).toBe(4);
  });
  test("should not create new Product with wrong categoryId", async () => {
    const input: CreateProductInput = {
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: 1001,
      images: ["https://i.imgur.com/O1LUkwy.jpeg"],
    };
    await store.dispatch(createProductAsync(input));
    expect(store.getState().productReducer.productsList.length).toBe(3);
  });
  test("should update  Product", async () => {
    const input: UpdateProductInput = {
      id: 1,
      update: {
        title: "test product",
        description: "test description",
        price: 100,
        categoryId: 1,
        images: ["https://i.imgur.com/O1LUkwy.jpeg"],
      },
    };
    const result = await store.dispatch(updateProductAsync(input));
    expect(store.getState().productReducer.productsList[0].title).toBe(
      "test product"
    );
    expect(store.getState().productReducer.productsList.length).toBe(3);
  });
});
