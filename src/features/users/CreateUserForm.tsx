import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAppDispatch from "../../app/hooks/useAppDispatch";
import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/redux/store";
import uploadFile from "../../app/functions/UploadFile";
import { CreateUserInput } from "../../app/types/User/CreateUserInput";
import { createUserAsync } from "../../app/redux/reducers/userReducer";
import AccessDenied from "../../app/errors/AccessDenied";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
    data.avatar =
      images.length === 0
        ? "https://i.imgur.com/nZnWUc0.jpeg"
        : await uploadFile(images[0]);
    const result = await dispatch(createUserAsync(data));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("User added successfully");
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while adding User");
    }
    navigate("/users");
  };
  if (currentUser && currentUser?.role.includes("customer")) {
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
    { id: "customer", name: "customer" },
    { id: "admin", name: "admin" },
  ];

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
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
        name="role"
        control={control}
        rules={{ required: "Role is required" }}
        render={({ field }) => (
          <FormControl fullWidth variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              {...field}
              error={!!errors?.role}
              value={field.value || ""}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
