import colors from "@/config/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function LoadingScreen() {
  const degrees = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${degrees.value}deg` }],
      width: 100,
      height: 100,
    };
  });

  useEffect(() => {
    degrees.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [degrees]);
  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View style={animatedStyle}>
        <EvilIcons name="spinner-3" color={colors.primary.default} size={100} />
      </Animated.View>
      <Text className="text-center font-open-semibold text-2xl text-primary-default">
        Loading, please wait...
      </Text>
    </View>
  );
}
