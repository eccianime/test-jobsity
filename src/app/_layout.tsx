import "../config/global.css";

import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  useFonts,
} from "@expo-google-fonts/open-sans";

import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import colors from "../config/colors";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "open-sans-regular": OpenSans_400Regular,
    "open-sans-semibold": OpenSans_600SemiBold,
    "open-sans-bold": OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      />
    </>
  );
}
