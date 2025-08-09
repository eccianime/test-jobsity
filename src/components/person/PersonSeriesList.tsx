import { PersonSeriesListProps } from "@/types/components";
import { memo } from "react";
import { FlatList, View } from "react-native";
import PersonSeriesItem from "./PersonSeriesItem";
import PersonSeriesListHeader from "./PersonSeriesListHeader";

function PersonSeriesList({ data }: Readonly<PersonSeriesListProps>) {
  return (
    <View className="border border-secondary-dark">
      <FlatList
        ListHeaderComponent={<PersonSeriesListHeader />}
        scrollEnabled={false}
        data={data}
        renderItem={({ item, index }) => (
          <PersonSeriesItem data={item} index={index} />
        )}
      />
    </View>
  );
}

export default memo(PersonSeriesList);
