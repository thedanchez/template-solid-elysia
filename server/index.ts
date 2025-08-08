import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import api from "./api";

const ENVIRONMENT = process.env.NODE_ENV ?? "development";

const conditionallyServeProductionAssets = async (app: Elysia) => {
  const indexHTML = Bun.file("dist/index.html");
  const prodIndexHTMLExists = await indexHTML.exists();

  if (ENVIRONMENT !== "production" || !prodIndexHTMLExists) return;

  app
    .use(staticPlugin({ assets: "public", indexHTML: false }))
    .use(
      staticPlugin({
        assets: "dist/assets",
        prefix: "/assets",
        indexHTML: false,
      }),
    )
    .get("/*", () => indexHTML);
};

export const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia BFF",
          version: "1.0.0",
        },
      },
    }),
  )
  .use(api);

await conditionallyServeProductionAssets(app);

app.listen({ port: 8000 });

console.log(`🦊 Elysia is running at ${app.server?.url}`);

export type Server = typeof app;
