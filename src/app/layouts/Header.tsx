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
import { AppState } from "../store/store";
import useAppSelector from "../hooks/useAppSelector";
import { ShoppingCart } from "@mui/icons-material";

const mainLinks = [
  { title: "Home", path: "home" },
  { title: "Product", path: "product" },
  { title: "Contact", path: "contact" },
];
const rightLinks = [
  { title: "Login", path: "login" },
  { title: "Register", path: "register" },
];

export default function Header() {
  const { cartItems, loading } = useAppSelector(
    (state: AppState) => state.cart
  );
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Ecommerce
            </Typography>
          </Box>
          <List sx={{ display: "flex" }}>
            {mainLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          <Box display="flex" alignItems="center">
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
              {rightLinks.map(({ title, path }) => (
                <ListItem component={NavLink} to={path} key={path}>
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
