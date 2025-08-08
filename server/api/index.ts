import { Elysia } from "elysia";

const api = new Elysia({ prefix: "/api" })
  .get("/", "Hello Elysia")
  .get("/user/:id", ({ params: { id } }) => id)
  .post("/form", ({ body }) => body);

export default api;
