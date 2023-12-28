import { Product } from "../types/Product/Product";
import {  isNumberNotNullOrZero, isStringNotNullOrEmpty } from "./common";

export const executeSearchandSort = (
  productsList: Product[],
  searchText: string,
  categoryId: string ,
  sortOrder: string
): Product[] => {



  let filteredResult;
  if (isStringNotNullOrEmpty(searchText) && isStringNotNullOrEmpty(categoryId)) {
    filteredResult = productsList.filter(
      (product) =>
        product.productLine.title.toLowerCase().includes(searchText.toLowerCase()) &&
        product.productLine.categoryId === categoryId
    );
  } else if (isStringNotNullOrEmpty(searchText)) {
    filteredResult = productsList.filter((product) =>
      product.productLine.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else if (isStringNotNullOrEmpty(categoryId)) {
    filteredResult = productsList.filter(
      (product) => product.category.id === categoryId
    );
  } else {
    filteredResult = productsList;
  }
  let sortedResult;
  if (sortOrder === "asc") {
    sortedResult = [...filteredResult].sort((a, b) => a.productLine.price - b.productLine.price);
  } else if (sortOrder === "desc") {
    sortedResult = [...filteredResult].sort((a, b) => b.productLine.price - a.productLine.price);
  } else {
    sortedResult = [...filteredResult];
  }
  return sortedResult;



};


