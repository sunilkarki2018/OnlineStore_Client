import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../../app/types/Product/Product";

interface Props {
  products: Product[];
}

export const ProductCardList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid
          key={product.id}
          item
          xs={4}
          style={{ width: "300px", height: "300px" }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
