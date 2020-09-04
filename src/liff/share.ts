import { Request, Response } from "express/index";
import { flexUrlTemplate, staffList } from "../../types/flexTemplate";
import { FlexMessage } from "@line/bot-sdk";
import {
  buildFlexContent,
  generateFlex,
  activitySchedule,
} from "../../utils/flex";

export function shareController(req: Request, res: Response) {
  const query: any = req.query;
  let flex: any = {};
  if (query.template === "1") {
    const flexQuery: flexUrlTemplate = {
      title: query.title,
      place: query.place,
      time: query.time,
      url: query.url,
      description: query.desc,
      activity: query.activity,
    };
    flex = buildFlexContent(query.title, generateFlex(flexQuery, true));
  } else {
    const staffQuery: staffList = {
      title: query.title,
      place: query.place,
      url: query.url,
      activity: query.activity,
      map: query.map,
      morning: query.morning,
      afternoon: query.afternoon,
    };

    flex = buildFlexContent(query.title, activitySchedule(staffQuery));
  }
  // use query.template to judge different template
  if (!flex) {
    flex = { type: "text", text: "Message" };
  }
  res.render("share", {
    liffId: process.env.CONCAT_ID,
    flex: JSON.stringify(flex),
  });
}
