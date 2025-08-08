import Header from "@/components/Header";
import SearchList from "@/components/search/SearchList";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Search() {
  const { query: searchText } = useLocalSearchParams();

  useEffect(() => {
    // HERE GOES THE LOGIC OF SEARCHING
  }, [searchText]);
  return (
    <View className="flex-1 pb-4">
      <Header />
      <SearchList />
    </View>
  );
}
