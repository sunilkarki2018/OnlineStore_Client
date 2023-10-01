import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";

import useAppSelector from "../app/hooks/useAppSelector";
import { AppState } from "../app/store/store";
import useAppDispatch from "../app/hooks/useAppDispatch";
import ProductSearch from "../features/products/ProductSearch";
import { fetchAllProductsAsync } from "../features/products/productReducer";
import { ProductCardList } from "../features/products/ProductCardList";
import { fetchAllCategoriesAsync } from "../features/category/categoryReducer";
import CategorySearch from "../features/category/CategorySearch";
import ProductSort from "../features/products/ProductSort";

function isNotNullOrEmpty(value: string) {
  // Check if the value is not null and not an empty string
  return value !== null && value !== "";
}
function isNotNullOrZero(value: number | null) {
  return value !== null && value !== 0 ? true : false;
}

export const HomePage = () => {
  const { productsList, listLoading } = useAppSelector(
    (state: AppState) => state.product
  );

  const [filteredProducts, setFilteredProducts] = useState(productsList);

  const [searchText, setSearchText] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
    dispatch(fetchAllProductsAsync());
  }, []);

  const executeSearchandSort = () => {
    let filteredResult;
    if (isNotNullOrEmpty(searchText) && isNotNullOrZero(categoryId)) {
      filteredResult = productsList.filter(
        (product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase()) &&
          product.category.id === categoryId
      );
    } else if (isNotNullOrEmpty(searchText)) {
      filteredResult = productsList.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (isNotNullOrZero(categoryId)) {
      filteredResult = productsList.filter(
        (product) => product.category.id === categoryId
      );
    } else {
      filteredResult = productsList;
    }
    if (sortOrder === "asc") {
      const sortedResult = [...filteredResult].sort(
        (a, b) => a.price - b.price
      );
      setFilteredProducts(sortedResult);
    } else if (sortOrder === "desc") {
      const sortedResult = [...filteredResult].sort(
        (a, b) => b.price - a.price
      );
      setFilteredProducts(sortedResult);
    } else {
      setFilteredProducts(filteredResult);
    }
  };

  useEffect(() => {
    executeSearchandSort();
  }, [searchText, categoryId, sortOrder]);

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
    setSearchText(searchKey);
  };

  const handleCategorySearch = (searchCategoryId: number) => {
    setCategoryId(searchCategoryId);
  };

  const sortHandler = (sortOrder: string) => {
    console.log("sortOrder:", sortOrder);
    setSortOrder(sortOrder);
  };

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch onSearch={handleSearch} />
          </Paper>
          <Paper sx={{ mb: 2 }}>
            <CategorySearch onCategorySearch={handleCategorySearch} />
          </Paper>
          <Paper sx={{ mb: 2 }}>
            <ProductSort onSort={sortHandler} />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ProductCardList products={filteredProducts} />
        </Grid>
      </Grid>
    </>
  );
};
