import BackButton from "@/components/BackButton";
import LoadingScreen from "@/components/LoadingScreen";
import { EpisodesTab, InformationTab, ShowTabs } from "@/components/show";
import { useGetEpisodesListQuery } from "@/redux/services/episodes";
import { useGetShowDetailsQuery } from "@/redux/services/shows";
import { ShowProps } from "@/types/schema";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import NoImageAvailable from "../../assets/images/no_image.png";

export default function Show() {
  const { id } = useLocalSearchParams();

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
  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow bg-secondary-light"
      >
        <Image
          source={
            Boolean(showData?.image?.original || showData?.image?.medium)
              ? { uri: showData?.image?.original || showData?.image?.medium }
              : NoImageAvailable
          }
          className="aspect-[9/13] h-auto max-w-[100%]"
          resizeMode="cover"
        />
        <View className="absolute left-8 top-12">
          <BackButton />
        </View>
        <View className="m-6">
          <ShowTabs
            changeTab={setCurrentTab}
            currentTab={currentTab}
            tabs={[
              {
                name: "Information",
                icon: "information-circle-outline",
                content: (
                  <InformationTab data={showData || ({} as ShowProps)} />
                ),
              },
              {
                name: "Episodes",
                icon: "list-outline",
                content: <EpisodesTab data={sortedEpisodesList} />,
              },
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
}
