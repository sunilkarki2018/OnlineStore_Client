import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Product } from "../../types/Product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
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
        <Button component={Link} to={`/product/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
