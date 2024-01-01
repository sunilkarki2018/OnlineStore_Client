export interface CreateProductLineInput {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  images?: string[];
}
