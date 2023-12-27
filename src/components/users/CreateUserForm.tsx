import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CreateUserInput } from "../../types/User/CreateUserInput";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import uploadFile from "../../utils/uploadFile";
import { createUserAsync } from "../../redux/reducers/userReducer";
import AccessDenied from "../errors/AccessDenied";

export default function CreateUserForm(): JSX.Element {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>();

  const [images, setImages] = useState<File[]>([]);
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state: AppState) => state.user);

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
  if (currentUser && currentUser?.role.includes("Customer")) {
    return <AccessDenied />;
  }
  if (!currentUser) {
    navigate("/login");
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };
  let roles = [
    { id: "Customer", name: "Customer" },
    { id: "Admin", name: "Admin" },
  ];

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
          />
        )}
      />

      <Controller
        name="houseNumber"
        control={control}
        defaultValue=""
        rules={{ required: "House Number is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="HouseNumber"
            variant="outlined"
            fullWidth
            error={!!errors.houseNumber}
            helperText={errors.houseNumber?.message}
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

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
