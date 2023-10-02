import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import apis from "../../app/apis/urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import { createProductAsync } from "../../app/redux/reducers/productReducer";
import { fetchAllCategoriesAsync } from "../../app/redux/reducers/categoryReducer";
import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/redux/store";
import { CreateProductInput } from "../../app/types/Product/CreateProductInput";

/* export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  imageUrl: string;
  images: string[];
} */

const ProductCreateForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>();

  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: CreateProductInput) => {
    console.log("FormData:", data);
    data.images = ["https://i.imgur.com/O1LUkwy.jpeg"];
    //data.images = data.imageUrl.split(",");

    try {
      dispatch(createProductAsync(data));
      toast.success("Product added successfully");
      navigate("/product");
    } catch (error) {
      toast.error("Error while adding product");
      console.log("Error:", error);
    }
    console.log(data);
  };
  const { categories } = useAppSelector((state: AppState) => state.category);
  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, []);

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
        rules={{ required: "Category is required" }}
        render={({ field }) => (
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select label="Category" {...field} error={!!errors.categoryId}>
              {categories.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="images"
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
            error={!!errors.images}
            helperText={errors.images?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ProductCreateForm;
