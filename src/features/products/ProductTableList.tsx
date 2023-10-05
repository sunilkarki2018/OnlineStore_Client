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
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/redux/store";
import { useEffect, useState } from "react";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import {
  deleteProductAsync,
  fetchAllProductsAsync,
} from "../../app/redux/reducers/productReducer";

export default function ProductTableList() {
  const { productsList, listLoading } = useAppSelector(
    (state: AppState) => state.product
  );
  const { currentUser } = useAppSelector((state: AppState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
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

  const handleDelete = (id: number) => {
    dispatch(deleteProductAsync(id)).then(() => {
      toast.info("Product deleted successfully");
      dispatch(fetchAllProductsAsync());
    });
  };

  return (
    <>
      <Container>
        <Button
          component={Link}
          to={`/productCreate`}
          variant="contained"
          color="primary"
          style={{ marginBottom: "40px" }}
          disabled={
            !(
              currentUser?.role.includes("admin") ||
              currentUser?.role.includes("customer")
            )
          }
        >
          Add Product
        </Button>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>
        <Paper elevation={3} style={{ marginTop: "20px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsList.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => handleDelete(product.id)}
                        disabled={!currentUser?.role.includes("admin")}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/productEdit/${product.id}`}
                        size="small"
                        disabled={!currentUser?.role.includes("admin")}
                      >
                        <EditIcon />
                      </Button>
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
