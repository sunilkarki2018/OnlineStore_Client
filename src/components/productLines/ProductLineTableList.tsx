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
  deleteProductLineAsync,
  fetchAllProductLinesAsync,
} from "../../redux/reducers/productLineReducer";

export default function ProductLineTableList() {
  const { productLinesList, listLoading, error } = useAppSelector(
    (state: AppState) => state.productLine
  );
  const { currentUser } = useAppSelector((state: AppState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProductLinesAsync());
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

  const handleDelete = (id: string) => {
    dispatch(deleteProductLineAsync(id)).then(() => {
      toast.info("Product Line deleted successfully");
      dispatch(fetchAllProductLinesAsync());
    });
  };
  return (
    <>
      <Container>
        {currentUser?.role.includes("Admin") && (
          <Button
            component={Link}
            to={`/productLineCreate`}
            variant="contained"
            color="primary"
            style={{ marginBottom: "40px" }}
          >
            Add New
          </Button>
        )}

        <Typography variant="h4" gutterBottom>
          ProductLine List
        </Typography>
        <Paper elevation={3} style={{ marginTop: "20px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  {currentUser?.role.includes("Admin") && (
                    <>
                      <TableCell>Delete</TableCell>
                      <TableCell>Update</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {productLinesList.map((productLine) => (
                  <TableRow key={productLine.id}>
                    <TableCell>{productLine.title}</TableCell>
                    <TableCell>{productLine.price}</TableCell>
                    <TableCell>{productLine.description}</TableCell>
                    <TableCell>
                      {currentUser?.role.includes("Admin") && (
                        <Button
                          size="small"
                          onClick={() => handleDelete(productLine.id)}
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
                          to={`/productLineEdit/${productLine.id}`}
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
