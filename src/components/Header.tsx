import { HeaderProps } from "@/types/components";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";
import SearchInput from "./SearchInput";

export default function Header({ isSearchResult = false }: HeaderProps) {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const lockApp = () => {
    router.replace("/auth/unlock");
  };
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
        <TouchableOpacity className="absolute right-3 top-3" onPress={lockApp}>
          <Ionicons name="lock-closed" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <SearchInput />
    </View>
  );
}
