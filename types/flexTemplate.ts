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

type PrimaryButton = {
  type: string;
  style?: string;
  height?: string;
  action: {
    type: string;
    label: string;
    uri: string;
  };
};

type Footer = {
  type: string;
  layout: string;
  spacing: string;
  contents: Array<PrimaryButton>;
  flex: number;
};

interface Card {
  title: string;
  description: string;
  avatar?: string;
  back?: string;
  url?: string;
}

export {
  flexUrlTemplate,
  staffList,
  FlexResponse,
  Card,
  Hero,
  Footer,
  PrimaryButton,
};
