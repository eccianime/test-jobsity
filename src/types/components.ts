import { ShowProps, ShowResultProps } from "./schema";

export type ShowsListFooterProps = {
  handleChangePage: (page: number) => void;
  currentPage: number;
};

export type ShowItemProps = {
  data: ShowProps;
  index: number;
};

export type SearchListItemProps = {
  data: ShowResultProps;
};
