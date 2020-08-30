import { generateFlex, buildFlexContent } from "../utils/flex";
import { FlexMessage } from "@line/bot-sdk/lib/types";

const line = require("@line/bot-sdk");

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

function handleEvent(event: any) {
  if (event.source.userId === "Udeadbeefdeadbeefdeadbeefdeadbeef") return; // webhook verify

  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const flex: any = buildFlexContent("測試數據", generateFlex());

  // create a echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, flex);
}

export { handleEvent };
