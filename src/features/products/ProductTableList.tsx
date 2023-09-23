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
import { Link } from "react-router-dom";
import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/store/store";
import { useEffect } from "react";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import { fetchAllProductsAsync } from "./productReducer";

export default function ProductTableList() {
  const { productsList, listLoading } = useAppSelector(
    (state: AppState) => state.product
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

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
  //onClick={handleAddProduct}
  return (
    <>
      <Container>
        <Button
          component={Link}
          to={`/productCreate`}
          variant="contained"
          color="primary"
          style={{ marginBottom: "40px" }}
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
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
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
                        component={Link}
                        to={`/brewery/${product.id}`}
                        size="small"
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/brewery/${product.id}`}
                        size="small"
                      >
                        Edit
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
