import { rest } from "msw";
import { setupServer } from "msw/node";
import { productsData } from "../../data/productsData";

export const handlers = [
  /*
  rest.get('https://api.escuelajs.co/api/v1/products', (req, res, ctx) => {
    console.log('res',res);
    console.log('req',req);
        return res(ctx.json('John Smith'))
    }),
    */
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsData));
  }),

  // Define a request handler for DELETE /api/products/:id
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    (req, res, ctx) => {
      const { id } = req.params;
      const productIndex = productsData.findIndex(
        (product) => product.id === Number(id)
      );
      if (productIndex !== -1) {
        productsData.splice(productIndex, 1);
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),

  /*  rest.delete(
    `https://api.escuelajs.co/api/v1/products/:id`,
    async (req, res, ctx) => {
      console.log("catch the request", req.params);
      const { id } = req.params;
      if (productsData.find((p) => p.id == Number(id))) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ), */

  /*  rest.post("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    const data = req.bodyUsed;
  }), */
];

const server = setupServer(...handlers);

export default server;
