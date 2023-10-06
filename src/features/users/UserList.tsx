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
import { Link, useNavigate } from "react-router-dom";
import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/redux/store";
import { useEffect } from "react";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import { authenticateUserAsync, fetchUsersAsync } from "../../app/redux/reducers/userReducer";
import ErrorMessage from "../../app/errors/ErrorMessage";

export default function UserList() {
  const { users, currentUser, loading, error } = useAppSelector(
    (state: AppState) => state.user
  );
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    dispatch(fetchUsersAsync());
    if (token) {
      dispatch(authenticateUserAsync(token));
    }
  }, []);

  const navigate = useNavigate();
  if (!currentUser?.role.includes("admin")) {
    navigate("/login");
    return <div>Access Denied</div>;
  }
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
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/userEdit/${user.id}`}
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
