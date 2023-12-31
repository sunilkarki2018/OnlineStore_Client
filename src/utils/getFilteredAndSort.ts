import { Product } from "../types/Product/Product";
import { isNumberNotNullOrZero, isStringNotNullOrEmpty } from "./common";

export const executeSearchandSort = (
  productsList: Product[],
  searchText: string,
  categoryId: string,
  productSizeId: string,
  sortOrder: string
): Product[] => {
  let filteredResult = productsList;
  if (isStringNotNullOrEmpty(searchText)) {
    filteredResult = productsList.filter((product) =>
      product.productLine.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (isStringNotNullOrEmpty(categoryId)) {
    filteredResult = filteredResult.filter(
      (product) => product.productLine.categoryId === categoryId
    );
  }
  if (!isStringNotNullOrEmpty(productSizeId)) {
    productSizeId = "M";
  }
  if (isStringNotNullOrEmpty(productSizeId)) {
    filteredResult = filteredResult.filter(
      (product) => product.productSize?.value === productSizeId
    );
  }

  let sortedResult = [];
  if (sortOrder === "asc") {
    sortedResult = [...filteredResult].sort(
      (a, b) => a.productLine.price - b.productLine.price
    );
  } else if (sortOrder === "desc") {
    sortedResult = [...filteredResult].sort(
      (a, b) => b.productLine.price - a.productLine.price
    );
  } else {
    sortedResult = [...filteredResult];
  }
  return sortedResult;
};
