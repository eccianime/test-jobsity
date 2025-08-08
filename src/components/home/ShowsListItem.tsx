import { ShowItemProps } from "@/types/components";
import { JSX, memo } from "react";
import { Image, Text, View } from "react-native";
import NoImageAvailable from "../../assets/images/no_image.png";

function ShowItem({ data, index }: ShowItemProps): JSX.Element {
  return (
    <View
      className="w-[48%]  bg-primary-default"
      style={{ marginRight: !(index % 2) ? "auto" : 0 }}
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
        className="aspect-[9/16]"
        resizeMode="cover"
        onError={(error) => console.warn("Image load failed:", error)}
      />
      <View className="h-24 items-center justify-center px-3">
        <Text className="font-open-bold text-center text-xl text-white">
          {data.name}
        </Text>
      </View>
    </View>
  );
}

export default memo(ShowItem);
