import { FlexBox, FlexMessage } from '@line/bot-sdk/lib/types';
import { gaScreenView } from './common';
import { flexUrlTemplate, staffList, Card, Hero } from '../types/flexTemplate';
import { FlexBubble, FlexComponent } from '@line/bot-sdk';

function buildFlexContent(altText: string, contents: any): FlexMessage {
  return {
    type: 'flex',
    altText,
    contents,
  };
}

function generateFlex(query: flexUrlTemplate): FlexBubble {
  let footerContents: FlexComponent[] = [],
    header: any = {};
  if (query.imageUrl) {
    const hero: Hero = {
      type: 'image',
      url: query.imageUrl,
      size: 'full',
      aspectRatio: '16:9',
      aspectMode: 'cover',
    };
    header = { hero };
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
    ...(header ? header : undefined),
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
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: footerContents,
      flex: 0,
    },
  };
}

function activitySchedule(query: staffList): FlexBubble {
  let people: FlexBox[] = [],
    footerContents: FlexComponent[] = [];

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
          contents: people,
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: footerContents,
      flex: 0,
    },
  };
}

function personalCard(person: Card): FlexBubble {
  const back = person.back,
    avatar = person.avatar,
    followUrl = person.followUrl;
  return {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: back,
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
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri: followUrl,
                  },
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
                      url: avatar,
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
          margin: 'xs',
        },
      ],
      paddingTop: '10px',
    },
  };
}

export { buildFlexContent, generateFlex, activitySchedule, personalCard };
