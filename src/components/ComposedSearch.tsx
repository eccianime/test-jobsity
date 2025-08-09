import { SearchType } from "@/types/components";
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
      <SearchSelector type={currentSearch} changeType={setCurrentSearch} />
      <SearchInput type={currentSearch} />
    </View>
  );
}
