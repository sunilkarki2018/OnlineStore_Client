import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import AccessDenied from "../errors/AccessDenied";
import { fetchAllProductLinesAsync } from "../../redux/reducers/productLineReducer";
import { fetchAllProductSizesAsync } from "../../redux/reducers/productSizeReducer";
import {
  fetchProductAsync,
  updateProductAsync,
} from "../../redux/reducers/productReducer";
import { Product } from "../../types/Product/Product";
import { UpdateProductInput } from "../../types/Product/UpdateProductInput";

export default function EditProductForm(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProductInput>();

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state: AppState) => state.user);
  const { productLinesList } = useAppSelector(
    (state: AppState) => state.productLine
  );
  const { productSizes } = useAppSelector(
    (state: AppState) => state.productSize
  );
  useEffect(() => {
    dispatch(fetchProductAsync(id!)).then((productData) => {
      if (productData.meta.requestStatus === "fulfilled") {
        const item = productData.payload as Product;
        setValue("inventory", item.inventory);
        setValue("productLineId", item.productLineId);
        console.log("productLineId:", item.productLineId);
        setValue("productSizeId", item.productSizeId);
        console.log("productSizeId:", item.productSizeId);
        setValue("id", item.id);
      }
    });
  }, [dispatch, id, setValue]);

  
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

  const handleFormSubmit = async (data: UpdateProductInput) => {
    const result = await dispatch(updateProductAsync(data));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Product updated successfully");
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while updating Product");
    }
    navigate("/product");
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
          name="inventory"
          control={control}
          rules={{
            required: "Inventory is required",
            pattern: /^\d+(\.\d{1,2})?$/,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label={"Inventory"}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.inventory}
              value={field.value || ""}
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
                value={field.value || ""}
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
                value={field.value || ""}
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
