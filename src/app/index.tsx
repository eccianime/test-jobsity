import { Image } from "expo-image";
import { View } from "react-native";

import { getPIN } from "@/storage";
import { router } from "expo-router";
import { useEffect } from "react";
import SplashImage from "../assets/images/splash.png";

export default function Index() {
  useEffect(() => {
    (async () => {
      const [hasPin] = await Promise.all([
        getPIN(),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
      router.replace(hasPin ? "/unlock" : "/setup");
    })();
  }, []);
  return (
    <View className="flex-1">
      <Image
        transition={1000}
        source={SplashImage}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
