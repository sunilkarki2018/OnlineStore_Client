import { Container, Paper, Typography } from "@mui/material";
import React from "react";

export default function AccessDenied() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1">
          You do not have permission to access this page.
        </Typography>
      </Paper>
    </Container>
  );
}

