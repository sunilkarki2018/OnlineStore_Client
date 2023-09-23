import React, { useEffect, useState } from "react";
import { ProductCardList } from "../features/products/ProductCardList";
import axios from "axios";
import useAppSelector from "../app/hooks/useAppSelector";
import { AppState } from "../app/store/store";
import useAppDispatch from "../app/hooks/useAppDispatch";
import { fetchAllProductsAsync } from "../features/products/productReducer";
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
      <ProductCardList products={productsList} />
      <Button component={Link} to={`/cartList`} size="small">
          View
        </Button>
    </>
  );
};
