import { Request, Response } from "express/index";
import { flexUrlTemplate } from "../../types/flexTemplate";
import { FlexMessage } from "@line/bot-sdk";
import { buildFlexContent, generateFlex } from "../../utils/flex";

export function shareController(req: Request, res: Response) {
  const query: any = req.query;
  const flexQuery: flexUrlTemplate = {
    title: query.title,
    place: query.place,
    time: query.time,
    url: query.url,
    description: query.desc,
    activity: query.activity,
  };
  // use query.template to judge different template

  const flex: FlexMessage = buildFlexContent(
    query.title,
    generateFlex(flexQuery, true)
  );

  res.render("share", {
    liffId: process.env.CONCAT_ID,
    flex: JSON.stringify(flex),
  });
}
