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
import { ShoppingCart } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";

import { AppState } from "../redux/store";
import useAppSelector from "../hooks/useAppSelector";
import LoginMenu from "./LoginMenu";

const mainLinks = [
  { title: "Home", path: "home" },
  { title: "ProductLine", path: "productLine" },
  { title: "Product", path: "product" },
];
const rightLinks = [
  { title: "Login", path: "login" },
  { title: "Register", path: "register" },
];

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Header() {
  const { cartItems } = useAppSelector((state: AppState) => state.cart);
  const { currentUser } = useAppSelector((state: AppState) => state.user);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Online Store
            </Typography>
          </Box>
          <List sx={{ display: "flex" }}>
            {mainLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path}>
                {title.toUpperCase()}
              </ListItem>
            ))}
            {currentUser && (
              <ListItem component={NavLink} to={"/profile"}>
                PROFILE
              </ListItem>
            )}
            {currentUser && currentUser.role?.includes("Admin") && (
              <>
                {" "}
                <ListItem component={NavLink} to={"/users"}>
                  USERS
                </ListItem>
                <ListItem component={NavLink} to={"/orderList"}>
                  Orders
                </ListItem>
              </>
            )}
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
              {currentUser ? (
                <ListItem>
                  <LoginMenu />
                </ListItem>
              ) : (
                <>
                  {rightLinks.map(({ title, path }) => (
                    <ListItem component={NavLink} to={path} key={path}>
                      {title.toUpperCase()}
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
