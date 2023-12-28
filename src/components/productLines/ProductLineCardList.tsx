import React from "react";
import { Grid } from "@mui/material";
import { ProductLine } from "../../types/ProductLine/ProductLine";
import ProductLineCard from "../product/ProductCard";
import { Product } from "../../types/Product/Product";

interface Props {
  products: Product[];
}

export const ProductLineCardList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid
          key={product.id}
          item
          xs={4}
          style={{ width: "300px", height: "300px" }}
        >
          <ProductLineCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
