import { BadgeProps } from "@/types/components";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { Text, View } from "react-native";

export default function Badge({ content }: Readonly<BadgeProps>) {
  return (
    <View
      testID={COMPONENTS_TEST_IDS.BADGE}
      className="rounded-full bg-primary-default px-3 py-1"
    >
      <Text className="font-open-bold text-white">{content}</Text>
    </View>
  );
}
