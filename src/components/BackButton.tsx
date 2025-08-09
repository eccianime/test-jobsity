import colors from "@/config/colors";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { router } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
  return (
    <TouchableOpacity
      testID={COMPONENTS_TEST_IDS.BACK_BUTTON}
      className="h-10 w-10 items-center justify-center rounded-full bg-black/50"
      onPress={() => router.back()}
    >
      <CaretLeftIcon color={colors.white} size={24} />
    </TouchableOpacity>
  );
}
