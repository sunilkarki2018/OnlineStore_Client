import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "../layouts/App";
import NotFound from "../components/errors/NotFound";
import { HomePage } from "../pages/HomePage";
import CartList from "../components/cart/CartList";
import Checkout from "../components/cart/Checkout";
import Register from "../components/users/Register";
import { UserPage } from "../pages/UserPage";
import EditUserForm from "../components/users/EditUserForm";
import CreateUserForm from "../components/users/CreateUserForm";
import ProfilePage from "../pages/ProfilePage";
import Login from "../components/users/Login";
import ContactPage from "../pages/ContactPage";
import CreateProductLineForm from "../components/productLines/CreateProductLineForm";
import EditProductLineForm from "../components/productLines/EditProductLineForm";
import ProductLineTableList from "../components/productLines/ProductLineTableList";
import ProductLineView from "../components/productLines/ProductLineView";
import ProductList from "../components/product/ProductList";
import CreateProductForm from "../components/product/CreateProductForm";
import OrderList from "../components/Order/OrderList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "productLines/:id", element: <ProductLineView /> },
      { path: "productLine", element: <ProductLineTableList /> },
      { path: "productLineCreate", element: <CreateProductLineForm /> },
      { path: "productLineEdit/:id", element: <EditProductLineForm /> },
      { path: "product", element: <ProductList /> },
      { path: "orderList", element: <OrderList /> },
      { path: "productCreate", element: <CreateProductForm /> },
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
