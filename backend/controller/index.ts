import { parseCSV } from "../utils/index.ts";
import fs from "fs";
import type { FastifyReply, FastifyRequest } from "fastify";

const moviesCsv = "./storage/Movielist.csv";

export class Controller {
  async list(_request: FastifyRequest,
        reply: FastifyReply,) {
    try {
      const data = await parseCSV(moviesCsv);

      return reply.status(200).send(data);
    } catch (error) {
      console.error("Error loading the CSV parser:", error);
    }
  }
}
