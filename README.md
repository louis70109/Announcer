# Announcer 🔈

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Announcer is used [ShareTargetPicker](https://developers.line.biz/en/reference/liff/#share-target-picker) to announce Flex Message to User/Group/Room with LINE.

- Trigger bot to send Announcer url.
- Input message to columns.
- Send to User/Group/Room.
- If you want to use GA, please reference [this article](https://taichunmin.idv.tw/blog/2020-04-28-lintbot-google-analytics.html).

# Environment

- [LINE LIFF v2.3](https://developers.line.biz/en/reference/liff/)
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

# LIFF Settings

- Login `LINE Developer Console`.
- Create a `LINE Login` channel.
- Click `LIFF` tab and add LIFF application.
- Copy `LIFF ID` to environment `CONCAT_ID` variable.

# Local testing

1. first terminal window

```
cp .env.sample .env
npm install
npm run dev
```

2. Create a provisional Https:

```
ngrok http 5000
```

If you have npm environment:

```
npx ngrok http 5000
```

![](https://i.imgur.com/azVdG8j.png)

3. Copy url to LINE Developer Console

4. If you want to deploy, use following command:

```
npm run build
```

This commnad will compile typescript file to javascript file in `dist/`.

# License

MIT License
