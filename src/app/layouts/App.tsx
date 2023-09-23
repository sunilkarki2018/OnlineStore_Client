import React from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>       
      <ToastContainer />     
    </>
  );
};

export default App;
