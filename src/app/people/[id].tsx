import BackButton from "@/components/BackButton";
import LoadingScreen from "@/components/LoadingScreen";
import PersonSeriesList from "@/components/person/PersonSeriesList";
import { useGetPeopleDetailsQuery } from "@/redux/services/people";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import NoImageAvailable from "../../assets/images/no_image.png";

export default function People() {
  const { id } = useLocalSearchParams();

  const { isLoading, data } = useGetPeopleDetailsQuery({
    peopleId: id as string,
  });

  if (isLoading) {
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
            data?.image?.original || data?.image?.medium
              ? { uri: data?.image?.original ?? data?.image?.medium }
              : NoImageAvailable
          }
          className="aspect-[9/13] h-auto max-w-[100%]"
          resizeMode="cover"
        />
        <View className="absolute left-8 top-12">
          <BackButton />
        </View>
        <View className="m-4 rounded-xl bg-white p-4">
          <Text className="mb-3 font-open-bold text-2xl text-primary-default">
            {data?.name}
          </Text>
          {data && data._embedded.castcredits.length > 0 ? (
            <View>
              <Text className="mb-2 font-open-bold text-lg text-secondary-dark">
                Has worked on:
              </Text>
              <PersonSeriesList data={data._embedded.castcredits} />
            </View>
          ) : (
            <Text className="font-open-bold text-lg text-secondary-dark">{`This person hasn't been cast in any shows`}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
