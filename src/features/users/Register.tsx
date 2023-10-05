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
import { CreateUserInput } from "../../app/types/User/CreateUserInput";
import { Controller, useForm } from "react-hook-form";
import uploadFile from "../../app/functions/UploadFile";
import { toast } from "react-toastify";
import { useState } from "react";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import { createUserAsync } from "../../app/redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../app/errors/ErrorMessage";
import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/redux/store";

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
      data.avatar = await uploadFile(image[0]);
      dispatch(createUserAsync(data));
      toast.success("User registered successfully");
      navigate("/home");
    } catch (error) {
      toast.error("Error while adding user");
      console.log("Error:", error);
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
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                variant="outlined"
                type="password"
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <InputLabel htmlFor="images">Select Image</InputLabel>
          <Controller
            name="avatar"
            control={control}
            defaultValue=""
            rules={{ required: "Image is required" }}
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
