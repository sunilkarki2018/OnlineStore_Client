import { CreateProductLineInput } from "./CreateProductLineInput";

export interface UpdateProductLineInput {
  update: Partial<CreateProductLineInput>;
  id: string;
}
