import React from "react";
import { Product } from "../../types/Product";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid key={product.id} item xs={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
