import { SearchInputProps } from "@/types/components";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function SearchInput({
  type = "show",
  ...props
}: Readonly<SearchInputProps>) {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const params = useLocalSearchParams();
  const path = usePathname();

  const handleSearch = () => {
    const pathConfig = {
      pathname: `/search/${type}` as const,
      params: { query: searchText },
    };

    if (path.includes("search")) {
      return router.replace(pathConfig);
    }
    router.push(pathConfig);
  };

  useEffect(() => {
    if (params?.query) {
      setSearchText(params.query as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View
      {...props}
      className="h-10 flex-1 flex-row items-center overflow-hidden rounded-3xl"
    >
      <View className="h-10 flex-1">
        <TextInput
          placeholder={`Search ${type === "show" ? "Shows" : "People"}`}
          placeholderTextColor={"#AAA"}
          className="h-full bg-white px-4 font-open-regular leading-5"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <TouchableOpacity
        testID={COMPONENTS_TEST_IDS.SEARCH_BUTTON}
        className="h-[100%] w-[25%] items-center justify-center border border-primary-default bg-primary-default"
        onPress={handleSearch}
      >
        <MagnifyingGlassIcon size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
