import { Product } from "./Product";

export interface ProductInitialState {
    productsList: Product[];
    productsSingle: Product | null;
    error?: string | null;
    listLoading: boolean;
    singleLoading: boolean;
  }