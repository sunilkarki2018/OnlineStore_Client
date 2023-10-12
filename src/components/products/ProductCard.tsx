import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Product } from "../../types/Product/Product";
import useAppDispatch from "../../hooks/useAppDispatch";
import { addToCart } from "../../redux/reducers/cartReducer";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCartClick = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const debounceDelay = 500;
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      })
    );
    setTimeout(() => setIsLoading(false), debounceDelay);
  };
  const cardStyle = {
    maxWidth: 345,
    height: "100%",
  };

  return (
    <Card sx={cardStyle}>
      <CardMedia
        sx={{ height: 150 }}
        image={product.images[0]}
        title="green iguana"
      />
      <CardContent sx={{ height: 50 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price:${product.price} / Category:{product.category.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ height: 10 }}>
        <Button onClick={handleAddToCartClick} size="small">
          {isLoading ? "Loading..." : "Add"}
        </Button>
        <Button component={Link} to={`/product/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
