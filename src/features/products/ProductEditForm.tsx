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
import { ProductFormData } from "./ProductCreateForm";
import {
  Product,
  fetchProductAsync,
  updateProductAsync,
} from "../../app/redux/reducers/productReducer";

const EditProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductAsync(id!)).then((productData) => {
      const item = productData.payload as Product;
      setValue("title", item.title);
      setValue("price", item.price);
      setValue("description", item.description);
      setValue("categoryId", item.category.id.toString());
      setValue("imageUrl", item.images.join(","));
    });
  }, [dispatch, id, setValue]);

  const handleFormSubmit = (data: ProductFormData) => {
    data.images = data.imageUrl.split(",");
    try {
      if (id) {
        dispatch(updateProductAsync({ id, data }));
        toast.success("Product updated successfully");
        navigate("/product");
      }
    } catch (error) {
      toast.error("Error updating product");
      console.log("Error:", error);
    }
  };

  const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ];

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            variant="outlined"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        defaultValue={0}
        rules={{ required: "Price is required", pattern: /^\d+(\.\d{1,2})?$/ }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Price"
            variant="outlined"
            fullWidth
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        )}
      />
      <Controller
        name="description"
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
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />
      <Controller
        name="categoryId"
        control={control}
        defaultValue=""
        rules={{ required: "Category is required" }}
        render={({ field }) => (
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select label="Category" {...field} error={!!errors.categoryId}>
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
        name="imageUrl"
        control={control}
        defaultValue=""
        rules={{ required: "Images are required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Images (comma-separated URLs)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </form>
  );
};

export default EditProductForm;
