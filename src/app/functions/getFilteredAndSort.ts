import { Product } from "../types/Product/Product";


export const executeSearchandSort = (
  productsList: Product[],
  searchText: string,
  categoryId: number | null,
  sortOrder: string
): Product[] => {
  let filteredResult;
  if (isNotNullOrEmpty(searchText) && isNotNullOrZero(categoryId)) {
    filteredResult = productsList.filter(
      (product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase()) &&
        product.category.id === categoryId
    );
  } else if (isNotNullOrEmpty(searchText)) {
    filteredResult = productsList.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else if (isNotNullOrZero(categoryId)) {
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

function isNotNullOrEmpty(value: string) {
  return value !== null && value !== "";
}
function isNotNullOrZero(value: number | null) {
  return value !== null && value !== 0 ? true : false;
}
