import FavoritesList from "@/components/favorites/FavoritesList";
import Header from "@/components/Header";
import useFavorites from "@/hooks/useFavorites";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";

export default function Favorites() {
  const { data, getFavorites } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, []),
  );

  const sortedList = data.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View className="flex-1">
      <Header showSearch={false} />
      <FavoritesList data={sortedList} />
    </View>
  );
}
