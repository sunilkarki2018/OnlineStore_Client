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
    expect(store.getState().userReducer.currentUser?.id).toBe(usersData[0].id);
    expect(store.getState().userReducer.currentUser?.firstName).toBe(usersData[0].firstName);
  });  
  test("should update  User", async () => {
    const input: UpdateUserInput = {
      id: "a9bca7dc-b115-4c15-83f3-819a6fc700b4",
      role:"customer",
      update: {
        firstName: "Mark",
        lastName: "Joe",
      },
    };
    const result = await store.dispatch(updateUserAsync(input));
    expect(store.getState().userReducer.users[0].firstName).toBe("Mark");
    expect(store.getState().userReducer.users.length).toBe(3);
  });
 
});
