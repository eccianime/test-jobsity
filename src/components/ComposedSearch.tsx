import { SearchType } from "@/types/components";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import SearchInput from "./SearchInput";
import SearchSelector from "./SearchSelector";

export default function ComposedSearch() {
  const [currentSearch, setCurrentSearch] = useState<SearchType>("show");

  const path = usePathname();

  useEffect(() => {
    if (path.includes("search")) {
      const searchType = path.split("/")[2];
      setCurrentSearch(searchType as SearchType);
    }
  }, [path]);

  return (
    <View className="flex-row gap-2">
      <SearchSelector
        testID={COMPONENTS_TEST_IDS.SEARCH_SELECTOR}
        type={currentSearch}
        changeType={setCurrentSearch}
      />
      <SearchInput
        testID={COMPONENTS_TEST_IDS.SEARCH_INPUT}
        type={currentSearch}
      />
    </View>
  );
}
