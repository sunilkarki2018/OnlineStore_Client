import { rest } from "msw";
import { setupServer } from "msw/node";
import { productsData } from "../data/productsData";
import { CreateProductInput } from "../../types/Product/CreateProductInput";
import { categoriesData } from "../data/catagoriesData";
import { Product } from "../../types/Product/Product";
import { UpdateProductInput } from "../../types/Product/UpdateProductInput";

export const handlers = [

  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsData));
  }),

  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    (req, res, ctx) => {
      const { id } = req.params;
      const productIndex = productsData.findIndex(
        (product) => product.id === Number(id)
      );
      if (productIndex !== -1) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),

  rest.post(
    "https://api.escuelajs.co/api/v1/products/",
    async (req, res, ctx) => {
      const input: CreateProductInput = await req.json();
      const category = categoriesData.find((c) => c.id === input.categoryId);
      if (category) {
        const newProduct: Product = {
          id: productsData.length + 1,
          images: input.images,
          title: input.title,
          description: input.description,
          category,
          price: input.price,
          creationAt: "",
          updatedAt: "",
        };
        return res(ctx.json(newProduct));
      } else {
        ctx.status(400);
        ctx.json({
          message: [
            "price must be a positive number",
            "images must contain at least 1 elements",
            "each value in images must be a URL address",
            "images must be an array",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),

  rest.put(
    "https://api.escuelajs.co/api/v1/products/:id",
    async (req, res, ctx) => {
      const input: UpdateProductInput = await req.json();
      const { id } = req.params;
      const findIndex = productsData.findIndex((i) => i.id === Number(id));
      if (findIndex > -1) {
        return res(
          ctx.json({
            ...productsData[findIndex],
            ...input,
          })
        );
      } else {
        ctx.status(400);
        ctx.json({
          message: [
            "price must be a positive number",
            "images must contain at least 1 elements",
            "each value in images must be a URL address",
            "images must be an array",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),
];

const productServer = setupServer(...handlers);

export default productServer;
