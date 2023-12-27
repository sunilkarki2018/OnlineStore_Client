import { ProductSize } from "../Product/ProductSize";

export interface ProductSizeInitialState {
    productSizes: ProductSize[];
    status: string,
    error?: string
  }