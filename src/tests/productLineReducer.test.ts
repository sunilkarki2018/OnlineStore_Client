import { fakeStore } from "./fakeStore";
import productLineServer from "./shared/productlineServer";
import {
  deleteProductLineAsync,
  fetchAllProductLinesAsync,
} from "../redux/reducers/productLineReducer";

let store = fakeStore();

beforeAll(() => productLineServer.listen());
beforeEach(() => {
  store = fakeStore();
});

afterEach(() => productLineServer.resetHandlers());

afterAll(() => productLineServer.close());

describe("Test normal actions in productLineReducers", () => {
  test("Should fetch all product lines", async () => {
    await store.dispatch(fetchAllProductLinesAsync());
    expect(store.getState().productLineReducer.productLinesList.length).toBe(3);
  });

  test("Should delete an existing product line", async () => {
    await store.dispatch(
      deleteProductLineAsync("a9bca7dc-b115-4c15-83f3-819a6fc700b4")
    );
    expect(store.getState().productLineReducer.productLinesList.length).toBe(2);
  });
});
