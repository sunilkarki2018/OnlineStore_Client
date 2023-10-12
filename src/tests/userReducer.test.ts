import {
  authenticateUserAsync,
  fetchUsersAsync,
  loginUserAsync,
  updateUserAsync,
} from "../redux/reducers/userReducer";
import { UpdateUserInput } from "../types/User/UpdateUserInput";
import { usersData } from "./data/usersData";
import { fakeStore } from "./fakeStore";
import server, { access_token } from "./shared/userServer";

let store = fakeStore();

beforeEach(() => {
  store = fakeStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Test for User Reducer", () => {
  test("should fetch all users", async () => {
    await store.dispatch(fetchUsersAsync());
    expect(store.getState().userReducer.users.length).toBe(3);
  });
  test("should login user with right credentials", async () => {
    await store.dispatch(
      loginUserAsync({ email: "john@mail.com", password: "changeme" })
    );
    expect(store.getState().userReducer.currentUser).toMatchObject(
      usersData[0]
    );
  });
  test("should authenticate with right token", async () => {
    await store.dispatch(authenticateUserAsync(access_token + "_2"));
    expect(store.getState().userReducer.currentUser).toMatchObject(
      usersData[1]
    );
  });
  test("should update  User", async () => {
    const input: UpdateUserInput = {
      id: 1,
      update: {
        name: "test name",
        email: "test email",
      },
    };
    const result = await store.dispatch(updateUserAsync(input));
    expect(store.getState().userReducer.users[0].name).toBe("test name");
    expect(store.getState().userReducer.users.length).toBe(3);
  });
});
