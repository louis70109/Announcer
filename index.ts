if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const line = require("@line/bot-sdk");
import { MiddlewareConfig } from "@line/bot-sdk/lib/types";
import { handleEvent } from "./src/index";
import { Request } from "@line/bot-sdk/dist/middleware";
import { generateFlex } from "./utils/flex";

const { CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN, CONCAT_ID, PORT } = process.env;
const port = Number(PORT) || 5000;
const config: MiddlewareConfig = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN || "",
  channelSecret: CHANNEL_SECRET || "",
};

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/views");

app.get("/notify", (req: any, res: any) => {
  if (req.query["liff.state"]) {
    res.render("redirect", {
      liffId: CONCAT_ID,
    });
  }

  res.render("index", {
    fragments: req.query,
    liffId: CONCAT_ID,
  });
});

app.get("/liff/share", (req: any, res: any) => {
  const flex = {
    type: "flex",
    altText: "活動通知",
    contents: generateFlex(true),
  };
  res.render("share", {
    liffId: CONCAT_ID,
    flex: JSON.stringify(flex),
  });
});

app.post(
  "/webhooks/line",
  line.middleware(config),
  (req: Request, res: any) => {
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
