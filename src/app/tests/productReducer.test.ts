/*
let store = createStore();

beforeEach(() => {
  store = createStore();
});

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
*/
describe("Test normal actions in productReducers", () => {
  test("Test if 2 is greater than 5", () => {
    expect(2).toBeGreaterThan(1);
  });
});
