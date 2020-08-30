function jsonEscape(str: String): String {
  return str.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}
export function buildFlexContent(altText: String, contents: any) {
  return {
    type: "flex",
    altText,
    contents,
  };
}
export function generateFlex(liff = false) {
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
  const title: String = "Internal Hackathon";
  const place: String = "@10-2";
  const time: String = "13:00~18:00";
  const wikiUrl: String = "https://liff.line.me/1622939248-JYQqZerE";
  const description: String = `sdfdsf
dsfdsfdsf
 dsf
dsfdsf
中文`;

  return {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: title,
          weight: "bold",
          size: "xl",
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
                  text: place,
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
                  text: time,
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
                  text: liff ? jsonEscape(description) : description,
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
    footer: {
      type: "box",
      layout: "vertical",
      spacing: "sm",
      contents: [
        {
          type: "button",
          style: "link",
          height: "sm",
          action: {
            type: "uri",
            label: "WIKI",
            uri: wikiUrl,
          },
        },
        {
          type: "spacer",
          size: "sm",
        },
      ],
      flex: 0,
    },
  };
}
