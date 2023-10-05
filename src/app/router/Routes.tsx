import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import { HomePage } from "../../pages/HomePage";
import { ContactPage } from "../../pages/ContactPage";
import CartList from "../../features/cart/CartList";
import Login from "../../features/users/Login";
import Register from "../../features/users/Register";
import ProductView from "../../features/products/ProductView";
import ProductTableList from "../../features/products/ProductTableList";
import ProductCreateForm from "../../features/products/ProductCreateForm";
import ProductEditForm from "../../features/products/ProductEditForm";
import Checkout from "../../features/cart/Checkout";
import UserList from "../../features/users/UserList";
import ProfilePage from "../../pages/ProfilePage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {path: 'home', element: <HomePage />},
      {path: 'product/:id', element: <ProductView />},
      {path: 'product', element: <ProductTableList />},
      {path: 'productCreate', element: <ProductCreateForm />},
      {path: 'productEdit/:id', element: <ProductEditForm />},
      { path: "cartList", element: <CartList /> },
      { path: "checkout", element: <Checkout /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },  
      { path: "users", element: <UserList /> },  
      { path: "profile", element: <ProfilePage /> },    
    ],
  },
]);
