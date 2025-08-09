import ComposedSearch from "@/components/ComposedSearch";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import NoResults from "@/components/search/NoResults";
import PeopleList from "@/components/search/PeopleList";
import { useGetPeopleByTermQuery } from "@/redux/services/search";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function SearchPeople() {
  const { query: searchText } = useLocalSearchParams();

  const { isLoading, data } = useGetPeopleByTermQuery({
    searchTerm: searchText as string,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 pb-4">
      <Header isSearchResult>
        <ComposedSearch />
      </Header>
      {!data?.length ? <NoResults /> : <PeopleList data={data} />}
    </View>
  );
}
