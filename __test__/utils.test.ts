import { buildCarouselContent } from '../utils/common'
import { activitySchedule, articleWithTags, buildFlexContent, generateFlex, personalCard } from '../utils/flex'
import { FlexCarousel, FlexMessage } from '@line/bot-sdk/dist/types'
import { Card, flexUrlTemplate, News, staffList } from '../types/flexTemplate'
import { FlexBubble } from '@line/bot-sdk/lib/types'
const OLD_ENV = process.env
beforeEach(() => {
  jest.resetModules() // most important - it clears the cache
  process.env = { ...OLD_ENV,
    GA: 'UA-123456789-0'
  } // make a copy
})

afterAll(() => {
  process.env = OLD_ENV // restore old env
})

function compareTwoDictionary(one: any, two: any) {
  const dictOne = JSON.stringify(one),
    dictTwo = JSON.stringify(two)
  expect(dictOne).toBe(dictTwo)
}

test('It would build Carousel content', () => {
  let carousel: FlexCarousel = buildCarouselContent([{ type: 'bubble' }])

  const expected: FlexCarousel = {
    type: 'carousel',
    contents: [{ type: 'bubble' }],
  }
  compareTwoDictionary(expected, carousel)
})

test('It would build FlexMessage content', () => {
  let carousel: FlexMessage = buildFlexContent('alt text', { type: 'bubble' })

  const expected: FlexMessage = {
    type: 'flex',
    altText: 'alt text',
    contents: { type: 'bubble' },
  }
  compareTwoDictionary(expected, carousel)
})

test('It should be activity flex message(fully params)', () => {
  process.env.GA = 'UA-123456789-0'
  const query: flexUrlTemplate = {
    title: 'I am title',
    place: '@10-4',
    time: '10:30~11:00',
    url: 'https://liff.line.me/12345-abcdef/?template=1',
    imageUrl: 'https://i.imgur.com/EI8AuUY.jpg',
    description: 'description',
    activity: '活動',
  }

  const flex: FlexMessage = buildFlexContent('I am title', generateFlex(query))
  const expected: any = {
    type: 'flex',
    altText: 'I am title',
    contents: {
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
            url: 'https://www.google-analytics.com/collect?an=My%20App&cd=I%20am%20title&cid=Ud6ab0000000000000000000baffb8ac&ds=app&t=screenview&tid=UA-123456789-0&uid=Ud6ab0000000000000000000baffb8ac&ul=zh-tw&v=1',
            aspectRatio: '1:1',
            size: 'full',
            aspectMode: 'cover',
          },
        ],
      },
      hero: {
        type: 'image',
        url: 'https://i.imgur.com/EI8AuUY.jpg',
        size: 'full',
        aspectRatio: '16:9',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '活動',
            weight: 'bold',
            wrap: true,
            color: '#1DB446',
            size: 'sm',
          },
          {
            type: 'text',
            text: 'I am title',
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
                    text: '@10-4',
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
                    text: '10:30~11:00',
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
                    text: 'description',
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
        contents: [
          {
            type: 'button',
            style: 'primary',
            height: 'sm',
            action: {
              type: 'uri',
              label: '連結',
              uri: 'https://liff.line.me/12345-abcdef/?template=1',
            },
          },
        ],
        flex: 0,
      },
    },
  }
  compareTwoDictionary(expected, flex)
})

test('It should be personal card(fully params)', () => {
  const person: Card = {
    title: 'NiJia(testing)',
    description: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
    back: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg',
    followUrl: 'https://developers.line.biz/en/news/',
    avatar: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
  }
  const flex: FlexBubble = personalCard(person)
  const expected: any = {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg',
          size: 'full',
          aspectRatio: '20:13',
          aspectMode: 'cover',
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            { type: 'filler' },
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
                    uri: 'https://developers.line.biz/en/news/',
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
                      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
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
            { type: 'filler' },
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
        { type: 'text', text: 'NiJia(testing)', size: 'lg', weight: 'bold' },
        {
          type: 'text',
          text: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
          wrap: true,
          size: 'md',
          margin: 'xs',
        },
      ],
      paddingTop: '10px',
    },
  }
  compareTwoDictionary(expected, flex)
})

test('It should be fully params activitySchedule function', () => {
  const staffQuery: staffList = {
    title: '10/10 Title',
    place: '台北市內湖區瑞光路',
    map: 'https://liff.line.me/abc12345/?template=2',
    url: 'https://liff.line.me/abcdef123/?template=2',
    activity: '參與名單',
    people: [
      { name: 'Moon', time: '10:00~12:00' },
      { name: 'Boss', time: '11:00~12:00' },
    ],
  }
  const flex: FlexBubble = activitySchedule(staffQuery)
  const expected: any = {
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
          url: 'https://www.google-analytics.com/collect?an=My%20App&cd=10%2F10%20Title&cid=Ud6ab0000000000000000000baffb8ac&ds=app&t=screenview&tid=UA-123456789-0&uid=Ud6ab0000000000000000000baffb8ac&ul=zh-tw&v=1',
          aspectRatio: '1:1',
          size: 'full',
          aspectMode: 'cover',
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '參與名單',
          weight: 'bold',
          color: '#1DB446',
          size: 'sm',
        },
        {
          type: 'text',
          text: '10/10 Title',
          weight: 'bold',
          size: 'xxl',
          margin: 'md',
          wrap: true,
        },
        {
          type: 'text',
          text: '台北市內湖區瑞光路',
          size: 'xs',
          color: '#aaaaaa',
          wrap: true,
        },
        { type: 'separator', margin: 'xxl' },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'xxl',
          spacing: 'sm',
          contents: [
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
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: 'Moon',
                  size: 'sm',
                  color: '#555555',
                  flex: 0,
                },
                {
                  type: 'text',
                  text: '10:00~12:00',
                  size: 'sm',
                  color: '#111111',
                  align: 'end',
                },
              ],
            },
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: 'Boss',
                  size: 'sm',
                  color: '#555555',
                  flex: 0,
                },
                {
                  type: 'text',
                  text: '11:00~12:00',
                  size: 'sm',
                  color: '#111111',
                  align: 'end',
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
      contents: [
        {
          type: 'button',
          style: 'primary',
          height: 'sm',
          action: {
            type: 'uri',
            label: '參考連結',
            uri: 'https://liff.line.me/abcdef123/?template=2',
          },
        },
        {
          type: 'button',
          action: {
            type: 'uri',
            label: '地圖',
            uri: 'https://liff.line.me/abc12345/?template=2',
          },
        },
      ],
      flex: 0,
    },
  }
  compareTwoDictionary(expected, flex)
})

test('It should be activity schedule function but 名單, 參考連結 and 地圖 are empty', () => {
  const staffQuery: staffList = {
    title: '10/10 Title',
    place: '台北市內湖區瑞光路',
    activity: '參與名單',
  }
  const flex: FlexBubble = activitySchedule(staffQuery)
  const expected: any = {
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
          url: 'https://www.google-analytics.com/collect?an=My%20App&cd=10%2F10%20Title&cid=Ud6ab0000000000000000000baffb8ac&ds=app&t=screenview&tid=UA-123456789-0&uid=Ud6ab0000000000000000000baffb8ac&ul=zh-tw&v=1',
          aspectRatio: '1:1',
          size: 'full',
          aspectMode: 'cover',
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '參與名單',
          weight: 'bold',
          color: '#1DB446',
          size: 'sm',
        },
        {
          type: 'text',
          text: '10/10 Title',
          weight: 'bold',
          size: 'xxl',
          margin: 'md',
          wrap: true,
        },
        {
          type: 'text',
          text: '台北市內湖區瑞光路',
          size: 'xs',
          color: '#aaaaaa',
          wrap: true,
        },
        { type: 'separator', margin: 'xxl' },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'xxl',
          spacing: 'sm',
          contents: [],
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [],
      flex: 0,
    },
  }
  compareTwoDictionary(expected, flex)
})

test('It should be two TAGs article flex', () => {
  const newsQuery: News = {
    image: 'https://nijialin.com/images/2021/internal_hack/zoom.jpg',
    date: '2022-01-01',
    description: '外援全部都到齊啦，其他球隊怎麼打',
    link: 'https://github.com/louis70109',
    tag: '#就是想分享',
    targetPicker: 'https://nijialin.com',
  }
  const flex: FlexBubble = articleWithTags(newsQuery)
  const expected: any = {
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
          url: 'https://www.google-analytics.com/collect?an=My%20App&cd=2022-01-01&cid=Ud6ab0000000000000000000baffb8ac&ds=app&t=screenview&tid=UA-123456789-0&uid=Ud6ab0000000000000000000baffb8ac&ul=zh-tw&v=1',
          aspectRatio: '1:1',
          size: 'full',
          aspectMode: 'cover',
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'image', url: 'https://nijialin.com/images/2021/internal_hack/zoom.jpg', size: 'full', aspectMode: 'cover', aspectRatio: '2:3', gravity: 'top' },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            { type: 'box', layout: 'vertical', contents: [{ type: 'text', text: '2022-01-01', size: 'xl', color: '#ffffff', weight: 'bold' }] },
            {
              type: 'box',
              layout: 'baseline',
              contents: [{ type: 'text', text: '外援全部都到齊啦，其他球隊怎麼打', color: '#ebebeb', size: 'sm', flex: 0, wrap: true }],
              spacing: 'lg',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                { type: 'filler' },
                {
                  type: 'box',
                  layout: 'baseline',
                  contents: [{ type: 'filler' }, { type: 'text', text: '連結', color: '#ffffff', flex: 0, offsetTop: '-2px' }, { type: 'filler' }],
                  spacing: 'sm',
                  action: { type: 'uri', label: '連結', uri: 'https://github.com/louis70109' },
                },
                { type: 'filler' },
              ],
              borderWidth: '1px',
              cornerRadius: '4px',
              spacing: 'sm',
              borderColor: '#ffffff',
              margin: 'xxl',
              height: '40px',
            },
          ],
          position: 'absolute',
          offsetBottom: '0px',
          offsetStart: '0px',
          offsetEnd: '0px',
          backgroundColor: '#03303Acc',
          paddingAll: '20px',
          paddingTop: '18px',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [{ type: 'text', text: '#就是想分享', color: '#ffffff', align: 'center', size: 'xs', offsetTop: '3px', wrap: true }],
          position: 'absolute',
          cornerRadius: '20px',
          offsetTop: '18px',
          backgroundColor: '#ff334b',
          offsetStart: '18px',
          height: '25px',
          width: '100px',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [{ type: 'text', text: '＃點我分享', align: 'center', size: 'xs', offsetTop: '3px', wrap: true }],
          position: 'absolute',
          cornerRadius: '20px',
          offsetTop: '18px',
          backgroundColor: '#a6ed8e',
          height: '25px',
          width: '100px',
          offsetEnd: '18px',
          action: { type: 'uri', label: 'action', uri: 'https://nijialin.com' },
        },
      ],
      paddingAll: '0px',
    },
  }
  compareTwoDictionary(expected, flex)
})

test('It should be only one TAG article flex', () => {
  const newsQuery: News = {
    image: 'https://nijialin.com/images/2021/internal_hack/zoom.jpg',
    date: '2022-01-01',
    description: '外援全部都到齊啦，其他球隊怎麼打',
    link: 'https://github.com/louis70109',
    tag: '#就是想分享',
  }
  const flex: FlexBubble = articleWithTags(newsQuery)
  const expected: any = {
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
          url: 'https://www.google-analytics.com/collect?an=My%20App&cd=2022-01-01&cid=Ud6ab0000000000000000000baffb8ac&ds=app&t=screenview&tid=UA-123456789-0&uid=Ud6ab0000000000000000000baffb8ac&ul=zh-tw&v=1',
          aspectRatio: '1:1',
          size: 'full',
          aspectMode: 'cover',
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'image', url: 'https://nijialin.com/images/2021/internal_hack/zoom.jpg', size: 'full', aspectMode: 'cover', aspectRatio: '2:3', gravity: 'top' },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            { type: 'box', layout: 'vertical', contents: [{ type: 'text', text: '2022-01-01', size: 'xl', color: '#ffffff', weight: 'bold' }] },
            {
              type: 'box',
              layout: 'baseline',
              contents: [{ type: 'text', text: '外援全部都到齊啦，其他球隊怎麼打', color: '#ebebeb', size: 'sm', flex: 0, wrap: true }],
              spacing: 'lg',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                { type: 'filler' },
                {
                  type: 'box',
                  layout: 'baseline',
                  contents: [{ type: 'filler' }, { type: 'text', text: '連結', color: '#ffffff', flex: 0, offsetTop: '-2px' }, { type: 'filler' }],
                  spacing: 'sm',
                  action: { type: 'uri', label: '連結', uri: 'https://github.com/louis70109' },
                },
                { type: 'filler' },
              ],
              borderWidth: '1px',
              cornerRadius: '4px',
              spacing: 'sm',
              borderColor: '#ffffff',
              margin: 'xxl',
              height: '40px',
            },
          ],
          position: 'absolute',
          offsetBottom: '0px',
          offsetStart: '0px',
          offsetEnd: '0px',
          backgroundColor: '#03303Acc',
          paddingAll: '20px',
          paddingTop: '18px',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [{ type: 'text', text: '#就是想分享', color: '#ffffff', align: 'center', size: 'xs', offsetTop: '3px', wrap: true }],
          position: 'absolute',
          cornerRadius: '20px',
          offsetTop: '18px',
          backgroundColor: '#ff334b',
          offsetStart: '18px',
          height: '25px',
          width: '100px',
        },
      ],
      paddingAll: '0px',
    },
  }
  compareTwoDictionary(expected, flex)
})
