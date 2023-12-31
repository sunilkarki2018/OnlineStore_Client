import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import useAppDispatch from "../../hooks/useAppDispatch";
import AccessDenied from "../errors/AccessDenied";
import ErrorMessage from "../errors/ErrorMessage";
import {
  fetchProductLineAsync,
  updateProductLineAsync,
} from "../../redux/reducers/productLineReducer";
import { ProductLine } from "../../types/ProductLine/ProductLine";
import { UpdateProductLineInput } from "../../types/ProductLine/UpdateProductLineInput";
import { fetchAllCategoriesAsync } from "../../redux/reducers/categoryReducer";

export default function EditProductForm(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProductLineInput>();
  const { categories } = useAppSelector((state: AppState) => state.category);
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state: AppState) => state.user);
  const { error } = useAppSelector((state: AppState) => state.productLine);

  useEffect(() => {
    dispatch(fetchProductLineAsync(id!)).then((productData) => {
      console.log("Test Id:", id);
      console.log("Test ProductLine:", productData);
      if (productData.meta.requestStatus === "fulfilled") {
        const item = productData.payload as ProductLine;
        setValue("title", item.title);
        setValue("price", item.price);
        setValue("description", item.description);
        setValue("categoryId", item.categoryId);
        //setValue("update.images", item.images);
        //setImageUrls(item.images);
        setValue("id", item.id);
      }
    });
  }, [dispatch, id, setValue]);

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, []);

  if (currentUser && currentUser?.role.includes("Customer")) {
    return <AccessDenied />;
  }
  if (!currentUser) {
    navigate("/login");
  }

  const handleFormSubmit = async (data: UpdateProductLineInput) => {
  
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    console.log("after submit:", data);
    const result = await dispatch(updateProductLineAsync(formData));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Product Line updated successfully");
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while updating Product Line");
    }
    navigate("/productLine");
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
          name="title"
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
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />

        <Controller
          name="price"
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
              margin="normal"
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
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                {...field}
                error={!!errors.categoryId}
                value={field.value || ""}
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        {/*
<InputLabel htmlFor="images">Select Multiple Files</InputLabel>
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            style={{ width: "100px", height: "100px", margin: "10px" }}
          />
        ))}
        <Controller
          name="images"
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
        

*/}


<InputLabel htmlFor="images">Select Images</InputLabel>
        <Controller
          name="images"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <>
              <input
                type="file"
                multiple
                style={{ margin: "20px 0 0 0", width: "100%" }}
                onChange={handleFileChange}
              />
            </>
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
          to={`/productLine`}
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
