import { SearchListProps } from "@/types/components";
import { memo } from "react";
import { FlatList, View } from "react-native";
import ShowListItem from "./SearchListItem";

function SearchList({ data }: Readonly<SearchListProps>) {
  return (
    <View className="flex-1 p-4">
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.show.id.toString()}
        contentContainerClassName="gap-4"
        data={data}
        removeClippedSubviews
        renderItem={({ item }) => <ShowListItem data={item.show} />}
      />
    </View>
  );
}

export default memo(SearchList);
