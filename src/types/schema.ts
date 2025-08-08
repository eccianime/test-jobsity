export type ShowProps = {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
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
  summary: string;
};
