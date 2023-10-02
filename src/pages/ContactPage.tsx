import React, { useEffect, useState } from "react";
import { fetchAllCategoriesAsync } from "../app/redux/reducers/categoryReducer";
import useAppDispatch from "../app/hooks/useAppDispatch";
import useAppSelector from "../app/hooks/useAppSelector";
import { AppState } from "../app/redux/store";
import { fetchAllProductsAsync } from "../app/redux/reducers/productReducer";

export const ContactPage = () => {
  return <div>ContactPage</div>;
};
