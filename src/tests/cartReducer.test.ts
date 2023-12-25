import cartReducer, {
  addToCart,
  clearCartItems,
  removeFromCart,
} from "../redux/reducers/cartReducer";
import { CartInitialState } from "../types/Cart/CartInitialState";
import { CartItem } from "../types/Cart/CartItem";
import { cartData } from "./data/cartData";

describe("Test cartReducer normal action", () => {
  test("Should add new product to cart", () => {
    const cartItem: CartItem = {
      id: "3",
      title: "Test Title",
      price: 10,
      quantity: 1,
    };
    const initialState: CartInitialState = {
      cartItems: cartData,
      loading: false,
      error: null,
    };
    const cart = cartReducer(initialState, addToCart(cartItem));
    expect(cart.cartItems.length).toBe(3);
  });
  test("Should not add but increase quantity based on provided product Id", () => {
    const cartItem: CartItem = {
      id: "2",
      title: "Test Title",
      price: 10,
      quantity: 1,
    };
    const initialState: CartInitialState = {
      cartItems: cartData,
      loading: false,
      error: null,
    };
    const cart = cartReducer(initialState, addToCart(cartItem));
    expect(cart.cartItems.length).toBe(2);
  });
  test("Should remove when quantity is 0", () => {
    const cartItemToBeRemoved = {
      itemId: "1",
      quantityToRemove: 1,
    };
    const initialState: CartInitialState = {
      cartItems: cartData,
      loading: false,
      error: null,
    };
    const cart = cartReducer(initialState, removeFromCart(cartItemToBeRemoved));
    expect(cart.cartItems.length).toBe(1);
  });
  test("Should only decrease product quantity when remainig item quantity is greater than 0", () => {
    const cartItemToBeRemoved = {
      itemId: "2",
      quantityToRemove: 1,
    };
    const initialState: CartInitialState = {
      cartItems: cartData,
      loading: false,
      error: null,
    };
    const cart = cartReducer(initialState, removeFromCart(cartItemToBeRemoved));
    expect(cart.cartItems.length).toBe(2);
  });
  test("Should empty cart", () => {
    const initialState: CartInitialState = {
      cartItems: cartData,
      loading: false,
      error: null,
    };
    const cart = cartReducer(initialState, clearCartItems());
    expect(cart.cartItems.length).toBe(0);
  });
});
