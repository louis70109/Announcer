import { Request, Response } from "express/index";
import {
  flexUrlTemplate,
  staffList,
  FlexResponse,
} from "../../types/flexTemplate";
import {
  buildFlexContent,
  generateFlex,
  activitySchedule,
} from "../../utils/flex";

export function shareController(req: Request): FlexResponse {
  const query: any = req.query;
  let flex: any = {};
  console.log(query);
  console.log(`Current template is: ${query.template}`);
  if (query.template === "1") {
    const flexQuery: flexUrlTemplate = {
      title: query.title,
      place: query.place,
      time: query.time,
      url: query.url,
      imageUrl: query.imageUrl,
      description: query.desc,
      activity: query.activity,
    };
    flex = buildFlexContent(query.title, generateFlex(flexQuery));
  } else if (query.template === "2") {
    const staffQuery: staffList = {
      title: query.title,
      place: query.place,
      url: query.url,
      activity: query.activity,
      map: query.map,
      people: query.people,
    };
    flex = buildFlexContent(query.title, activitySchedule(staffQuery));
  } else flex = { type: "text", text: "Message" };

  return {
    liffId: process.env.CONCAT_ID || "",
    flex: JSON.stringify(flex),
  };
}
