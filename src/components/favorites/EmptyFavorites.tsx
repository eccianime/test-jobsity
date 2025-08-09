import colors from "@/config/colors";
import { router } from "expo-router";
import { HeartBreakIcon } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function EmptyFavorites() {
  return (
    <View className="flex-1 items-center justify-center">
      <HeartBreakIcon size={100} color={colors.primary.default} />
      <Text className="text-center font-open-semibold text-2xl text-primary-default">
        There are no favorites yet!
      </Text>
      <TouchableOpacity
        className="mt-4 rounded-full bg-primary-default px-6 py-4"
        onPress={() => router.back()}
      >
        <Text className="font-open-semibold text-2xl text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
