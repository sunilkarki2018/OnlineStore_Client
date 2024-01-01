import { rest } from "msw";
import { setupServer } from "msw/node";
import { categoriesData } from "../data/catagoriesData";
import { productLinesData } from "../data/productLinesData";
import { CreateProductLineInput } from "../../types/ProductLine/CreateProductLineInput";
import { ProductLine } from "../../types/ProductLine/ProductLine";
import { UpdateProductLineInput } from "../../types/ProductLine/UpdateProductLineInput";

export const handlers = [

  rest.get("http://localhost:5238/api/v1/productlines", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productLinesData));
  }),

  rest.delete(
    "http://localhost:5238/api/v1/productlines/:id",
    (req, res, ctx) => {
      const { id } = req.params;
      const productIndex = productLinesData.findIndex(
        (productline) => productline.id === id
      );
      if (productIndex !== -1) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),

  rest.post(
    "http://localhost:5238/api/v1/productlines/",
    async (req, res, ctx) => {
      const input: CreateProductLineInput = await req.json();
      const category = categoriesData.find((c) => c.id === input.categoryId);
      if (category) {
        const newProductLine: ProductLine = {
          id: "a9bca7dc-b115-4c15-83f3-819a6fc700b9",
          images: undefined,
          title: input.title,
          description: input.description,
          categoryId:"a9bca7dc-b115-4c15-83f3-819a6fc700b1",
          category,
          price: input.price,
        };
        return res(ctx.json(newProductLine));
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
    "http://localhost:5238/api/v1/productlines/:id",
    async (req, res, ctx) => {
      const input: UpdateProductLineInput = await req.json();
      const { id } = req.params;
      const findIndex = productLinesData.findIndex((i) => i.id === id);
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

const productLineServer = setupServer(...handlers);

export default productLineServer;

