import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAppSelector from "../app/hooks/useAppSelector";
import { AppState } from "../app/redux/store";
import { Avatar, Grid } from "@mui/material";

export default function ProfilePage() {
  const { currentUser } = useAppSelector((state: AppState) => state.user);
  return (
    <Grid container>
      <Grid item xs={12} md={4} >
        <Avatar
          alt={currentUser?.name || ""}
          src={currentUser?.avatar || ""}
          sx={{ width: 150, height: 150,marginLeft:10 }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody sx={{ fontSize: "1.1em" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{currentUser?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{currentUser?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>{currentUser?.role}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Grid>
  );
}
