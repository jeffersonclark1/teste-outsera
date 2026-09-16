import { type FastifyInstance } from "fastify";
import { Controller } from "../controller/index.ts";

export async function routes(app: FastifyInstance): Promise<void> {
  const controller = new Controller();
  app.get("/", controller.list.bind(controller));
}
