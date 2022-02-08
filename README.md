# Announcer Backend (AB) 🔈

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

AB would provide [Flex Message](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/) template and LINE bot feature.

- Type any text to trigger bot for send Announcer template.
- About GA feature, please follow [this article](https://taichunmin.idv.tw/blog/2020-04-28-lintbot-google-analytics.html).

# Add friends

<a href="https://line.me/R/ti/p/%40608zklsi"><img height="50" border="0" alt="加入好友" src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"></a>

<img height="200" border="0" alt="QRcode" src="https://qr-official.line.me/sid/L/608zklsi.png">

# Environment

- Express / nodejs v12.18
- TypeScript

# Heroku

You can test this project on Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Use following up commands to check machine:

```
heroku run bash -a YOUR_HEROKU_NAME
heroku logs --tail -a YOUR_HEROKU_NAME
```

# LIFF

- Login `LINE Developer Console`.
- Create a `LINE Login` channel.
- Input channel information.
- Click `LIFF` tab and add LIFF application.
- Copy `LIFF ID` to environment `CONCAT_ID` variable.

# Messaging API

- Login `LINE Developer Console`.
- Create a `Messaging API` channel.
- Input channel information.
- Copy `Channel secret` and `Channel access token` to environment `CHANNEL_ACCESS_TOKEN` and `CHANNEL_SECRET` variables.

# Local test with Chatbot & API

## 1. first terminal window

```
cp .env.sample .env
npm install
npm run dev
```

## 2. Create a provisional https:

```
npx ngrok http 5000
```

![](https://i.imgur.com/azVdG8j.png)

## 3. Copy url to Messaging API and LIFF endpoint url.

### LINE Bot

You can go to LINE Developer Console to change LINE Bot webhook url.

If you used `channel_access_toen` and `channel_secret` in `.env` file.

You can use `change_bot_url.sh` to change temp webhook url.

```sh
sh change_bot_url.sh 57G...YOUR_ACCESS_TOKEN...vw= https://{YOUR_DOMAIN}/webhooks/line
```

will see following log:

```
--------------------------

{}

--------------------------

{"endpoint":"https://{YOUR_DOMAIN}/webhooks/line","active":true}
-------------------------
```

- `{}`: if empty, means success.

## 4. Use following command before deploy:

```
npm run dev
```

> This command will compile TypeScript to JavaScript file in `dist/`.


## 5. Local Unit/Integration Test

If you use `.env` to develop this project(contain LINE Bot token), can use following command:

```
npm run test
```

- If you installed [act](https://github.com/nektos/act) locally, run `act` to check GitHub Actions status.

# Template Schema

![](https://github.com/louis70109/Announcer/blob/463868113c4710cdeca16a1a728fdc1fa7fb8ac9/readme_img/http_request.png)

## API ➡️ `/liff/share`

### Template 1 - Announcement

![](https://github.com/louis70109/Announcer/blob/964d2edc539439a19ed425a9320b2dd9e5726420/readme_img/template1.png)

```typescript
type announcement = {
    template: '1',
    title: 'Title',
    place: 'location',
    time: '12/26 15:00',
    url: 'HTTP string',
    imageUrl: 'HTTP string',
    description: 'aaa\nbbb\nccc',
    activity: 'some tag',
};
```

### Template 2 - Staff List

![](https://github.com/louis70109/Announcer/blob/964d2edc539439a19ed425a9320b2dd9e5726420/readme_img/template2.png)

```typescript
type staffList = {
  template: '2',
  title: 'title',
  place: 'here',
  url: 'HTTP link',
  activity: 'tag',
  map: 'Google Map link',
  people: [{name: 'NiJia', time: '10:00~12:00'}],
};
```

### Template 3 - Card

![](https://github.com/louis70109/Announcer/blob/964d2edc539439a19ed425a9320b2dd9e5726420/readme_img/template1.png)

```typescript
type Card = {
  template: '2',
  title: 'title',
  description: 'aaa\nbbb',
  avatar: 'HTTP link',
  back: 'HTTP image background link',
  followUrl: 'HTTP link',
};
```

### Template 4 - News

![](https://github.com/louis70109/Announcer/blob/9bafd8467113900b2798431163b2954a7337ddfa/readme_img/template4.png)

```typescript
type News = {
  image: string;
  date: string;
  description: string;
  link: string;
  tag: string;
  targetPicker?: string;
}
```

### Response 

Above template would response following type:

```
type FlexResponse = {
  flex: string;
};
```

# License

MIT License
