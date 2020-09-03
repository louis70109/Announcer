import { FlexMessage } from "@line/bot-sdk/lib/types";
import { gaScreenView, jsonEscape } from "./common";
import { flexUrlTemplate, staffList } from "../types/flexTemplate";
import { FlexBubble } from "@line/bot-sdk";

export function buildFlexContent(altText: string, contents: any): FlexMessage {
  return {
    type: "flex",
    altText,
    contents,
  };
}
0;
export function generateFlex(
  query: flexUrlTemplate,
  liff: boolean = false
): FlexBubble {
  // if (kwargs) {
  //   // need to append to bubble object
  //   const hero = {
  //     type: "image",
  //     url:
  //       "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
  //     size: "full",
  //     aspectRatio: "20:13",
  //     aspectMode: "cover",
  //     action: {
  //       type: "uri",
  //       uri: "http://linecorp.com/",
  //     },
  //   };
  // }
  let footerContents: any = [],
    footer: any = {};

  if (query.url) {
    // Avoid uri got multi-value
    footerContents.push({
      type: "button",
      style: "primary",
      height: "sm",
      action: {
        type: "uri",
        label: "連結",
        uri: query.url,
      },
    });

    footer = {
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: footerContents,
        flex: 0,
      },
    };
  }

  return {
    type: "bubble",
    header: {
      type: "box",
      layout: "vertical",
      width: "1px",
      height: "1px",
      paddingAll: "0px",
      contents: [
        {
          type: "image",
          url: gaScreenView(query.title),
          aspectRatio: "1:1",
          size: "full",
          aspectMode: "cover",
        },
      ],
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: query.activity,
          weight: "bold",
          wrap: true,
          color: "#1DB446",
          size: "sm",
        },
        {
          type: "text",
          text: query.title,
          weight: "bold",
          size: "xl",
          wrap: true,
        },
        {
          type: "box",
          layout: "vertical",
          margin: "lg",
          spacing: "sm",
          contents: [
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "地點",
                  color: "#aaaaaa",
                  size: "sm",
                  flex: 1,
                },
                {
                  type: "text",
                  text: query.place,
                  wrap: true,
                  color: "#666666",
                  size: "sm",
                  flex: 5,
                },
              ],
            },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "時間",
                  color: "#aaaaaa",
                  size: "sm",
                  flex: 1,
                },
                {
                  type: "text",
                  text: query.time,
                  wrap: true,
                  color: "#666666",
                  size: "sm",
                  flex: 5,
                },
              ],
            },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "描述",
                  color: "#aaaaaa",
                  size: "sm",
                  flex: 1,
                },
                {
                  type: "text",
                  text: liff
                    ? jsonEscape(query.description)
                    : query.description,
                  wrap: true,
                  color: "#666666",
                  size: "sm",
                  flex: 5,
                },
              ],
            },
          ],
        },
      ],
    },
    ...(footer ? footer : undefined),
  };
}

export function activitySchedule(query: staffList): FlexBubble {
  let morning: any = [],
    afternoon: any = [],
    footerContents: any = [],
    footer: any = {};
  if (query.morning) {
    morning = [
      {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            text: "上午場",
            size: "sm",
            color: "#555555",
            flex: 0,
          },
        ],
      },
    ];

    query.morning.map((el) => {
      morning.push({
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            text: el.name,
            size: "sm",
            color: "#555555",
            flex: 0,
          },
          {
            type: "text",
            text: el.time,
            size: "sm",
            color: "#111111",
            align: "end",
          },
        ],
      });
    });
  }
  if (query.afternoon) {
    afternoon = [
      {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            text: "下午場",
            size: "sm",
            color: "#555555",
          },
        ],
      },
    ];

    query.afternoon.map((el) => {
      afternoon.push({
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            text: el.name,
            size: "sm",
            color: "#555555",
            flex: 0,
          },
          {
            type: "text",
            text: el.time,
            size: "sm",
            color: "#111111",
            align: "end",
          },
        ],
      });
    });
  }

  if (query.url) {
    // Avoid uri got multi-value
    footerContents.push({
      type: "button",
      style: "primary",
      height: "sm",
      action: {
        type: "uri",
        label: "參考連結",
        uri: query.url,
      },
    });
    footerContents.push({
      type: "button",
      action: {
        type: "uri",
        label: "地圖",
        uri: query.map,
      },
    });

    footer = {
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: footerContents,
        flex: 0,
      },
    };
  }

  return {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: query.activity,
          weight: "bold",
          color: "#1DB446",
          size: "sm",
        },
        {
          type: "text",
          text: query.title,
          weight: "bold",
          size: "xxl",
          margin: "md",
          wrap: true,
        },
        {
          type: "text",
          text: query.place,
          size: "xs",
          color: "#aaaaaa",
          wrap: true,
        },
        {
          type: "separator",
          margin: "xxl",
        },
        {
          type: "box",
          layout: "vertical",
          margin: "xxl",
          spacing: "sm",
          contents: [
            ...(morning ? morning : undefined),
            {
              type: "separator",
              margin: "xxl",
            },
            ...(afternoon ? afternoon : undefined),
          ],
        },
      ],
    },
    ...(footer ? footer : undefined),
  };
}
