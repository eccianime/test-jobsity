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
      <TextInput
        placeholder="Search Shows"
        placeholderTextColor={"#AAA"}
        className="flex-1 bg-white px-4 py-3 font-open-sans-regular"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity
        className="h-[100%] w-[30%] items-center justify-center border border-primary-default bg-primary-default"
        onPress={handleSearch}
      >
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
