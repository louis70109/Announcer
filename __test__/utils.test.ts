import { buildCarouselContent } from "../utils/common";
import { buildFlexContent, generateFlex, personalCard } from "../utils/flex";
import { FlexCarousel, FlexMessage } from "@line/bot-sdk/dist/types";
import { Card, flexUrlTemplate } from "../types/flexTemplate";
import { FlexBubble } from "@line/bot-sdk/lib/types";
const OLD_ENV = process.env;
beforeEach(() => {
  jest.resetModules(); // most important - it clears the cache
  process.env = { ...OLD_ENV }; // make a copy
});

afterAll(() => {
  process.env = OLD_ENV; // restore old env
});

test("It would build Carousel content", () => {
  let carousel: string = JSON.stringify(
    buildCarouselContent([{ type: "bubble" }])
  );
  const expected: FlexCarousel = {
    type: "carousel",
    contents: [{ type: "bubble" }],
  };
  expect(carousel).toBe(JSON.stringify(expected));
});

test("It would build FlexMessage content", () => {
  let carousel = JSON.stringify(
    buildFlexContent("alt text", { type: "bubble" })
  );
  const expected: FlexMessage = {
    type: "flex",
    altText: "alt text",
    contents: { type: "bubble" },
  };
  expect(carousel).toBe(JSON.stringify(expected));
});

test("", () => {
  process.env.GA = "UA-123456789-0";
  const query: flexUrlTemplate = {
    title: "I am title",
    place: "@10-4",
    time: "10:30~11:00",
    url: "https://liff.line.me/12345-abcdef/?template=1",
    imageUrl: "https://i.imgur.com/EI8AuUY.jpg",
    description: "description",
    activity: "活動",
  };

  const flex: FlexMessage = buildFlexContent("I am title", generateFlex(query));
  const expected: string =
    '{"type":"flex","altText":"I am title","contents":{"type":"bubble","header":{"type":"box","layout":"vertical","width":"1px","height":"1px","paddingAll":"0px","contents":[{"type":"image","url":"https://www.google-analytics.com/collect?an=My%20App&cd=I%20am%20title&cid=Ud6ab0000000000000000000baffb8ac&ds=app&t=screenview&tid=UA-123456789-0&uid=Ud6ab0000000000000000000baffb8ac&ul=zh-tw&v=1","aspectRatio":"1:1","size":"full","aspectMode":"cover"}]},"hero":{"type":"image","url":"https://i.imgur.com/EI8AuUY.jpg","size":"full","aspectRatio":"16:9","aspectMode":"cover"},"body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"活動","weight":"bold","wrap":true,"color":"#1DB446","size":"sm"},{"type":"text","text":"I am title","weight":"bold","size":"xl","wrap":true},{"type":"box","layout":"vertical","margin":"lg","spacing":"sm","contents":[{"type":"box","layout":"baseline","spacing":"sm","contents":[{"type":"text","text":"地點","color":"#aaaaaa","size":"sm","flex":1},{"type":"text","text":"@10-4","wrap":true,"color":"#666666","size":"sm","flex":5}]},{"type":"box","layout":"baseline","spacing":"sm","contents":[{"type":"text","text":"時間","color":"#aaaaaa","size":"sm","flex":1},{"type":"text","text":"10:30~11:00","wrap":true,"color":"#666666","size":"sm","flex":5}]},{"type":"box","layout":"baseline","spacing":"sm","contents":[{"type":"text","text":"描述","color":"#aaaaaa","size":"sm","flex":1},{"type":"text","text":"description","wrap":true,"color":"#666666","size":"sm","flex":5}]}]}]},"footer":{"type":"box","layout":"vertical","spacing":"sm","contents":[{"type":"button","style":"primary","height":"sm","action":{"type":"uri","label":"連結","uri":"https://liff.line.me/12345-abcdef/?template=1"}}],"flex":0}}}';
  expect(expected).toBe(JSON.stringify(flex));
});

test("", () => {
  const person: Card = {
    title: "NiJia(testing)",
    description: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
    url: "https://google.com",
  };
  const flex: FlexBubble = personalCard(person);
  const expected: string =
    '{"type":"bubble","header":{"type":"box","layout":"vertical","contents":[{"type":"image","url":"https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg","size":"full","aspectRatio":"20:13","aspectMode":"cover"},{"type":"box","layout":"horizontal","contents":[{"type":"filler"},{"type":"box","layout":"vertical","contents":[{"type":"text","text":"follow","gravity":"center","flex":1,"align":"center","color":"#008f00"}],"height":"30px","borderColor":"#008f00","borderWidth":"light","cornerRadius":"20px"}],"paddingAll":"5px"},{"type":"box","layout":"horizontal","contents":[{"type":"box","layout":"vertical","contents":[{"type":"box","layout":"vertical","contents":[{"type":"image","url":"https://stickershop.line-scdn.net/stickershop/v1/sticker/52002734/iPhone/sticker_key@2x.png","aspectMode":"cover","size":"full"}],"cornerRadius":"100px"}],"paddingAll":"3px","backgroundColor":"#ffffff","cornerRadius":"100px","width":"30%"},{"type":"filler"}],"position":"absolute","offsetEnd":"0px","offsetBottom":"0px","offsetStart":"0px","paddingStart":"10px"}],"paddingAll":"0px"},"body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"NiJia(testing)","size":"lg","weight":"bold"},{"type":"text","text":"Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ","wrap":true,"size":"md"}],"paddingTop":"23px"},"footer":{"type":"box","layout":"vertical","contents":[{"type":"box","layout":"vertical","contents":[{"type":"text","text":"View Details","action":{"type":"uri","label":"action","uri":"https://google.com"},"color":"#42659a","flex":1,"gravity":"center"}],"height":"30px"}],"paddingAll":"13px"},"styles":{"footer":{"separator":true}}}';

  expect(expected).toBe(JSON.stringify(flex));
});
