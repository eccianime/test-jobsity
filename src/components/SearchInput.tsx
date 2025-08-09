import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search?query=${searchText}`);
  };
  return (
    <View className="h-10 flex-row items-center overflow-hidden rounded-3xl">
      <View className="h-10 flex-1">
        <TextInput
          placeholder="Search Shows"
          placeholderTextColor={"#AAA"}
          className="h-full bg-white px-4 font-open-regular leading-5"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <TouchableOpacity
        className="h-[100%] w-[30%] items-center justify-center border border-primary-default bg-primary-default"
        onPress={handleSearch}
      >
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
