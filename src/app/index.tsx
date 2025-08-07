import { Image, View } from "react-native";

import { router } from "expo-router";
import { useEffect } from "react";
import SplashImage from "../assets/images/splash.png";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View className="flex-1">
      <Image source={SplashImage} style={{ width: "100%", height: "100%" }} />
    </View>
  );
}
