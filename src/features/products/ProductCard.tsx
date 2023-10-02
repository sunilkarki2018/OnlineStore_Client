import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../../app/redux/reducers/productReducer";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import { addToCart } from "../../app/redux/reducers/cartReducer";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();

  const handleAddToCartClick = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      })
    );
  };
  const cardStyle = {
    maxWidth: 345,
    height: "100%",
  };

  const buttonContainerStyle = {
    marginTop: "auto", // Push buttons to the bottom
  };
  return (
    <Card sx={cardStyle}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.images[0]}
        title="green iguana"
      />
      <CardContent sx={{ height: 140 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title} (${product.price})({product.category.name})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={buttonContainerStyle}>
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
