import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import { CreateUserInput } from "../../types/User/CreateUserInput";
import useAppDispatch from "../../hooks/useAppDispatch";
import ErrorMessage from "../errors/ErrorMessage";
import uploadFile from "../../utils/uploadFile";
import { createUserAsync } from "../../redux/reducers/userReducer";

export default function Register() {
  const [image, setImage] = useState<File[]>([]);
  const { error } = useAppSelector((state: AppState) => state.user);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUserInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(Array.from(event.target.files));
    }
  };

  if (error) return <ErrorMessage message={error} />;

  const handleFormSubmit = async (data: CreateUserInput) => {
    try {
      data.avatar =
        image.length === 0
          ? "https://i.imgur.com/nZnWUc0.jpeg"
          : await uploadFile(image[0]);
      //dispatch(createUserAsync(data));
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error while adding user");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: "FirstName is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="FirstName"
                variant="outlined"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: "LastName is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="LastName"
                variant="outlined"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <InputLabel htmlFor="images">Select Image</InputLabel>
          <Controller
            name="avatar"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input type="file" onChange={handleFileChange} />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
