import { FavoritesListProps } from "@/types/components";
import { memo } from "react";
import { FlatList, View } from "react-native";
import ShowsListItem from "../home/ShowsListItem";
import EmptyFavorites from "./EmptyFavorites";

function FavoritesList({ data }: FavoritesListProps) {
  return (
    <View className="flex-1 p-4 ">
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListEmptyComponent={<EmptyFavorites />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName={`gap-4 ${data.length === 0 ? "h-full" : ""}`}
        data={data}
        removeClippedSubviews
        renderItem={({ item, index }) => (
          <ShowsListItem data={item} index={index} />
        )}
      />
    </View>
  );
}

export default memo(FavoritesList);
