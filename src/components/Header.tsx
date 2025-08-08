import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";
import SearchInput from "./SearchInput";

export default function Header({
  isSearchResult,
}: Readonly<{ isSearchResult: boolean }>) {
  const { top } = useSafeAreaInsets();
  return (
    <View className=" bg-secondary-dark p-4" style={{ paddingTop: top + 10 }}>
      <View className="items-center">
        {isSearchResult && (
          <View className="absolute left-0 top-0 ">
            <BackButton />
          </View>
        )}
        <Image
          source={require("../assets/images/header-logo.png")}
          className="mb-6 h-[50] w-[158]"
        />
      </View>
      <SearchInput />
    </View>
  );
}
