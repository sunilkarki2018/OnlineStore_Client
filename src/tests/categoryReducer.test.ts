/*
import { fetchAllCategoriesAsync } from "../redux/reducers/categoryReducer";
import { fakeStore } from "./fakeStore";
import categoryServer from "./shared/categoryServer";

let store = fakeStore();

beforeAll(() => categoryServer.listen());
beforeEach(() => {
  store = fakeStore();
});

afterEach(() => categoryServer.resetHandlers());

afterAll(() => categoryServer.close());
describe("Test categoryReducer normal action", () => {
    test("Should fetch all categories", async () => {
        await store.dispatch(fetchAllCategoriesAsync());
        expect(store.getState().categoryReducer.categories.length).toBe(5);
      });
});
*/