import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import { HomePage } from "../../pages/HomePage";
import { ContactPage } from "../../pages/ContactPage";
import CartList from "../../features/cart/CartList";
import Login from "../../features/users/Login";
import Register from "../../features/users/Register";
import ProductView from "../../features/products/ProductView";
import ProductTableList from "../../features/products/ProductTableList";
import CreateProductForm from "../../features/products/CreateProductForm";
import EditProductForm from "../../features/products/EditProductForm";
import Checkout from "../../features/cart/Checkout";
import ProfilePage from "../../pages/ProfilePage";
import { UserPage } from "../../pages/UserPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "product/:id", element: <ProductView /> },
      { path: "product", element: <ProductTableList /> },
      { path: "productCreate", element: <CreateProductForm /> },
      { path: "productEdit/:id", element: <EditProductForm /> },
      { path: "cartList", element: <CartList /> },
      { path: "checkout", element: <Checkout /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "users", element: <UserPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
