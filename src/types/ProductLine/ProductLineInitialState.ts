import { ProductLine } from "./ProductLine";

export interface ProductLineInitialState {
    productLinesList: ProductLine[];
    productLineSingle: ProductLine | null;
    error?: string | null;
    listLoading: boolean;
    singleLoading: boolean;
  }