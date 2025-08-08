import { EpisodesTab, InformationTab, ShowTabs } from "@/components/show";
import { SHOW_DETAILS } from "@/data/details";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import NoImageAvailable from "../../assets/images/no_image.png";

export default function Show() {
  const { id } = useLocalSearchParams();

  useEffect(() => {
    // HERE GOES THE LOGIC OF FETCHING THE SHOW
  }, [id]);
  const data = SHOW_DETAILS;

  const [currentTab, setCurrentTab] = useState(0);
  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow bg-secondary-light"
      >
        <Image
          source={
            data.image?.medium || data.image?.original
              ? { uri: data.image?.original || data.image?.medium }
              : NoImageAvailable
          }
          className="aspect-[9/13] w-[100%]"
          resizeMode="cover"
        />
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
                content: <EpisodesTab data={data} />,
              },
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
}
