import { Container, Paper, Typography, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  message?: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <Container component={Paper}>
      <Typography gutterBottom variant="h5">
        Error Details :{message}
      </Typography>
      <Button component={Link} to="/home" fullWidth>
        Go back to the Homepage
      </Button>
    </Container>
  );
}
