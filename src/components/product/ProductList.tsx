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
  TextField,
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
  deleteProductAsync,
  fetchAllProductsAsync,
} from "../../redux/reducers/productReducer";

export default function ProductList() {
  const { productsList, listLoading, error } = useAppSelector(
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
  if (error) return <ErrorMessage message={error} />;
  console.log("productsList from ProductList", productsList);

  const handleDelete = (id: string) => {
    dispatch(deleteProductAsync(id)).then(() => {
      toast.info("Product deleted successfully");
      dispatch(fetchAllProductsAsync());
    });
  };
  return (
    <>
      <Container>
        {currentUser?.role.includes("Admin") && (
          <Button
            component={Link}
            to={`/productCreate`}
            variant="contained"
            color="primary"
            style={{ marginBottom: "40px" }}
          >
            Add Product
          </Button>
        )}

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
                  <TableCell>Size</TableCell>
                  <TableCell>Inventory</TableCell>
                  {currentUser?.role.includes("Admin") && (
                    <>
                      <TableCell>Delete</TableCell>
                      <TableCell>Update</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {productsList.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.productLine?.title}</TableCell>
                    <TableCell>{product.productLine?.price}</TableCell>
                    <TableCell>{product.productSize?.value}</TableCell>
                    <TableCell>{product.inventory}</TableCell>
                    <TableCell>
                      {currentUser?.role.includes("Admin") && (
                        <Button
                          size="small"
                          onClick={() => handleDelete(product.id)}
                          disabled={!currentUser?.role.includes("Admin")}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {currentUser?.role.includes("Admin") && (
                        <Button
                          component={Link}
                          to={`/productEdit/${product.id}`}
                          size="small"
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
