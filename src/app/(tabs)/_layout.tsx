import { TabBarIcon, TabBarLabel } from "@/components/tabs";
import colors from "@/config/colors";
import { Tabs } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function TabLayout() {
  const tabBarLabel = useCallback(
    ({ focused, routeName }: { focused: boolean; routeName: string }) => (
      <TabBarLabel focused={focused} route={routeName} />
    ),
    [],
  );

  const tabBarIcon = useCallback(
    ({ focused, routeName }: { focused: boolean; routeName: string }) => (
      <TabBarIcon focused={focused} route={routeName} />
    ),
    [],
  );

  const tabBarButton = useCallback(
    (props: TouchableOpacityProps) => <TouchableOpacity {...props} />,
    [],
  );

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: { backgroundColor: colors.white },
        tabBarLabel: ({ focused }) =>
          tabBarLabel({ focused, routeName: route.name }),
        tabBarIcon: ({ focused }) =>
          tabBarIcon({ focused, routeName: route.name }),
        tabBarButton: (props) => tabBarButton(props as TouchableOpacityProps),
      })}
    />
  );
}
