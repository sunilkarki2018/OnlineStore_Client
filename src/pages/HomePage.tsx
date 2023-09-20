import React, { useEffect, useState } from "react";
import { ProductList } from "../features/products/ProductList";
import axios from "axios";
import useAppSelector from "../hooks/useAppSelector";
import { AppState } from "../redux/store";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchAllProductsAsync } from "../redux/productReducer";
import apis from "../apis/urls";
import { Product } from "../types/Product";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress } from "@mui/material";

export const HomePage = () => {
  const { productsList, listLoading } = useAppSelector(
    (state: AppState) => state.productReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("ProductList: ", productsList);
    dispatch(fetchAllProductsAsync());
  }, []);

  if (listLoading)
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={64} color="secondary" />
      </Box>
    );

  return (
    <>
      <ProductList products={productsList} />
    </>
  );
};
