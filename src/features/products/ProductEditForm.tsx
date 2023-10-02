import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import apis from "../../app/apis/urls";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import {
  fetchProductAsync,
  updateProductAsync,
} from "../../app/redux/reducers/productReducer";
import { Product } from "../../app/types/Product/Product";
import { UpdateProductInput } from "../../app/types/Product/UpdateProductInput";
import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/redux/store";

const ProductEditForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProductInput>();
  const { categories } = useAppSelector((state: AppState) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductAsync(id!)).then((productData) => {
      const item = productData.payload as Product;
      setValue("update.title", item.title);
      setValue("update.price", item.price);
      setValue("update.description", item.description);
      setValue("update.categoryId", item.category.id);
      setValue("update.images", item.images);
      setValue("id", item.id);
    });
  }, [dispatch, id, setValue]);

  const handleFormSubmit = (data: UpdateProductInput) => {
    dispatch(updateProductAsync(data));
    toast.success("Product updated successfully");
    navigate("/product");
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <Controller
        name="update.title"
        control={control}
        defaultValue=""
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            variant="outlined"
            fullWidth
            error={!!errors.update?.title}
            helperText={errors.update?.title?.message}
          />
        )}
      />
      <Controller
        name="update.price"
        control={control}
        defaultValue={0}
        rules={{ required: "Price is required", pattern: /^\d+(\.\d{1,2})?$/ }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Price"
            variant="outlined"
            fullWidth
            error={!!errors.update?.price}
            helperText={errors.update?.price?.message}
          />
        )}
      />
      <Controller
        name="update.description"
        control={control}
        defaultValue=""
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            error={!!errors.update?.description}
            helperText={errors.update?.description?.message}
          />
        )}
      />
      <Controller
        name="update.categoryId"
        control={control}
        rules={{ required: "Category is required" }}
        render={({ field }) => (
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              {...field}
              error={!!errors.update?.categoryId}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="update.images"
        control={control}
        rules={{ required: "Images are required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Images (comma-separated URLs)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            error={!!errors.update?.images}
            helperText={errors.update?.images?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </form>
  );
};

export default ProductEditForm;