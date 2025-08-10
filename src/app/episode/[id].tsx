import BackButton from "@/components/BackButton";
import LoadingScreen from "@/components/LoadingScreen";
import { useGetEpisodeDetailsQuery } from "@/redux/services/episodes";
import { removeHtmlTags, renderImage } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { ImageBackground, Text, View } from "react-native";

export default function Episode() {
  const { id } = useLocalSearchParams();

  const { isLoading, data } = useGetEpisodeDetailsQuery({
    episodeId: id as string,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View className="flex-1 bg-secondary-light">
      <ImageBackground
        source={renderImage(data?.image)}
        className="aspect-video h-full max-w-[100%]"
      >
        <View className="absolute left-8 top-12">
          <BackButton />
        </View>
        <View className="mx-4 mb-6 mt-auto rounded-xl bg-white p-4">
          <Text className="mb-2 font-open-bold text-2xl text-primary-dark">
            {data?._links.show.name}
          </Text>
          <Text className="mb-2 font-open-semibold text-xl text-primary-default">
            {`S${data?.season} - E${data?.number}: ${data?.name}`}
          </Text>
          <Text className="mb-2 font-open-bold text-lg text-secondary-dark">
            Summary:
          </Text>
          <Text className="mb-6 text-justify font-open-regular leading-6 text-secondary-dark">
            {data?.summary
              ? removeHtmlTags(data.summary)
              : "No summary available"}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
