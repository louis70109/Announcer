type BaseInfo = {
  title: string;
  place: string;
  url?: string;
};

export interface flexUrlTemplate extends BaseInfo {
  title: string;
  place: string;
  time: string;
  url?: string;
  description: string;
  activity: string;
}

type Staff = {
  name: string;
  time: string;
};

export interface staffList extends BaseInfo {
  title: string;
  place: string;
  map?: string;
  url?: string;
  activity: string;
  morning?: Array<Staff>;
  afternoon?: Array<Staff>;
}
