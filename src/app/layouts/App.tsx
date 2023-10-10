import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";

export default function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  );
}
