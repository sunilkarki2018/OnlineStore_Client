import React, { useEffect, useState } from "react";
import axios from "axios";
import useAppSelector from "../app/hooks/useAppSelector";
import { AppState } from "../app/store/store";
import useAppDispatch from "../app/hooks/useAppDispatch";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import ProductSearch from "../features/products/ProductSearch";
import { fetchAllProductsAsync } from "../features/products/productReducer";
import { ProductCardList } from "../features/products/ProductCardList";

export const HomePage = () => {
  const { productsList, listLoading } = useAppSelector(
    (state: AppState) => state.product
  );
  const { cartItems, loading } = useAppSelector(
    (state: AppState) => state.cart
  );

  const [filteredProducts, setFilteredProducts] = useState(productsList);
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

  const handleSearch = (searchKey: string) => {
    const filteredProducts = productsList.filter((product) =>
      product.title.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch onSearch={handleSearch} />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ProductCardList products={filteredProducts} />
        </Grid>
      </Grid>
    </>
  );
};
