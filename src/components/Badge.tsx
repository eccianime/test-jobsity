import { BadgeProps } from "@/types/components";
import { Text, View } from "react-native";

export default function Badge({ content }: BadgeProps) {
  return (
    <View className="rounded-full bg-primary-default px-3 py-1">
      <Text className="font-open-bold text-white">{content}</Text>
    </View>
  );
}
