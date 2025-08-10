import BackButton from "@/components/BackButton";
import LoadingScreen from "@/components/LoadingScreen";
import { EpisodesTab, InformationTab, ShowTabs } from "@/components/show";
import useFavorites from "@/hooks/useFavorites";
import { useGetEpisodesListQuery } from "@/redux/services/episodes";
import { useGetShowDetailsQuery } from "@/redux/services/shows";
import { ShowProps } from "@/types/schema";
import { renderImage } from "@/utils";
import { SCREEN_COMPONENTS_TEST_IDS } from "@/utils/constants";
import { useLocalSearchParams } from "expo-router";
import { HeartIcon, InfoIcon, QueueIcon } from "phosphor-react-native";
import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

export default function Show() {
  const { id } = useLocalSearchParams();
  const { isFavorite, addToFavorites, deleteFromFavorites } = useFavorites();

  const { isLoading: isShowDetailsLoading, data: showData } =
    useGetShowDetailsQuery({ showId: id as string });
  const { isLoading: isEpisodesListLoading, data: episodesList } =
    useGetEpisodesListQuery({ showId: id as string });
  const sortedEpisodesList =
    episodesList && episodesList?.length > 0
      ? [...episodesList]?.sort((a, b) => b.season - a.season)
      : [];

  const [currentTab, setCurrentTab] = useState(0);

  if (isShowDetailsLoading || isEpisodesListLoading) {
    return <LoadingScreen />;
  }

  const isShowFavorite = showData?.id && isFavorite(showData.id);
  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow bg-secondary-light"
      >
        <View>
          <Image
            testID={SCREEN_COMPONENTS_TEST_IDS.SHOW_IMAGE}
            source={renderImage(showData?.image)}
            className="aspect-[9/13] h-auto max-w-[100%]"
            resizeMode="cover"
          />
          <View className="absolute left-8 top-12">
            <BackButton />
          </View>
          <TouchableOpacity
            testID={SCREEN_COMPONENTS_TEST_IDS.DELETE_ADD_FAVORITE_BUTTON}
            className="absolute bottom-3 right-3 items-center justify-center rounded-full bg-primary-default p-3"
            onPress={() =>
              isShowFavorite
                ? deleteFromFavorites(showData?.id)
                : showData && addToFavorites(showData)
            }
          >
            <HeartIcon
              size={30}
              color={"white"}
              weight={isShowFavorite ? "fill" : "regular"}
            />
          </TouchableOpacity>
        </View>

        <View className="m-6">
          <ShowTabs
            changeTab={setCurrentTab}
            currentTab={currentTab}
            tabs={[
              {
                name: "Information",
                icon: InfoIcon,
                content: (
                  <InformationTab data={showData || ({} as ShowProps)} />
                ),
              },
              {
                name: "Episodes",
                icon: QueueIcon,
                content: <EpisodesTab data={sortedEpisodesList} />,
              },
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
}
