import { generateFlex, buildFlexContent } from "../utils/flex";
import { Client } from "@line/bot-sdk";
import { FlexMessage } from "@line/bot-sdk/lib/types";
import { flexUrlTemplate } from "../types/flexTemplate";

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
  const flexQuery: flexUrlTemplate = {
    title: "I am title",
    place: "@10-4",
    time: "10:30~11:00",
    url: `https://liff.line.me/${process.env.CONCAT_ID}/?template=1`,
    description: "description",
    activity: "活動",
  };
  const flex: FlexMessage = buildFlexContent(
    "測試數據",
    generateFlex(flexQuery)
  );

  // create a echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, flex);
}

export { handleEvent };
