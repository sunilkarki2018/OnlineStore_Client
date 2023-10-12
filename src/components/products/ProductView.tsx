import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import useAppDispatch from "../../hooks/useAppDispatch";
import { isStringNotNullOrEmpty } from "../../utils/common";
import { fetchProductAsync } from "../../redux/reducers/productReducer";
import ErrorMessage from "../errors/ErrorMessage";
import { addToCart } from "../../redux/reducers/cartReducer";


export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { singleLoading, productsSingle, error } = useAppSelector(
    (state: AppState) => state.product
  );
  const { cartItems } = useAppSelector((state: AppState) => state.cart);
  const stock = cartItems.find((item) => item.id === Number(id))?.quantity;
  const dispatch = useAppDispatch();

  const handleAddToCartClick = () => {
    const debounceDelay = 500;
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    if (!isStringNotNullOrEmpty(inputValue)) {
      toast.error("Please enter valid number between 1 to 5");
      setIsLoading(false);
      return;
    }
    if (isStringNotNullOrEmpty(inputValue)) {
      if (
        isNaN(Number(inputValue)) ||
        Number(inputValue) < 1 ||
        Number(inputValue) > 5
      ) {
        toast.error("Please enter valid number between 1 to 5");
        setIsLoading(false);
        return;
      }
    }
    dispatch(
      addToCart({
        id: productsSingle!.id,
        title: productsSingle!.title,
        price: productsSingle!.price,
        quantity: Number(inputValue),
      })
    );
    setInputValue("");
    setTimeout(() => setIsLoading(false), debounceDelay);
  };

  useEffect(() => {
    dispatch(fetchProductAsync(Number(id!)));
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
  if (error) return <ErrorMessage message={error} />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Carousel>
          {productsSingle?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${productsSingle?.title} Image ${index + 1}`}
              style={{ width: "80%", height: "80%" }}
            />
          ))}
        </Carousel>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">Product Detail</Typography>
        <Divider sx={{ mb: 2 }} />
        <TableContainer component={Paper} style={{ margin: "20px 0" }}>
          <Table>
            <TableBody sx={{ fontSize: "1.1em" }}>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{productsSingle?.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>{productsSingle?.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{productsSingle?.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Enter quantity"
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={handleAddToCartClick}
              sx={{ height: "52px" }}
              fullWidth
            >
              {isLoading ? "Loading..." : stock && stock > 0 ? "Update" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
