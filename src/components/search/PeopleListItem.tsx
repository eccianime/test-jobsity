import { PeopleListItemProps } from "@/types/components";
import { renderImage } from "@/utils";
import { router } from "expo-router";
import { JSX, memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function PeopleListItem({
  data,
  index,
}: Readonly<PeopleListItemProps>): JSX.Element {
  return (
    <TouchableOpacity
      className="w-[48%] overflow-hidden rounded-2xl bg-primary-default"
      style={{ marginRight: !(index % 2) ? "auto" : 0 }}
      onPress={() => router.push(`/people/${data.id}`)}
    >
      <Image
        source={renderImage(data?.image)}
        accessible={true}
        accessibilityLabel={`Poster for ${data.name}`}
        className="aspect-[9/13] h-[300] max-w-[100%]"
        resizeMode="cover"
        onError={(error) => console.warn("Image load failed:", error)}
      />
      <View className="h-16 items-center justify-center px-3 py-1">
        <Text className="text-center font-open-bold text-xl text-white">
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(PeopleListItem);
