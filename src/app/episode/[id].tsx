import LoadingScreen from "@/components/LoadingScreen";
import colors from "@/config/colors";
import { useGetEpisodeDetailsQuery } from "@/redux/services/episodes";
import { removeHtmlTags } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Image, Pressable, Text, View } from "react-native";
import NoImageAvailable from "../../assets/images/no_image_horizontal.png";

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
      <Image
        source={
          Boolean(data?.image?.original || data?.image?.medium)
            ? { uri: data?.image?.original || data?.image?.medium }
            : NoImageAvailable
        }
        className="aspect-video max-h-[300] max-w-[100%]"
      />
      <Pressable className="absolute left-8 top-12 h-10 w-10 items-center justify-center rounded-full bg-black/50">
        <Ionicons
          color={colors.white}
          size={24}
          name="chevron-back-outline"
          onPress={() => router.back()}
        />
      </Pressable>
      <View className="m-4 rounded-xl bg-white p-4">
        <Text className="mb-2 text-xl font-semibold text-primary-default">
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
    </View>
  );
}
