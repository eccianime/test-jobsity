import { EpisodesListProps } from "@/types/components";
import { memo } from "react";
import { FlatList } from "react-native";
import EpisodeListHeader from "./EpisodeListHeader";
import EpisodeListItem from "./EpisodeListItem";

function EpisodesList({ data }: Readonly<EpisodesListProps>) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerClassName="border border-primary-default"
      keyExtractor={(item) => item.id.toString()}
      data={data}
      ListHeaderComponent={<EpisodeListHeader />}
      renderItem={({ item, index }) => (
        <EpisodeListItem data={item} index={index} />
      )}
    />
  );
}

export default memo(EpisodesList);
