import { ShowProps } from "@/types/schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const FAVORITES_SHOWS_KEY = "FAVORITES_SHOWS";

export default function useFavorites() {
  const [data, setData] = useState<ShowProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFavorites = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_SHOWS_KEY);
      if (favorites) {
        setData(JSON.parse(favorites));
      } else {
        setData([]);
      }
    } catch (e: any) {
      setError("Failed to load favorites: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFavoritesStorage = async (newData: ShowProps[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_SHOWS_KEY, JSON.stringify(newData));
    } catch (e: any) {
      setError("Failed to save favorites: " + e.message);
    }
  };

  const addToFavorites = async (show: ShowProps) => {
    setError(null);
    const newData = [...data, show];
    setData(newData);
    await updateFavoritesStorage(newData);
  };

  const deleteFromFavorites = async (id: number) => {
    setError(null);
    const newData = data.filter((s: ShowProps) => s.id !== id);
    setData(newData);
    await updateFavoritesStorage(newData);
  };

  const isFavorite = (id: number) => {
    return data.some((s: ShowProps) => s.id === id);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return {
    data,
    isLoading,
    error,
    addToFavorites,
    deleteFromFavorites,
    isFavorite,
    getFavorites,
  };
}
