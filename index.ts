import express from "express";
const app = express();
// app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// app.set("views", __dirname + "/../views"); // production env
app.use(express.static(__dirname + "/views"));
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  // app.set("views", __dirname + "/views");
}
import { middleware } from "@line/bot-sdk";
import { handleEvent } from "./src/index";
import { Request, Response } from "express/index";
import { MiddlewareConfig } from "@line/bot-sdk/lib/types";
import { shareController } from "./src/liff/share";
import cors from "cors";

const {
  CHANNEL_SECRET,
  CHANNEL_ACCESS_TOKEN,
  CONCAT_ID,
  PORT,
  FRONTEND_DOMAIN,
} = process.env;
const lineConfig: MiddlewareConfig = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN || "",
  channelSecret: CHANNEL_SECRET || "",
};
const port: number = Number(PORT) || 5000;
const corsOptions = {
  origin: [FRONTEND_DOMAIN || "*"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};
console.log(corsOptions);

app.use(cors(corsOptions));

app.get("/liff", (req: Request, res: Response) => {
  res.json({ liffId: CONCAT_ID });
});
app.get("/liff/share", (req: Request, res: Response) =>
  shareController(req, res)
);

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
