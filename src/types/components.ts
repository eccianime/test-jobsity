import { Ionicons } from "@expo/vector-icons";
import { EpisodeProps, ShowProps, ShowResultProps } from "./schema";

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
