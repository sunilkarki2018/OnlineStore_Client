import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import { addToCart, removeFromCart } from "../../redux/cartReducer";
import useAppDispatch from "../../hooks/useAppDispatch";

export default function CartList() {
  const { cartItems, loading } = useAppSelector(
    (state: AppState) => state.cart
  );

  const dispatch = useAppDispatch();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      dispatch(
                        removeFromCart({ itemId: item.id, quantityToRemove: 1 })
                      )
                    }
                    color="error"
                  >
                    <RemoveIcon />
                  </Button>
                  {item.quantity}
                  <Button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          quantity: 1,
                        })
                      )
                    }
                    color="error"
                  >
                    <AddIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          itemId: item.id,
                          quantityToRemove: item.quantity,
                        })
                      )
                    }
                    color="error"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
