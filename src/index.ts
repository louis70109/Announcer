import { generateFlex, buildFlexContent } from "../utils/flex";
import { Client } from "@line/bot-sdk";
import { FlexMessage } from "@line/bot-sdk/lib/types";

// create LINE SDK config from env variables
const client = new Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET || "",
});

function handleEvent(event: any) {
  if (event.source.userId === "Udeadbeefdeadbeefdeadbeefdeadbeef") return; // webhook verify

  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const flex: FlexMessage = buildFlexContent(
    "測試數據",
    generateFlex("title", "@10-2", "10:00~12:00", "http://123.com", "asdsadsad")
  );

  // create a echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, flex);
}

export { handleEvent };
