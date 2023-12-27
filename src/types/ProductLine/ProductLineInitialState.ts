import { ProductLine } from "./ProductLine";

export interface ProductLineInitialState {
  productLinesList: ProductLine[];
  productLineSingle: ProductLine | null;
  status?: string;
  error?: string | null;
  listLoading: boolean;
  singleLoading: boolean;
}
