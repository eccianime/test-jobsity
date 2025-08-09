import { EpisodeListItemProps } from "@/types/components";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function EpisodeListItem({
  data,
  index,
}: Readonly<EpisodeListItemProps>) {
  return (
    <TouchableOpacity
      className={`flex-row ${index % 2 ? "bg-secondary-lighter" : ""}`}
      onPress={() => router.push(`/episode/${data.id}`)}
    >
      <View className="h-auto w-[30%] justify-center border-r border-r-white  px-4">
        <Text className="font-open-regular ">{data.number}</Text>
      </View>
      <View className="min-h-10 flex-1 justify-center  px-4 py-1">
        <Text className="font-open-regular text-primary-default">
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
