import { SearchListItemProps } from "@/types/components";
import { removeHtmlTags } from "@/utils";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import NoImageAvailable from "../../assets/images/no_image.png";

export default function SearchListItem({ data }: SearchListItemProps) {
  return (
    <TouchableOpacity
      className="flex-row gap-6"
      onPress={() => router.push(`/show/${data.id}`)}
    >
      <Image
        source={
          data.image?.medium || data.image?.original
            ? {
                uri: data.image?.medium || data.image?.original,
              }
            : NoImageAvailable
        }
        accessible={true}
        accessibilityLabel={`Poster for ${data.name}`}
        className="aspect-[9/16] w-[45%] rounded-2xl"
        resizeMode="cover"
        onError={(error) => console.warn("Image load failed:", error)}
      />
      <View className="flex-1">
        <Text className="font-open-bold text-2xl text-primary-default">
          {data.name}
        </Text>
        <Text className="font-open-regular text-lg text-secondary-dark">
          Aired on:{" "}
          <Text className="font-open-bold">
            {data.network?.name || data.webChannel?.name}
          </Text>
        </Text>
        <Text className="font-open-regular mb-4 text-lg text-secondary-dark">
          {`${new Date(data.premiered).getFullYear()} - ${data.ended ? new Date(data.ended).getFullYear() : "Ongoing"}`}
        </Text>
        <Text className="font-open-bold text-primary-dark">Summary:</Text>
        <Text
          className="font-open-regular text-primary-dark"
          ellipsizeMode="tail"
          numberOfLines={8}
        >
          {removeHtmlTags(data.summary)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
