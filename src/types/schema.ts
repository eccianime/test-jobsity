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

export type SearchResultProps = {
  score: number;
  show: ShowResultProps;
};

export type PeopleProps = {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
};

export type CastCreditsProps = {
  _links: {
    show: {
      href: string;
      name: string;
    };
    character: {
      name: string;
    };
  };
};

export type PeopleDetailedProps = PeopleProps & {
  _embedded: {
    castcredits: CastCreditsProps[];
  };
};

export type PeopleSearchResultProps = {
  score: number;
  person: PeopleProps;
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
  _links: {
    show: {
      name: string;
    };
  };
};
