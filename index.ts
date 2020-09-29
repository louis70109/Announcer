import express from "express";
const app = express();
if (process.env.NODE_ENV != "production") require("dotenv").config();
import { middleware } from "@line/bot-sdk";
import { createNotify, handleEvent } from "./src/index";
import { Request, Response } from "express/index";
import { MiddlewareConfig } from "@line/bot-sdk/lib/types";
import { shareController } from "./src/liff/share";
import cors from "cors";
import { FlexResponse } from "./types/flexTemplate";

import "reflect-metadata";
import { createConnection } from "typeorm";
import { LineNotify } from "./types/notify";
import Api from "api";

createConnection()
  .then(async (connection) => {
    console.log("Connection established...");
  })
  .catch((error) => console.log(error));

const {
  CHANNEL_SECRET,
  CHANNEL_ACCESS_TOKEN,
  CONCAT_ID,
  PORT,
  NOTIFY_ID,
  NOTIFY_SECRET,
  NOTIFY_URI,
} = process.env;
const lineConfig: MiddlewareConfig = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN || "",
  channelSecret: CHANNEL_SECRET || "",
};
const port: number = Number(PORT) || 5000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
console.log("CORS setting: ", corsOptions);
app.use(express.json());
app.use(cors(corsOptions));

app.get("/notify/link", (req: Request, res: Response) => {
  let apiInstance = new Api.LinkApi();
  let body = new Api.LinkRequestBody(); // LinkRequestBody | get link
  body.clientId = NOTIFY_ID;
  body.redirectUri = NOTIFY_URI;
  // body.state = ;

  apiInstance.getLink(body, (error, data, response) => {
    if (error) res.json(error);

    res.json(data);
  });
});

app.get("/notify/token", (req: Request, res: Response) => {
  let apiInstance = new Api.CodeApi();
  let body = new Api.CodeRequestBody();
  body.clientId = NOTIFY_ID;
  body.clientSecret = NOTIFY_SECRET;
  body.redirectUri = NOTIFY_URI;
  apiInstance.codeChangeToken(body, (error, data, response) => {
    if (error) res.json(error);
    // save to db
    res.json(data);
  });
});

app.post("/notify", async (req: Request, res: Response) => {
  const query: any = req.body;

  const notify: LineNotify = { line_id: query.line_id, token: query.token };
  const data = await createNotify(notify);

  res.json(data);
});

app.get("/liff", (req: Request, res: Response) => {
  res.json({ liffId: CONCAT_ID });
});
app.get("/liff/share", (req: Request, res: Response) => {
  const data: FlexResponse = shareController(req);
  res.json(data);
});

app.post(
  "/webhooks/line",
  middleware(lineConfig),
  (req: Request, res: Response) => {
    Promise.all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
