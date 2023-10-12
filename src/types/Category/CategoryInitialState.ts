import { Category } from "./Category";

export interface CategoryInitialState {
    categories: Category[];
    status: string;
    error?: string;
  }