import express from "express";
const app = express();
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/../views"); // production env

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  app.set("views", __dirname + "/views");
}
import { middleware, FlexMessage } from "@line/bot-sdk";
import { handleEvent } from "./src/index";
import { Request, Response } from "express/index";
import { generateFlex, buildFlexContent } from "./utils/flex";
import { MiddlewareConfig } from "@line/bot-sdk/lib/types";
import { flexUrlTemplate } from "./types/flexTemplate";

const { CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN, CONCAT_ID, PORT } = process.env;
const lineConfig: MiddlewareConfig = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN || "",
  channelSecret: CHANNEL_SECRET || "",
};
const port: number = Number(PORT) || 5000;

app.get("/notify", (req: Request, res: Response) => {
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

app.get("/liff/template", (req: Request, res: Response) => {
  res.render("template", { liffId: CONCAT_ID });
});

app.get("/liff/share", (req: Request, res: Response) => {
  const query: any = req.query;
  const flexQuery: flexUrlTemplate = {
    title: query.title,
    place: query.place,
    time: query.time,
    url: query.url,
    description: query.desc,
  };
  const flex: FlexMessage = buildFlexContent(
    query.title,
    generateFlex(flexQuery, true)
  );

  res.render("share", {
    liffId: CONCAT_ID,
    flex: JSON.stringify(flex),
  });
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
