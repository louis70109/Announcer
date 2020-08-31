import qs from "qs";
export function gaScreenView(
  name: string,
  lineId: string = "Ud6ab866a67af711d594b12b0baffb8ac"
) {
  return `https://www.google-analytics.com/collect?${qs.stringify({
    an: "My App",
    cd: name, // 畫面名稱,
    cid: lineId.replace(
      /^U(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/,
      "$1-$2-$3-$4-$5"
    ), // client id
    ds: "app", // 資料來源，填寫為 app
    t: "screenview",
    tid: process.env.GA, // GA 追蹤代碼
    uid: lineId, // LINE userId
    ul: "zh-tw", // locale
    v: 1, // api version
    z: +new Date(),
  })}`;
}
export function jsonEscape(str: string): string {
  return str.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}
