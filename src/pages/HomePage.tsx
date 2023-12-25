import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { ProductCardList } from "../components/products/ProductCardList";
import CategorySearch from "../components/category/CategorySearch";
import ProductSort from "../components/products/ProductSort";
import useAppSelector from "../hooks/useAppSelector";
import { AppState } from "../redux/store";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchAllCategoriesAsync } from "../redux/reducers/categoryReducer";
//import { executeSearchandSort } from "../utils/getFilteredAndSort";
import ErrorMessage from "../components/errors/ErrorMessage";
import ProductSearch from "../components/products/ProductSearch";
import { fetchAllProductLinesAsync } from "../redux/reducers/productLineReducer";

const itemsPerPage = 20;

export function HomePage() {
  const { productLinesList, listLoading, error } = useAppSelector(
    (state: AppState) => state.productLine
  );
  const [searchText, setSearchText] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState("");

  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductLinesAsync());
    dispatch(fetchAllCategoriesAsync());
  }, []);

  /*
  const filteredResult = executeSearchandSort(
    productsList,
    searchText,
    categoryId,
    sortOrder
  );
  */

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

  if (error) return <ErrorMessage message={error} />;

  const handleSearch = (searchKey: string) => {
    setSearchText(searchKey);
  };

  const handleCategorySearch = (searchCategoryId: number) => {
    setCategoryId(searchCategoryId);
  };

  const sortHandler = (sortOrder: string) => {
    setSortOrder(sortOrder);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  /*
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredResult.slice(startIndex, endIndex);
  */

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3} style={{ position: "fixed" }}>
          <Typography variant="h6" gutterBottom>
            Filter
          </Typography>
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
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          {productLinesList.length > 0 && (
            <ProductCardList productLines={productLinesList} />
          )}
        </Grid>
        <Grid item xs={3}></Grid>
        {/*
           <Grid item xs={6} style={{ marginTop: "20px" }}>
           <Stack spacing={2} justifyContent="center">
             <Pagination
               count={Math.ceil(filteredResult.length / itemsPerPage)}
               page={page}
               onChange={handleChange}
             />
           </Stack>
         </Grid>
       */}
      </Grid>
    </>
  );
}
