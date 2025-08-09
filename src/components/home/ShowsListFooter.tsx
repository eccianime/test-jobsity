import { ShowsListFooterProps } from "@/types/components";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function ShowsListFooter({
  paginationNumbers,
  currentPage,
  isLastPage,
  handleChangePage,
}: Readonly<ShowsListFooterProps>) {
  return (
    <View className="flex-row items-center justify-between">
      <TouchableOpacity
        testID={COMPONENTS_TEST_IDS.FOOTER_PREVIOUS_BUTTON}
        className={`rounded-full bg-primary-default px-4 py-2 ${
          currentPage === 1 ? "opacity-50" : ""
        }`}
        onPress={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text className="font-open-bold text-lg text-white">Previous</Text>
      </TouchableOpacity>

      <View className="flex-row gap-2">
        {paginationNumbers.map((number) => (
          <TouchableOpacity
            key={number}
            onPress={() => handleChangePage(number)}
            className={`rounded-full  px-4 py-1 ${
              number === currentPage ? "bg-primary-default" : ""
            }`}
          >
            <Text
              className={`font-open-bold text-lg ${
                number === currentPage ? "text-white" : ""
              }`}
            >
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        testID={COMPONENTS_TEST_IDS.FOOTER_NEXT_BUTTON}
        className={`rounded-full bg-primary-default px-4 py-2 ${
          isLastPage ? "opacity-50" : ""
        }`}
        onPress={() => handleChangePage(currentPage + 1)}
        disabled={isLastPage}
      >
        <Text className="font-open-bold text-lg text-white">Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(ShowsListFooter);
