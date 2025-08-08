import { EpisodesTab, InformationTab, ShowTabs } from "@/components/show";
import colors from "@/config/colors";
import { EPISODES_LIST } from "@/data/episodes_list";
import { SHOW_DETAILS } from "@/data/show_details";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import NoImageAvailable from "../../assets/images/no_image.png";

export default function Show() {
  const { id } = useLocalSearchParams();

  useEffect(() => {
    // HERE GOES THE LOGIC OF FETCHING THE SHOW
  }, [id]);
  const data = SHOW_DETAILS;
  const episodesList = EPISODES_LIST.sort((a, b) => b.season - a.season);

  const [currentTab, setCurrentTab] = useState(0);
  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow bg-secondary-light"
      >
        <Image
          source={
            Boolean(data.image?.original || data.image?.medium)
              ? { uri: data.image?.original || data.image?.medium }
              : NoImageAvailable
          }
          className="aspect-[9/13] h-auto max-w-[100%]"
          resizeMode="cover"
        />
        <Pressable className="absolute left-8 top-12 h-10 w-10 items-center justify-center rounded-full bg-black/50">
          <Ionicons
            color={colors.white}
            size={24}
            name="chevron-back-outline"
            onPress={() => router.back()}
          />
        </Pressable>
        <View className="m-6">
          <ShowTabs
            changeTab={setCurrentTab}
            currentTab={currentTab}
            tabs={[
              {
                name: "Information",
                icon: "information-circle-outline",
                content: <InformationTab data={data} />,
              },
              {
                name: "Episodes",
                icon: "list-outline",
                content: <EpisodesTab data={episodesList} />,
              },
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
}
