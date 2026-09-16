import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { buildApp } from "../app.ts";

describe("GET /", () => {
  const app = buildApp();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("retorna os intervalos dos produtores a partir do CSV", async () => {
    const response = await app.inject({ method: "GET", url: "/" });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");

    const body = response.json();
    expect(body).toEqual({ min: expect.any(Array), max: expect.any(Array) });

    for (const intervals of [body.min, body.max]) {
      expect(intervals.length).toBeGreaterThan(0);
      for (const item of intervals) {
        expect(item).toEqual({
          producer: expect.any(String),
          previousWin: expect.any(Number),
          followingWin: expect.any(Number),
          interval: expect.any(Number),
        });
        expect(item.interval).toBe(item.followingWin - item.previousWin);
        expect(item.interval).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
