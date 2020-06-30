import { Router, Application, helpers } from "../deps/http.ts";
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
    })
    .post("/euthanize", (context) => {
      try {
        park = park.euthanize(Number(helpers.getQuery(context)?.dinosaur));
      } catch (e) {
        context.response.status = 500;
        context.response.body = e.message;
      }
    })
    .post("/breed", (context) => {
      const dinosaurs = helpers.getQuery(context)?.dinosaurs.split(",").map(
        Number,
      );
      const childName = helpers.getQuery(context)?.name;
      try {
        park = park.breed(dinosaurs[0], dinosaurs[1], childName);
      } catch (e) {
        context.response.status = 500;
        context.response.body = e.message;
      }
    });

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  const port = 8000;
  console.log("Serving the HTTP API on port", port);
  await app.listen({ port: 8000 });
};
