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
import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/redux/store";
import { useEffect } from "react";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import { fetchUsersAsync } from "../../app/redux/reducers/userReducer";
import ErrorMessage from "../../app/errors/ErrorMessage";

export default function UserList() {
  const { users, loading,error } = useAppSelector((state: AppState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  const navigate = useNavigate();
  if (loading)
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

  return (
    <>
      <Container>
        <Button
          component={Link}
          to={`/userCreate`}
          variant="contained"
          color="primary"
          style={{ marginBottom: "40px" }}
        >
          Add User
        </Button>
        <Typography variant="h4" gutterBottom>
          Users List
        </Typography>
        <Paper elevation={3} style={{ marginTop: "20px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
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
