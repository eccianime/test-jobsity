import { Text, View } from "react-native";

export default function EpisodeListHeader() {
  return (
    <View className="flex-row bg-primary-default">
      <View className="h-10 w-[30%] justify-center border-r border-r-white  px-4">
        <Text className="font-open-bold text-white">Number</Text>
      </View>
      <View className="h-10  flex-1  justify-center  px-4">
        <Text className="font-open-bold text-white">Name</Text>
      </View>
    </View>
  );
}
