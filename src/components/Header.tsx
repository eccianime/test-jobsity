import { HeaderProps } from "@/types/components";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { useRouter } from "expo-router";
import { LockIcon } from "phosphor-react-native";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";

export default function Header({
  isSearchResult = false,
  children,
}: Readonly<HeaderProps>) {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const lockApp = () => {
    router.replace("/unlock");
  };
  return (
    <View
      testID={COMPONENTS_TEST_IDS.HEADER}
      className=" bg-secondary-dark px-4 "
      style={{ paddingTop: top + 10 }}
    >
      <View className="items-center">
        {isSearchResult && (
          <View className="absolute left-2 top-2">
            <BackButton />
          </View>
        )}
        <Image
          source={require("../assets/images/header-logo.png")}
          className="mb-6 h-[50] w-[158]"
        />
        <TouchableOpacity
          testID={COMPONENTS_TEST_IDS.LOCK_BUTTON}
          className="absolute right-3 top-3"
          onPress={lockApp}
        >
          <LockIcon size={24} color="white" weight="fill" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}
