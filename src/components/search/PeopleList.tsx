import { PeopleListProps } from "@/types/components";
import { memo } from "react";
import { FlatList, View } from "react-native";
import PeopleListItem from "./PeopleListItem";

function PeopleList({ data }: Readonly<PeopleListProps>) {
  return (
    <View className="flex-1 p-4">
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.person.id.toString()}
        contentContainerClassName="gap-4"
        data={data}
        removeClippedSubviews
        renderItem={({ item, index }) => (
          <PeopleListItem data={item.person} index={index} />
        )}
      />
    </View>
  );
}

export default memo(PeopleList);
