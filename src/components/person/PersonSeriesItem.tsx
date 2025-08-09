import { PersonSeriesItemProps } from "@/types/components";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function PersonSeriesItem({
  data,
  index,
}: Readonly<PersonSeriesItemProps>) {
  return (
    <TouchableOpacity
      className={`flex-row items-center gap-2 ${index % 2 ? "bg-secondary-light" : "bg-white"}`}
      onPress={() =>
        router.push(`/show/${data._links.show.href.split("/").pop()}`)
      }
    >
      <View className="w-[60%] px-3 py-2">
        <Text className="font-open-bold text-secondary-dark">
          {data._links.show.name}
        </Text>
      </View>
      <View className="flex-1 px-3 py-2">
        <Text className="font-open-regular">{data._links.character.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
