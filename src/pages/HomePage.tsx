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
import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { productsList, listLoading } = useAppSelector(
    (state: AppState) => state.product
  );
  const { cartItems, loading } = useAppSelector(
    (state: AppState) => state.cart
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
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
      <Button component={Link} to={`/cartList`} size="small">
          View
        </Button>
    </>
  );
};
