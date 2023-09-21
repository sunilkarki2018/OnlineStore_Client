import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { AppState } from "../redux/store";
import useAppSelector from "../hooks/useAppSelector";
import { ShoppingCart } from "@mui/icons-material";

const mainLinks = [
  { title: "Home", path: "/" },
  { title: "Contact", path: "contact" },
];

export default function Header() {
  const { cartItems, loading } = useAppSelector(
    (state: AppState) => state.cart
  );
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ecommerce
          </Typography>

          <IconButton
            component={Link}
            to="/cartList"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {mainLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
