import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";

import useAppDispatch from "../../hooks/useAppDispatch";
import { addToCart } from "../../redux/reducers/cartReducer";
import { ProductLine } from "../../types/ProductLine/ProductLine";
import { Product } from "../../types/Product/Product";

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
        title: product.productLine.title,
        price: product.productLine.price,
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
        //image={product.images[0]}
        image="https://picsum.photos/640/640?r=1389"
        title="green iguana"
      />
      <CardContent sx={{ height: 50 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.productLine.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price:${product.productLine.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ height: 10 }}>
        <Button onClick={handleAddToCartClick} size="small">
          {isLoading ? "Loading..." : "Add"}
        </Button>
        <Button component={Link} to={`/productLines/${product.productLine.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
