import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { Product } from "../../types/Product";
import useAppDispatch from "../../hooks/useAppDispatch";
import { addToCart } from "../../redux/cartReducer";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();

  const handleAddToCartClick = () => {
    const test={
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };
    console.log("test: ",test);
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      })
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {product.title}
        </Typography>
        <Typography gutterBottom color="secondary" variant="h5">
          {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleAddToCartClick} size="small">
          Add
        </Button>
        <Button component={Link} to={`/product/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
