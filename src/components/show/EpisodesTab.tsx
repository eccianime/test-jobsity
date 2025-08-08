import colors from "@/config/colors";
import { EspisodeListTabProps } from "@/types/components";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import EpisodeListHeader from "./EpisodeListHeader";
import EpisodeListItem from "./EpisodeListItem";

export default function EpisodesTab({ data }: Readonly<EspisodeListTabProps>) {
  const [currentOpenAccordion, setCurrentOpenAccordion] = useState<
    null | number
  >(null);

  const seasons = [...new Set(data.map((episode) => episode.season))];

  const hasOnlyOneSeason = seasons.length === 1;

  useEffect(() => {
    if (hasOnlyOneSeason) {
      setCurrentOpenAccordion(1);
    }
  }, [hasOnlyOneSeason]);

  return (
    <View className="rounded-b-2xl bg-white p-4">
      {seasons.map((season) => (
        <View key={`season-${season}`} className="mb-4">
          <TouchableOpacity
            onPress={() => {
              if (!hasOnlyOneSeason) {
                setCurrentOpenAccordion(
                  currentOpenAccordion === season ? null : season,
                );
              }
            }}
            className="h-10 flex-row justify-between"
          >
            <Text className="text-xl font-semibold text-primary-default">
              Season {season}
            </Text>
            {!hasOnlyOneSeason && (
              <Ionicons
                name={
                  currentOpenAccordion === season
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={24}
                color={colors.primary.default}
              />
            )}
          </TouchableOpacity>
          {currentOpenAccordion === season && (
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              data={data
                .filter((episode) => episode.season === season)
                .sort((a, b) => b.number - a.number)}
              ListHeaderComponent={<EpisodeListHeader />}
              renderItem={({ item, index }) => (
                <EpisodeListItem data={item} index={index} />
              )}
            />
          )}
        </View>
      ))}
    </View>
  );
}
