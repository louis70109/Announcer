type BaseInfo = {
  title: string;
  place: string;
  url?: string;
};

interface flexUrlTemplate extends BaseInfo {
  imageUrl?: string;
  time: string;
  description: string;
  activity: string;
}

type Staff = {
  name: string;
  time: string;
};

interface staffList extends BaseInfo {
  map?: string;
  activity: string;
  people?: Array<Staff>;
}

type FlexResponse = {
  liffId: string;
  flex: string;
};

type Hero = {
  type: string;
  url: string;
  size: string;
  aspectRatio: string;
  aspectMode: string;
};

interface Card {
  title: string;
  description: string;
  avatar?: string;
  back?: string;
  url?: string;
}

export { flexUrlTemplate, staffList, FlexResponse, Card, Hero };
