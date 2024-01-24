import { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import useAppDispatch from "../../hooks/useAppDispatch";
import ErrorMessage from "../errors/ErrorMessage";
import {
  deleteOrderAsync,
  fetchAllOrdersAsync,
} from "../../redux/reducers/orderReducer";

export default function OrderList() {
  const { orders, error, listLoading } = useAppSelector(
    (state: AppState) => state.order
  );
  const { currentUser } = useAppSelector((state: AppState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, []);

  const navigate = useNavigate();
  if (listLoading)
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

  const handleDelete = async (id: string) => {

    const result = await dispatch(deleteOrderAsync(id));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Order deleted successfully");
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while deleting Order");
    }
    navigate("/orderList");
  };

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Order List
        </Typography>
        <Paper elevation={3} style={{ marginTop: "20px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>OrderNumber</TableCell>
                  <TableCell>OrderStatus</TableCell>
                  {currentUser?.role.includes("Admin") && (
                    <>
                      <TableCell>Delete</TableCell>
                      <TableCell>View</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order.user.firstName + " " + order.user.lastName}
                    </TableCell>
                    <TableCell>{order.user.email}</TableCell>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => {
                          console.log("from button", order);
                          handleDelete(order.id);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {currentUser?.role.includes("Admin") && (
                        <Button
                          component={Link}
                          to={`/orderItemsList/${order.id}`}
                          size="small"
                          disabled={!currentUser?.role.includes("Admin")}
                        >
                          <EditIcon />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}
