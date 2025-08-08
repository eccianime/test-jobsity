import { InformationTabProps } from "@/types/components";
import { removeHtmlTags } from "@/utils";
import React from "react";
import { Text, View } from "react-native";
import Badge from "../Badge";

export default function InformationTab({
  data,
}: Readonly<InformationTabProps>) {
  return (
    <View className="rounded-b-2xl bg-white p-4">
      <Text className="mb-4 font-open-bold text-2xl text-primary-default">
        {data.name}
      </Text>
      <Text className="mb-2 font-open-bold text-lg text-secondary-dark">
        Summary:
      </Text>
      <Text className="mb-6 text-justify font-open-regular leading-6 text-secondary-dark">
        {removeHtmlTags(data.summary)}
      </Text>
      <View className="mb-2 flex-row gap-2">
        <Text className="font-open-bold text-lg text-secondary-dark">
          Airs on:
        </Text>
        <View className="flex-row items-center gap-2">
          {data.schedule.days.map((day) => (
            <Badge content={day + "s"} key={day} />
          ))}
        </View>
      </View>
      <View className="mb-6">
        {Boolean(data.schedule.time) && (
          <View className="flex-row items-center gap-2">
            <Text className="font-open-bold text-lg text-secondary-dark">
              At:
            </Text>
            <Badge content={data.schedule.time} />
          </View>
        )}
      </View>
      <Text className="font-open-bold text-lg text-secondary-dark">
        Genres:
      </Text>
      <View className="flex-row gap-2">
        {data.genres.map((genre) => (
          <View className="my-2 flex-row items-center gap-2" key={genre}>
            <Badge content={genre} />
          </View>
        ))}
      </View>
    </View>
  );
}
