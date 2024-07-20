export type Location = {
  city: string;
  state: string;
};

export type About = {
  name: string;
  title: string;
  image: string;
  email: string;
  website: string;
  summary: string;
  location: Location & { country: string };
  socials: Social[];
};

export type Job = {
  company: string;
  title: string;
  location: Location;
  startDate: Date;
  endDate: Date;
  url: string;
  summary: string;
  highlights: string[];
};

export interface Level {
  Basic;
  Intermediate;
  Advanced;
}

export type Interest = {
  name: string;
  keywords: string[];
};

export type Skill = Interest & {
  level: Level;
};

export type Social = {
  site: string;
  username: string;
};

export type Resume = {
  about: About;
  jobs: Job[];
  skills: Skill[];
  interest: Interest[];
};
