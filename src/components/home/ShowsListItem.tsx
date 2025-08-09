import { ShowItemProps } from "@/types/components";
import { renderImage } from "@/utils";
import { router } from "expo-router";
import { JSX, memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function ShowItem({ data, index }: Readonly<ShowItemProps>): JSX.Element {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      className="w-[48%] overflow-hidden rounded-2xl bg-primary-default"
      style={{ marginRight: !(index % 2) ? "auto" : 0 }}
      onPress={() => router.push(`/show/${data.id}`)}
    >
      <Image
        source={renderImage(data.image)}
        accessible={true}
        accessibilityLabel={`Poster for ${data.name}`}
        className="aspect-[9/13] h-[300] max-w-[100%]"
        resizeMode="cover"
      />
      <View className="max-h-28 min-h-20 items-center justify-center px-3 py-1">
        <Text className="text-center font-open-bold text-xl text-white">
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ShowItem);
