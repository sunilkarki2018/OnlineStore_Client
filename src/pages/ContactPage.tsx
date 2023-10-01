import React, { useEffect, useState } from "react";
import { fetchAllCategoriesAsync } from "../features/category/categoryReducer";
import useAppDispatch from "../app/hooks/useAppDispatch";
import useAppSelector from "../app/hooks/useAppSelector";
import { AppState } from "../app/store/store";
import { fetchAllProductsAsync } from "../features/products/productReducer";

export const ContactPage = () => {
  return <div>ContactPage</div>;
};
