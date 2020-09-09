type BaseInfo = {
  title: string;
  place: string;
  url?: string;
};

export interface flexUrlTemplate extends BaseInfo {
  imageUrl?: string;
  time: string;
  description: string;
  activity: string;
}

type Staff = {
  name: string;
  time: string;
};

export interface staffList extends BaseInfo {
  map?: string;
  activity: string;
  people?: Array<Staff>;
}

export type FlexResponse = {
  liffId: string;
  flex: string;
};
