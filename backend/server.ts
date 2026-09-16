import { buildApp } from "./app.ts";

const app = buildApp();

app.listen({ port: 3000 }, (error) => {
  if (error) {
    app.log.error(error);
    process.exitCode = 1;
  }
});
