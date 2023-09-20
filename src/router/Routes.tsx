import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";
import ProductCard from "../features/products/ProductCard";
import ProductView from "../features/products/ProductView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {path: 'product', element: <HomePage />},
      {path: 'product/:id', element: <ProductView />},
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);
