import { buildCarouselContent } from "../utils/common";
import { buildFlexContent, generateFlex } from "../utils/flex";
import { FlexCarousel, FlexMessage } from "@line/bot-sdk/dist/types";
import { flexUrlTemplate } from "../types/flexTemplate";
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
