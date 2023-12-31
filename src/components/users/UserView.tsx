import React, { useEffect } from "react";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import { User } from "../../types/User/User";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { AppState } from "../../redux/store";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import { fetchUserAsync } from "../../redux/reducers/userReducer";

export default function UserView(): JSX.Element {
  const { id } = useParams();
  const { user } = useAppSelector((state: AppState) => state.user);
   const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/users");
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserAsync(id!));
  }, [id]);

 console.log("User: ",user);
  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
    <Avatar  src={`data:image/jpg;base64,${user?.avatar?.avatarBase64Value}`} alt={`${user?.firstName} ${user?.lastName}`} sx={{ width: 100, height: 100, margin: 'auto' }} />
    <Typography variant="h4" align="center" gutterBottom>
      {`${user?.firstName} ${user?.lastName}`}
    </Typography>
    <Typography variant="body1" align="center" paragraph>
      Email: {user?.email}
    </Typography>
    <Typography variant="body1" align="center" paragraph>
      Role: {user?.role}
    </Typography>
    <Typography variant="body1" align="center" paragraph>
      Address: {`${user?.address?.houseNumber} ${user?.address?.street}, ${user?.address?.postCode} ${user?.address?.city}, ${user?.address?.country}`}
    </Typography>
    <Button variant="outlined" onClick={handleBackButtonClick}   style={{ display: 'block', margin: 'auto', marginTop: '20px' }}>
        Back to List
      </Button>
  </Paper>
  );
}
