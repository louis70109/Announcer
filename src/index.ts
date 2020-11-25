import {
  generateFlex,
  buildFlexContent,
  activitySchedule,
  personalCard,
} from '../utils/flex';
import { Client } from '@line/bot-sdk';
import { FlexMessage } from '@line/bot-sdk/lib/types';
import { Card, flexUrlTemplate, staffList } from '../types/flexTemplate';
import { buildCarouselContent } from '../utils/common';

// create LINE SDK config from env variables
const client = new Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET || '',
});
const { CONCAT_ID } = process.env;
function handleEvent(event: any) {
  if (event.source.userId === 'Udeadbeefdeadbeefdeadbeefdeadbeef') return; // webhook verify

  const flexQuery: flexUrlTemplate = {
    title: 'I am title',
    place: '@10-4',
    time: '10:30~11:00',
    url: `https://liff.line.me/${CONCAT_ID}/?template=1`,
    imageUrl: 'https://i.imgur.com/EI8AuUY.jpg',
    description: 'description',
    activity: '活動',
  };
  const staffQuery: staffList = {
    title: '10/10 Title',
    place: '台北市內湖區瑞光路',
    map: `https://liff.line.me/${CONCAT_ID}/?template=2`,
    url: `https://liff.line.me/${CONCAT_ID}/?template=2`,
    activity: '參與名單',
    people: [
      { name: 'Moon', time: '10:00~12:00' },
      { name: 'Boss', time: '11:00~12:00' },
    ],
  };
  const person: Card = {
    title: 'NiJia(testing)',
    description: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
    followUrl: `https://liff.line.me/${CONCAT_ID}/?template=3`,
    back:
      'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg',
    avatar:
      'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
  };
  const flex: FlexMessage = buildFlexContent(
    '測試數據',
    buildCarouselContent([
      generateFlex(flexQuery),
      activitySchedule(staffQuery),
      personalCard(person),
    ])
  );

  return client.replyMessage(event.replyToken, flex);
}

export { handleEvent };
