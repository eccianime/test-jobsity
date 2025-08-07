import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchInput from "./SearchInput";

export default function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View className="bg-secondary-dark p-4" style={{ paddingTop: top + 10 }}>
      <Image
        source={require("../assets/images/header-logo.png")}
        className="mb-6 h-[50] w-[158]"
      />
      <SearchInput />
    </View>
  );
}
