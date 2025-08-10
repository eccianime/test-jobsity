import PinInput from "@/components/auth/PinInput";
import { SCREEN_COMPONENTS_TEST_IDS } from "@/utils/constants";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LogoSub from "../../assets/images/header-logo.png";
import Logo from "../../assets/images/logo-icon.png";

export default function Setup() {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary-default"
      behavior="padding"
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        testID={SCREEN_COMPONENTS_TEST_IDS.TOUCHABLE_WITHOUT_FEEDBACK}
      >
        <ScrollView contentContainerClassName="flexGrow" className="flex-1">
          <View className="flex-1">
            <Image
              testID={SCREEN_COMPONENTS_TEST_IDS.TOP_LOGO}
              source={Logo}
              className="mx-auto mt-[20%] max-h-[200] max-w-[200]"
              resizeMode="contain"
            />
            <Image
              testID={SCREEN_COMPONENTS_TEST_IDS.LOGO_LETTERS}
              accessibilityRole="image"
              source={LogoSub}
              className="mx-auto -mt-10 mb-5 max-h-[200] max-w-[200]"
              resizeMode="contain"
            />
            <Text className="mx-6 mb-6 text-center font-open-bold text-2xl text-white">
              Set a four number PIN to prevent unauthorized users from accessing
              the app
            </Text>
            <PinInput type="setup" />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
