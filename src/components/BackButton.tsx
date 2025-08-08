import colors from "@/config/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
  return (
    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-black/50">
      <Ionicons
        color={colors.white}
        size={24}
        name="chevron-back-outline"
        onPress={() => router.back()}
      />
    </TouchableOpacity>
  );
}
