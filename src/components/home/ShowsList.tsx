import { SHOWS_DATA } from "@/data/show_list";
import { memo } from "react";
import { FlatList, View } from "react-native";
import ShowsListFooter from "./ShowsListFooter";
import ShowItem from "./ShowsListItem";

function ShowsList() {
  return (
    <View className="flex-1 p-4">
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-4"
        data={SHOWS_DATA}
        removeClippedSubviews
        renderItem={({ item, index }) => <ShowItem data={item} index={index} />}
        ListFooterComponent={
          <ShowsListFooter currentPage={1} handleChangePage={() => {}} />
        }
      />
    </View>
  );
}

export default memo(ShowsList);
