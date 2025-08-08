export type ShowProps = {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  genres: string[];
  schedule: {
    time: string;
    days: string[];
  };
};

export type ShowResultProps = ShowProps & {
  premiered: string;
  ended: string | null;
  network: {
    name: string;
  } | null;
  webChannel: {
    name: string;
  } | null;
};

export type EpisodeProps = {
  id: number;
  name: string;
  season: number;
  number: number;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
};
