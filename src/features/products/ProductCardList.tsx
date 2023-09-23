import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "./productReducer";

interface Props {
  products: Product[];
}

export const ProductCardList = ({ products }: Props) => {
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
