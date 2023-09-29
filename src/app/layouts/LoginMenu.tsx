import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { AppState } from "../store/store";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { logout } from "../../features/users/userReducer";
import { clearCartItems } from "../../features/cart/cartReducer";

export default function LoginMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { isAdmin, loggedIn } = useAppSelector((state: AppState) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button color="inherit" onClick={handleClick}>
        Welcome
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
            dispatch(clearCartItems());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
