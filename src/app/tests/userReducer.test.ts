import { authenticateUserAsync, fetchUsersAsync, loginUserAsync } from "../redux/reducers/userReducer";
import { createStore } from "../redux/store";
import { usersData } from "./data/usersData";
import server, { access_token } from "./shared/userServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Test for User Reducer", () => {
  test("should fetch all users", async () => {
    await store.dispatch(fetchUsersAsync());
    expect(store.getState().user.users.length).toBe(3);
  });
  test("should login user with right credentials", async () => {
    await store.dispatch(loginUserAsync({ email: "john@mail.com", password: "changeme" }));
    expect(store.getState().user.currentUser).toMatchObject(usersData[0]);
  });

  test("should authenticate with right token", async () => {
    await store.dispatch(authenticateUserAsync(access_token+"_2"));
    expect(store.getState().user.currentUser).toMatchObject(usersData[1]);
  });

});
