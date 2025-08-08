import { ShowsListFooterProps } from "@/types/components";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function ShowsListFooter({
  handleChangePage,
  currentPage,
}: Readonly<ShowsListFooterProps>) {
  return (
    <View className="flex-row justify-between">
      <TouchableOpacity
        className={`rounded-full bg-primary-default px-4 py-2 ${
          currentPage === 1 ? "opacity-50" : ""
        }`}
        onPress={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text className="font-open-bold text-lg text-white">Previous</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`rounded-full bg-primary-default px-4 py-2 ${
          currentPage === 1000 ? "opacity-50" : ""
        }`}
        onPress={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === 1000}
      >
        <Text className="font-open-bold text-lg text-white">Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(ShowsListFooter);
