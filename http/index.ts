import { Router, Application, createHttpError, helpers } from "../deps/http.ts";
import { Park } from "../domain/park.ts";

export const initiateHttp = async (initialPark: Park) => {
  let park = initialPark;
  setInterval(() => {
    park = park.passTime();
  }, 6000);
  const router = new Router();

  router
    .get("/", (context) => {
      context.response.body = {
        ...park,
        gameOver: park.gameOver,
      };
    })
    .post("/feed", (context) => {
      try {
        park = park.feed(Number(helpers.getQuery(context)?.dinosaur));
      } catch (e) {
        context.response.status = 500;
        context.response.body = e.message;
      }
    });

  const app = new Application();
  // Error management
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      throw createHttpError(500, err.message);
    }
  });
  app.use(router.routes());
  app.use(router.allowedMethods());

  const port = 8000;
  console.log("Serving the HTTP API on port", port);
  await app.listen({ port: 8000 });
};
