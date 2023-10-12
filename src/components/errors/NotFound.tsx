import { Container, Paper, Typography, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} style={{ height: 110, textAlign: "center" }}>
      <Typography gutterBottom variant={"h4"}>
        Resource your are looking for cannot be found!
      </Typography>
      <Divider />
      <Button component={Link} to="/home" fullWidth>
        Go back to the Homepage
      </Button>
    </Container>
  );
}
