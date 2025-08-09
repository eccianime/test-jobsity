import colors from "@/config/colors";
import { SearchSelectorProps } from "@/types/components";
import { PersonIcon, PopcornIcon } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";

export default function SearchSelector({
  type,
  changeType,
  ...props
}: Readonly<SearchSelectorProps>) {
  return (
    <View
      {...props}
      className="mb-4 w-[30%] flex-row overflow-hidden rounded-3xl"
    >
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => changeType("show")}
        className={`h-10 flex-1 ${type === "show" ? "bg-primary-default" : "bg-white"} flex-row items-center justify-center gap-2`}
      >
        <PopcornIcon
          size={24}
          color={type === "show" ? colors.white : colors.primary.default}
        />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => changeType("people")}
        className={`h-10 flex-1 ${type === "people" ? "bg-primary-default" : "bg-white"} flex-row items-center justify-center gap-2`}
      >
        <PersonIcon
          size={24}
          color={type === "people" ? colors.white : colors.primary.default}
        />
      </TouchableOpacity>
    </View>
  );
}
