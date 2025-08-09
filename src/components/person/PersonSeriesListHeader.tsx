import { Text, View } from "react-native";

export default function PersonSeriesListHeader() {
  return (
    <View className="flex-row border border-secondary-dark bg-secondary-dark">
      <View className="w-[60%] p-3">
        <Text className="font-open-bold text-white">Series</Text>
      </View>
      <View className="flex-1 p-3">
        <Text className="font-open-bold text-white">Character</Text>
      </View>
    </View>
  );
}
