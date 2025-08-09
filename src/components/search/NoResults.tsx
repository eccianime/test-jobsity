import colors from "@/config/colors";
import { router } from "expo-router";
import { SmileyXEyesIcon } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function NoResults() {
  return (
    <View className="flex-1 items-center justify-center">
      <SmileyXEyesIcon size={100} color={colors.primary.default} />
      <Text className="text-center font-open-semibold text-2xl text-primary-default">
        No results found
      </Text>
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-4 rounded-full bg-primary-default px-6 py-4"
      >
        <Text className="font-open-semibold text-2xl text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
