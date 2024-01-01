import {
  Box,
  Button,
  Container,
  InputLabel,
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
  const [images, setImages] = useState<File[]>([]);
  const { error } = useAppSelector((state: AppState) => state.user);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUserInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (error) return <ErrorMessage message={error} />;

  const handleFormSubmit = async (data: CreateUserInput) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", images[0]);
    formData.append("houseNumber", data.houseNumber);
    formData.append("street", data.street);
    formData.append("postCode", data.postCode);
    formData.append("city", data.city);
    formData.append("country", data.country);
    console.log("before submit:", formData);
    const result = await dispatch(createUserAsync(formData));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("User added successfully");
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while adding User");
    }
    navigate("/users");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
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
                sx={{ my: 2 }}
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
                sx={{ my: 2 }}
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

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ my: 2 }}
              />
            )}
          />

          <Controller
            name="houseNumber"
            control={control}
            defaultValue=""
            rules={{ required: "HouseNumber is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="HouseNumber"
                variant="outlined"
                fullWidth
                error={!!errors.houseNumber}
                helperText={errors.houseNumber?.message}
                sx={{ my: 2 }}
              />
            )}
          />
          <Controller
            name="street"
            control={control}
            defaultValue=""
            rules={{ required: "Street is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Street"
                variant="outlined"
                fullWidth
                error={!!errors.street}
                helperText={errors.street?.message}
                sx={{ my: 2 }}
              />
            )}
          />
          <Controller
            name="postCode"
            control={control}
            defaultValue=""
            rules={{ required: "PostCode is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="PostCode"
                variant="outlined"
                fullWidth
                error={!!errors.postCode}
                helperText={errors.postCode?.message}
                sx={{ my: 2 }}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                variant="outlined"
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
                sx={{ my: 2 }} 
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            defaultValue=""
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                variant="outlined"
                fullWidth
                error={!!errors.country}
                helperText={errors.country?.message}
                sx={{ my: 2 }} 
              />
            )}
          />

          <InputLabel htmlFor="avatar">Select Avatar</InputLabel>
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
