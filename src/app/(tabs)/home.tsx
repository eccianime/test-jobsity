import ComposedSearch from "@/components/ComposedSearch";
import Header from "@/components/Header";
import ShowsList from "@/components/home/ShowsList";
import { View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 pb-4">
      <Header>
        <ComposedSearch />
      </Header>
      <ShowsList />
    </View>
  );
}
