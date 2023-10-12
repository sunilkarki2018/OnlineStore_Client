import { setupServer } from "msw/lib/node";
import { categoriesData } from "../data/catagoriesData";
import { rest } from "msw";

export const handlers = [
  rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(categoriesData));
  }),
];

const categoryServer = setupServer(...handlers);

export default categoryServer;
