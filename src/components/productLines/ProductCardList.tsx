import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductLineCard";
import { Product } from "../../types/Product/Product";
import { ProductLine } from "../../types/ProductLine/ProductLine";
import ProductLineCard from "./ProductLineCard";

interface Props {
  productLines: ProductLine[];
}

export const ProductCardList = ({ productLines }: Props) => {
  return (
    <Grid container spacing={4}>
      {productLines.map((productLine) => (
        <Grid
          key={productLine.id}
          item
          xs={4}
          style={{ width: "300px", height: "300px" }}
        >
          <ProductLineCard productLine={productLine} />
        </Grid>
      ))}
    </Grid>
  );
};
