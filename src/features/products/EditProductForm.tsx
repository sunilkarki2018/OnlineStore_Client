import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import uploadFile from "../../app/functions/UploadFile";
import { Box, Typography } from "@mui/material";
import ErrorMessage from "../../app/errors/ErrorMessage";

export default function EditProductForm(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState<File[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProductInput>();
  const { categories } = useAppSelector((state: AppState) => state.category);
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state: AppState) => state.user);
  const { error } = useAppSelector((state: AppState) => state.product);

  useEffect(() => {
    dispatch(fetchProductAsync(+id!)).then((productData) => {
      if (productData.meta.requestStatus === "fulfilled") {
        const item = productData.payload as Product;
        setValue("update.title", item.title);
        setValue("update.price", item.price);
        setValue("update.description", item.description);
        setValue("update.categoryId", item.category.id);
        setValue("update.images", item.images);
        setValue("id", item.id);
      }
    });
  }, [dispatch, id, setValue]);

  if (!currentUser?.role.includes("admin")) {
    navigate("/login");
    return <div>Access Denied</div>;
  }

  const handleFormSubmit = async (data: UpdateProductInput) => {
    if (images.length) {
      let imageLocations: string[] = new Array(images.length);
      for (let i = 0; i < images.length; i++) {
        imageLocations[i] = await uploadFile(images[i]);
      }
      data.update.images = imageLocations;
    }
    const result = await dispatch(updateProductAsync(data));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Product updated successfully");
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while updating product");
    }
    navigate("/product");
  };

  if (error) return <ErrorMessage message={error} />;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

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
        Edit Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        sx={{ mt: 1 }}
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
              margin="normal"
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
          rules={{
            required: "Price is required",
            pattern: /^\d+(\.\d{1,2})?$/,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price"
              variant="outlined"
              margin="normal"
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
              margin="normal"
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
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                {...field}
                error={!!errors.update?.categoryId}
                value={field.value || ""}
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

        <InputLabel htmlFor="images">Select Multiple Files</InputLabel>
        <Controller
          name="update.images"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              multiple
              style={{ margin: "20px 0", width: "100%" }}
              onChange={handleFileChange}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "20px", width: "20%" }}
        >
          Update
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
