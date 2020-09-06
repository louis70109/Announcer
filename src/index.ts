import {
  generateFlex,
  buildFlexContent,
  activitySchedule,
} from "../utils/flex";
import { Client } from "@line/bot-sdk";
import { FlexMessage } from "@line/bot-sdk/lib/types";
import { flexUrlTemplate, staffList } from "../types/flexTemplate";
import { buildCarouselContent } from "../utils/common";

// create LINE SDK config from env variables
const client = new Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET || "",
});
const { CONCAT_ID } = process.env;
async function handleEvent(event: any) {
  if (event.source.userId === "Udeadbeefdeadbeefdeadbeefdeadbeef") return; // webhook verify

  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  const flexQuery: flexUrlTemplate = await {
    title: "I am title",
    place: "@10-4",
    time: "10:30~11:00",
    url: `https://liff.line.me/${CONCAT_ID}/?template=1`,
    imageUrl: "https://i.imgur.com/EI8AuUY.jpg",
    description: "description",
    activity: "活動",
  };
  const staffQuery: staffList = await {
    title: "10/10 Title(尚未開放)",
    place: "台北市內湖區瑞光路",
    map: `https://liff.line.me/${CONCAT_ID}/?template=2`,
    url: `https://liff.line.me/${CONCAT_ID}/?template=2`,
    activity: "參與名單",
    people: [
      { name: "Moon", time: "10:00~12:00" },
      { name: "Boss", time: "11:00~12:00" },
    ],
  };
  const flex: FlexMessage = await buildFlexContent(
    "測試數據",
    buildCarouselContent([
      generateFlex(flexQuery),
      activitySchedule(staffQuery),
    ])
  );
  console.log(`Reply message: ${flex}`);
  return await client.replyMessage(event.replyToken, flex);
}

export { handleEvent };
