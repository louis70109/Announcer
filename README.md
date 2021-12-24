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

## 4. Use following command before deploy:

```
npm run build
```

> This command will compile typescript to javascript file in `dist/`.


## 5. Local Unit/Integration Test

If you use `.env` to develop this project(contain LINE Bot token), can use following command:

```
npm run test
```

- If you installed [act](https://github.com/nektos/act) locally, run `act` to check GitHub Actions status.

# Expect

![](https://github.com/louis70109/Announcer/blob/7958ba589901987642500e0a3b1f94c79de769c4/http_request.png)

# License

MIT License
