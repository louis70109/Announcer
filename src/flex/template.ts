import { Card, FlexResponse, flexUrlTemplate, News, staffList } from '../../types/flexTemplate'
import { activitySchedule, buildFlexContent, generateFlex, personalCard, articleWithTags } from '../../utils/flex'
import { Request } from 'express/index'

export function flexController(req: Request): FlexResponse {
  const query: any = req.query
  let flex: any = {}
  console.log(query)
  console.log(`Current template is: ${query.template}`)
  if (query.template === '1') {
    const flexQuery: flexUrlTemplate = {
      title: query.title,
      place: query.place,
      time: query.time,
      url: query.url,
      imageUrl: query.imageUrl,
      description: query.desc,
      activity: query.activity,
    }
    flex = buildFlexContent(query.title, generateFlex(flexQuery))
  } else if (query.template === '2') {
    const staffQuery: staffList = {
      title: query.title,
      place: query.place,
      url: query.url,
      activity: query.activity,
      map: query.map,
      people: query.people,
    }
    flex = buildFlexContent(query.title, activitySchedule(staffQuery))
  } else if (query.template === '3') {
    const staffQuery: Card = {
      title: query.title,
      description: query.description,
      avatar: query.avatar,
      back: query.back,
      followUrl: query.followUrl,
    }
    flex = buildFlexContent(query.title, personalCard(staffQuery))
  } else if (query.template === '4') {
    const newsQuery: News = {
      image: query.image,
      date: query.date,
      description: query.description,
      link: query.link,
      tag: query.tag,
      targetPicker: query.targetPicker,
    }
    flex = buildFlexContent(query.title, articleWithTags(newsQuery))
  } else flex = { type: 'text', text: 'Message' }

  return {
    flex: JSON.stringify(flex),
  }
}
