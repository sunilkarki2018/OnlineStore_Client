import { AppBar, Box, List, ListItem, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";

const mainLinks = [
  { title: "Home", path: "/" },
  { title: "Contact", path: "contact" },
];

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ecommerce
          </Typography>

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