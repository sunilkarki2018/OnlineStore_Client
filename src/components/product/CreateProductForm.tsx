import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import { fetchAllCategoriesAsync } from "../../redux/reducers/categoryReducer";
import AccessDenied from "../errors/AccessDenied";
import {
  createProductLineAsync,
  fetchAllProductLinesAsync,
} from "../../redux/reducers/productLineReducer";
import { CreateProductInput } from "../../types/Product/CreateProductInput";
import { fetchAllProductSizesAsync } from "../../redux/reducers/productSizeReducer";
import { createProductAsync } from "../../redux/reducers/productReducer";

export default function CreateProductForm(): JSX.Element {
  const navigate = useNavigate();
  const validationSchema = yup
    .object({
      inventory: yup.number().required("Inventory is is required"),
      productLineId: yup.string().required("Product Line is required"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state: AppState) => state.user);
  const { productLinesList } = useAppSelector(
    (state: AppState) => state.productLine
  );
  const { productSizes } = useAppSelector(
    (state: AppState) => state.productSize
  );
  
  const handleFormSubmit = async (data: CreateProductInput) => {
    const formData = new FormData();
    formData.append("inventory", data.inventory.toString());
    formData.append("productLineId", data.productLineId);
    if (data.productSizeId)
      formData.append("productSizeId", data.productSizeId);

    const result = await dispatch(createProductAsync(data));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Product added successfully");
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while adding Product");
    }
    navigate("/product");
  };
  const { categories } = useAppSelector((state: AppState) => state.category);

  useEffect(() => {
    dispatch(fetchAllProductLinesAsync());
    dispatch(fetchAllProductSizesAsync());
  }, []);

  if (currentUser && currentUser?.role.includes("Customer")) {
    return <AccessDenied />;
  }

  if (!currentUser) {
    navigate("/login");
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Add Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="inventory"
          control={control}
          rules={{
            required: "Inventory is required",
            pattern: /^\d+(\.\d{1,2})?$/,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Inventory"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.inventory}
              helperText={errors.inventory?.message}
            />
          )}
        />

        <Controller
          name="productLineId"
          control={control}
          rules={{ required: "productLine is required" }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>ProductLine</InputLabel>
              <Select
                label="ProductLine"
                {...field}
                error={!!errors.productLineId}
              >
                {productLinesList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="productSizeId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>ProductSize</InputLabel>
              <Select
                label="productSizeId"
                {...field}
                error={!!errors.productSizeId}
              >
                {productSizes.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "20px", width: "20%" }}
        >
          Submit
        </Button>
        <Button
          component={Link}
          to={`/product`}
          size="small"
          variant="contained"
          color="primary"
          style={{ margin: "20px", width: "20%" }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
