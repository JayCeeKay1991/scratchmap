import express, { Router } from "express";
import cors from "cors";
import config from "./setup/config";
import router from "./router";

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
