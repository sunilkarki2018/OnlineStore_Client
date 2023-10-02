import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAppSelector from "../../app/hooks/useAppSelector";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import { AppState } from "../../app/redux/store";
import { fetchProductAsync } from "../../app/redux/reducers/productReducer";
import Carousel from "react-material-ui-carousel";
import { Product } from "../../app/types/Product/Product";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { singleLoading, productsSingle } = useAppSelector(
    (state: AppState) => state.product
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductAsync(id!));
  }, [id]);

  if (singleLoading)
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
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Carousel>
          {productsSingle?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${productsSingle?.title} Image ${index + 1}`}
              style={{ width: "100%" }}
            />
          ))}
        </Carousel>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{productsSingle?.title}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${productsSingle?.price}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody sx={{ fontSize: "1.1em" }}>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{productsSingle?.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{productsSingle?.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
