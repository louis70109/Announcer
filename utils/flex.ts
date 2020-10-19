import { FlexMessage } from '@line/bot-sdk/lib/types';
import { gaScreenView } from './common';
import { flexUrlTemplate, staffList, Card } from '../types/flexTemplate';
import { FlexBubble } from '@line/bot-sdk';

function buildFlexContent(altText: string, contents: any): FlexMessage {
  return {
    type: 'flex',
    altText,
    contents,
  };
}

function generateFlex(query: flexUrlTemplate): FlexBubble {
  let footerContents: any = [],
    footer: any = {},
    hero: any = {};
  if (query.imageUrl) {
    hero = {
      hero: {
        type: 'image',
        url: query.imageUrl,
        size: 'full',
        aspectRatio: '16:9',
        aspectMode: 'cover',
      },
    };
  }

  if (query.url) {
    footerContents.push({
      type: 'button',
      style: 'primary',
      height: 'sm',
      action: {
        type: 'uri',
        label: '連結',
        uri: query.url,
      },
    });
  }

  if (footerContents.length) {
    footer = {
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: footerContents,
        flex: 0,
      },
    };
  }
  return {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      width: '1px',
      height: '1px',
      paddingAll: '0px',
      contents: [
        {
          type: 'image',
          url: gaScreenView(query.title),
          aspectRatio: '1:1',
          size: 'full',
          aspectMode: 'cover',
        },
      ],
    },
    ...(hero ? hero : undefined),
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: query.activity,
          weight: 'bold',
          wrap: true,
          color: '#1DB446',
          size: 'sm',
        },
        {
          type: 'text',
          text: query.title,
          weight: 'bold',
          size: 'xl',
          wrap: true,
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '地點',
                  color: '#aaaaaa',
                  size: 'sm',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: query.place,
                  wrap: true,
                  color: '#666666',
                  size: 'sm',
                  flex: 5,
                },
              ],
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '時間',
                  color: '#aaaaaa',
                  size: 'sm',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: query.time,
                  wrap: true,
                  color: '#666666',
                  size: 'sm',
                  flex: 5,
                },
              ],
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '描述',
                  color: '#aaaaaa',
                  size: 'sm',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: query.description,
                  wrap: true,
                  color: '#666666',
                  size: 'sm',
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

function activitySchedule(query: staffList): FlexBubble {
  let people: any = [],
    footerContents: any = [],
    footer: any = {};

  //Hard fix
  if (
    query.people &&
    query.people[0].name !== '' &&
    query.people[0].time !== ''
  ) {
    people = [
      {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'text',
            text: '名單',
            size: 'sm',
            color: '#555555',
            flex: 0,
          },
        ],
      },
    ];

    query.people.map((el) => {
      if (!el.name && !el.time) return;
      people.push({
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'text',
            text: el.name,
            size: 'sm',
            color: '#555555',
            flex: 0,
          },
          {
            type: 'text',
            text: el.time,
            size: 'sm',
            color: '#111111',
            align: 'end',
          },
        ],
      });
    });
  }
  if (query.url) {
    // Avoid uri got multi-value
    footerContents.push({
      type: 'button',
      style: 'primary',
      height: 'sm',
      action: {
        type: 'uri',
        label: '參考連結',
        uri: query.url,
      },
    });
  }
  if (query.map) {
    footerContents.push({
      type: 'button',
      action: {
        type: 'uri',
        label: '地圖',
        uri: query.map,
      },
    });
  }
  if (footerContents.length) {
    footer = {
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: footerContents,
        flex: 0,
      },
    };
  }

  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: query.activity,
          weight: 'bold',
          color: '#1DB446',
          size: 'sm',
        },
        {
          type: 'text',
          text: query.title,
          weight: 'bold',
          size: 'xxl',
          margin: 'md',
          wrap: true,
        },
        {
          type: 'text',
          text: query.place,
          size: 'xs',
          color: '#aaaaaa',
          wrap: true,
        },
        {
          type: 'separator',
          margin: 'xxl',
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'xxl',
          spacing: 'sm',
          contents: [...(people ? people : undefined)],
        },
      ],
    },
    ...(footer ? footer : undefined),
  };
}

function personalCard(person: Card): FlexBubble {
  const avatar =
      'https://stickershop.line-scdn.net/stickershop/v1/sticker/52002734/iPhone/sticker_key@2x.png',
    back =
      'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg',
    url = 'https://google.com';
  return {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: back
            ? back
            : 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip11.jpg',
          size: 'full',
          aspectRatio: '20:13',
          aspectMode: 'cover',
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'filler',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'follow',
                  gravity: 'center',
                  flex: 1,
                  align: 'center',
                  color: '#008f00',
                },
              ],
              height: '30px',
              borderColor: '#008f00',
              borderWidth: 'light',
              cornerRadius: '20px',
            },
          ],
          paddingAll: '5px',
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: avatar
                        ? avatar
                        : 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
                      aspectMode: 'cover',
                      size: 'full',
                    },
                  ],
                  cornerRadius: '100px',
                },
              ],
              paddingAll: '3px',
              backgroundColor: '#ffffff',
              cornerRadius: '100px',
              width: '30%',
            },
            {
              type: 'filler',
            },
          ],
          position: 'absolute',
          offsetEnd: '0px',
          offsetBottom: '0px',
          offsetStart: '0px',
          paddingStart: '10px',
        },
      ],
      paddingAll: '0px',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: person.title,
          size: 'lg',
          weight: 'bold',
        },
        {
          type: 'text',
          text: person.description,
          wrap: true,
          size: 'md',
        },
      ],
      paddingTop: '23px',
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'View Details',
              action: {
                type: 'uri',
                label: 'action',
                uri: url,
              },
              color: '#42659a',
              flex: 1,
              gravity: 'center',
            },
          ],
          height: '30px',
        },
      ],
      paddingAll: '13px',
    },
    styles: {
      footer: {
        separator: true,
      },
    },
  };
}

export { buildFlexContent, generateFlex, activitySchedule, personalCard };
