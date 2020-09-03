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
  const staffQuery: staffList = {
    title: "10/10 Title(尚未開放)",
    place: "台北市內湖區瑞光路",
    map:
      "https://www.google.com.tw/maps/search/%E5%8F%B0%E5%8C%97%E8%BB%8A%E7%AB%99/@25.0477223,121.515252,18z/data=!3m1!4b1?hl=zh-TW&authuser=0",
    url: "https://developers.line.biz/en/news/",
    activity: "班表",
    morning: [
      { name: "Moon", time: "10:00~12:00" },
      { name: "Boss", time: "11:00~12:00" },
    ],
    afternoon: [
      { name: "brown", time: "13:00~14:00" },
      { name: "sally", time: "14:00~18:00" },
    ],
  };
  const flex: FlexMessage = buildFlexContent(
    "測試數據",
    buildCarouselContent([
      generateFlex(flexQuery),
      activitySchedule(staffQuery),
    ])
  );
  // create a echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, flex);
}

export { handleEvent };
