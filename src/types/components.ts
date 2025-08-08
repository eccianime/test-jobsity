import { Ionicons } from "@expo/vector-icons";
import {
  EpisodeProps,
  SearchResultProps,
  ShowProps,
  ShowResultProps,
} from "./schema";

export type ShowsListFooterProps = {
  currentPage: number;
  paginationNumbers: number[];
  isLastPage: boolean;
  handleChangePage: (page: number) => void;
};

export type ShowItemProps = {
  data: ShowProps;
  index: number;
};

export type SearchListItemProps = {
  data: ShowResultProps;
};

export type BadgeProps = {
  content: string;
};

export type ShowTabsProps = {
  tabs: {
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
    content: React.ReactElement;
  }[];
  currentTab: number;
  changeTab: (index: number) => void;
};

export type InformationTabProps = {
  data: ShowProps;
};

export type EspisodeListTabProps = {
  data: EpisodeProps[];
};

export type EpisodeListItemProps = {
  data: EpisodeProps;
  index: number;
};

export type SearchListProps = {
  data: SearchResultProps[];
};

export type HeaderProps = {
  isSearchResult?: boolean;
};
