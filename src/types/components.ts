import { IconProps } from "phosphor-react-native";
import { FunctionComponent } from "react";
import { ViewProps } from "react-native";
import {
  CastCreditsProps,
  EpisodeProps,
  PeopleProps,
  PeopleSearchResultProps,
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
  content: string | number;
};

export type ShowTabsProps = {
  tabs: {
    name: string;
    icon: FunctionComponent<IconProps>;
    content: React.ReactElement;
  }[];
  currentTab: number;
  changeTab: (index: number) => void;
};

export type InformationTabProps = {
  data: ShowProps;
};

export type EspisodeTabProps = {
  data: EpisodeProps[];
};

export type EpisodeListItemProps = {
  data: EpisodeProps;
  index: number;
};

export type EpisodesListProps = {
  data: EpisodeProps[];
};

export type SearchListProps = {
  data: SearchResultProps[];
};

export type PeopleListProps = {
  data: PeopleSearchResultProps[];
};

export type PeopleListItemProps = {
  data: PeopleProps;
  index: number;
};

export type HeaderProps = {
  isSearchResult?: boolean;
  children?: React.ReactNode;
};

export type FavoritesListProps = {
  data: ShowProps[];
};

export type SearchType = "show" | "people";

export type SearchInputProps = ViewProps & {
  type?: SearchType;
};

export type SearchSelectorProps = ViewProps & {
  type: SearchType;
  changeType: (type: SearchType) => void;
};

export type PersonSeriesListProps = {
  data: CastCreditsProps[];
};

export type PersonSeriesItemProps = {
  data: CastCreditsProps;
  index: number;
};

export type TabElementsProps = {
  focused: boolean;
  route: string;
};

export type PinInputProps = {
  type: "setup" | "unlock";
};
