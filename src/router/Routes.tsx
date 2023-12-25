import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "../layouts/App";
import NotFound from "../components/errors/NotFound";
import { HomePage } from "../pages/HomePage";
import ProductView from "../components/products/ProductView";
import ProductTableList from "../components/products/ProductTableList";
import CreateProductForm from "../components/products/CreateProductForm";
import CartList from "../components/cart/CartList";
import Checkout from "../components/cart/Checkout";
import Register from "../components/users/Register";
import { UserPage } from "../pages/UserPage";
import EditUserForm from "../components/users/EditUserForm";
import EditProductForm from "../components/products/EditProductForm";
import CreateUserForm from "../components/users/CreateUserForm";
import ProfilePage from "../pages/ProfilePage";
import Login from "../components/users/Login";
import ContactPage from "../pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "productLines/:id", element: <ProductView /> },
      { path: "product", element: <ProductTableList /> },
      { path: "productCreate", element: <CreateProductForm /> },
      { path: "productLineEdit/:id", element: <EditProductForm /> },
      { path: "cartList", element: <CartList /> },
      { path: "checkout", element: <Checkout /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "users", element: <UserPage /> },
      { path: "userCreate", element: <CreateUserForm /> },
      { path: "userEdit/:id", element: <EditUserForm /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "notFound", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/notFound" /> },
    ],
  },
]);
