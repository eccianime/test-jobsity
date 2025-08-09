import colors from "@/config/colors";
import { TabElementsProps } from "@/types/components";
import { HeartIcon, PopcornIcon } from "phosphor-react-native";
import { Text } from "react-native";

export function TabBarLabel({ focused, route }: Readonly<TabElementsProps>) {
  return (
    <Text
      className={`${focused ? "font-open-bold text-primary-default" : "font-open-regular text-primary-dark"}`}
    >
      {route === "home" ? "Shows" : "Favorites"}
    </Text>
  );
}

export function TabBarIcon({ focused, route }: Readonly<TabElementsProps>) {
  const Icon = route === "home" ? PopcornIcon : HeartIcon;
  return (
    <Icon
      weight={focused ? "fill" : "regular"}
      size={24}
      color={focused ? colors.primary.default : colors.primary.dark}
    />
  );
}
