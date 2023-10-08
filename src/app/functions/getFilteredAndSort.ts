import { Product } from "../types/Product/Product";
import {  isNumberNotNullOrZero, isStringNotNullOrEmpty } from "./common";


export const executeSearchandSort = (
  productsList: Product[],
  searchText: string,
  categoryId: number | null,
  sortOrder: string
): Product[] => {
  let filteredResult;
  if (isStringNotNullOrEmpty(searchText) && isNumberNotNullOrZero(categoryId)) {
    filteredResult = productsList.filter(
      (product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase()) &&
        product.category.id === categoryId
    );
  } else if (isStringNotNullOrEmpty(searchText)) {
    filteredResult = productsList.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else if (isNumberNotNullOrZero(categoryId)) {
    filteredResult = productsList.filter(
      (product) => product.category.id === categoryId
    );
  } else {
    filteredResult = productsList;
  }
  let sortedResult;
  if (sortOrder === "asc") {
    sortedResult = [...filteredResult].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    sortedResult = [...filteredResult].sort((a, b) => b.price - a.price);
  } else {
    sortedResult = filteredResult;
  }
  return sortedResult;
};


