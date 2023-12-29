import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate, useParams } from "react-router-dom";

import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import useAppDispatch from "../../hooks/useAppDispatch";
import { addToCart, removeFromCart } from "../../redux/reducers/cartReducer";
import { CartItem } from "../../types/Cart/CartItem";
import { OrderItem } from "../../types/Order/OrderItem";
import { CreateOrderInput } from "../../types/Order/CreateOrderInput";
import {
  createOrderAsync,
  fetchOrderByIdAsync,
} from "../../redux/reducers/orderReducer";
import { toast } from "react-toastify";
import CartSummary from "../cart/CartSummary";
import { useEffect } from "react";

export default function OrderItemsList() {
  const { order, error, singleLoading } = useAppSelector(
    (state: AppState) => state.order
  );

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrderByIdAsync(id!));
  }, [id]);

  console.log("Order:", order);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell >Title</TableCell>
                  <TableCell >Quantity</TableCell>
                  <TableCell >Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.orderItems.map((o, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell >
                      {o.product?.productLine.title}
                    </TableCell>
                    <TableCell>
                      {o.quantity}
                    </TableCell>
                    <TableCell>{o.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
          component={Link}
          to={`/orderList`}
          size="small"
          variant="contained"
          color="primary"
          style={{ marginLeft: "250px", width: "20%" }}
        >
          Back
        </Button>


        </Grid>
      </Grid>
    </>
  );
}
