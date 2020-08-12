# LINE LIFF concatenate mode example

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a template for LIFF concatenate mode by nodejs.

# Environment

- LINE LIFF v2.3 concat mode
- Express / nodejs v12.18

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
- Input `https://YOUR_URL/notify` in Endpoint URL column.
- Copy `LIFF ID` to environment `CONCAT_ID` variable.
- Now you can test concat cases:
  - https://liff.line.me/LIFF_ID?aaa=bbb
  - https://liff.line.me/LIFF_ID?a=123&b=456

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

![](https://i.imgur.com/xOingAO.png)

# License

MIT License
