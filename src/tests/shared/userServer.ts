import { rest } from "msw";
import { setupServer } from "msw/node";
import { productsData } from "../data/productsData";
import { usersData } from "../data/usersData";
import { UpdateUserInput } from "../../types/User/UpdateUserInput";

export const access_token = "aaa-bbb-ccc";

export const handlers = [
  rest.get("http://localhost:5238/api/v1/users", (req, res, ctx) => {
    return res(ctx.json(usersData));
  }),
  
  rest.post(
    "http://localhost:5238/api/v1/auth/login",
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const foundUser = usersData.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        const token = access_token + "_" + foundUser.id;
        return res(ctx.json({ access_token: token }));
      } else {
        ctx.status(401);
        return res(ctx.text("Cannot authenticate user"));
      }
    }
  ),

  rest.get("http://localhost:5238/api/v1/auth/profile", (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const originalToken = token?.split("_")[0];
    const id = token?.split("_")[1];
    const user = usersData.find((u) => u.id === id);
    if (originalToken === access_token && user) {
      return res(ctx.json(user));
    } else {
      ctx.status(401);
      return res(ctx.text("Cannot return user profile"));
    }
  }),
  rest.put(
    "http://localhost:5238/api/v1/users/:id",
    async (req, res, ctx) => {
      const input: UpdateUserInput = await req.json();
      const { id } = req.params;
      const findIndex = usersData.findIndex((i) => i.id === id);
      if (findIndex > -1) {
        return res(
          ctx.json({
            ...usersData[findIndex],
            ...input,
          })
        );
      } else {
        ctx.status(400);
        ctx.json({
          message: [
            "email must be an email",
            "role must be one of the following values: admin, customer",
            "avatar must be a URL address",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),
    
];

const userServer = setupServer(...handlers);

export default userServer;
