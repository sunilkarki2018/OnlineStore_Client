import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/redux/store";

export default function BasketSummary() {
  const { cartItems, loading } = useAppSelector(
    (state: AppState) => state.cart
  );

  const subtotal = cartItems.reduce(
    (initial, total) => initial + total.price * total.quantity,
    0
  );
  const deliveryFee = 10;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{subtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{deliveryFee}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{subtotal + deliveryFee}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
