import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import NoResults from "@/components/search/NoResults";
import SearchList from "@/components/search/SearchList";
import { useGetShowsByTermQuery } from "@/redux/services/search";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Search() {
  const { query: searchText } = useLocalSearchParams();

  const { isLoading, data } = useGetShowsByTermQuery({
    searchTerm: searchText as string,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 pb-4">
      <Header isSearchResult={Boolean(searchText.length)} />
      {!data?.length ? <NoResults /> : <SearchList data={data} />}
    </View>
  );
}
