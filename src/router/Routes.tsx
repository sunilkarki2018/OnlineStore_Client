import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";
import ProductCard from "../features/products/ProductCard";
import ProductView from "../features/products/ProductView";
import CartList from "../features/cart/CartList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {path: 'product', element: <HomePage />},
      {path: 'product/:id', element: <ProductView />},
      { path: "cartList", element: <CartList /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);
