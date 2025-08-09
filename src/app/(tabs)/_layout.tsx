import colors from "@/config/colors";
import { Tabs } from "expo-router";
import { HeartIcon, PopcornIcon } from "phosphor-react-native";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused }) => (
          <Text
            className={`${focused ? "font-open-bold text-primary-default" : "font-open-regular text-primary-dark"}`}
          >
            {route.name === "home" ? "Shows" : "Favorites"}
          </Text>
        ),
        tabBarIcon: ({ focused }) => {
          const Icon = route.name === "home" ? PopcornIcon : HeartIcon;
          return (
            <Icon
              weight={focused ? "fill" : "regular"}
              size={24}
              color={focused ? colors.primary.default : colors.primary.dark}
            />
          );
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...(props as TouchableOpacityProps)} />
        ),
      })}
    />
  );
}
