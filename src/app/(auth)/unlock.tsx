import PinInput from "@/components/auth/PinInput";
import colors from "@/config/colors";
import { SCREEN_COMPONENTS_TEST_IDS } from "@/utils/constants";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { FingerprintIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LogoSub from "../../assets/images/header-logo.png";
import Logo from "../../assets/images/logo-icon.png";

export default function Unlock() {
  const [supportsBio, setSupportsBio] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setSupportsBio(hasHardware && isEnrolled);
    })();
  }, []);

  const handleBiometric = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to unlock",
      fallbackLabel: "Use PIN",
    });
    if (result.success) {
      router.replace("/home");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary-default"
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              source={LogoSub}
              className="mx-auto -mt-10 mb-5 max-h-[200] max-w-[200]"
              resizeMode="contain"
            />
            <Text className="mx-6 mb-6 text-center font-open-bold text-2xl text-white">
              Enter your PIN to unlock the app
            </Text>
            <PinInput type="unlock" />
            {supportsBio && (
              <TouchableOpacity
                onPress={handleBiometric}
                className="mx-auto mt-6 w-[80%] flex-row items-center justify-center gap-4 rounded-full bg-white px-8 py-4"
              >
                <FingerprintIcon size={24} color={colors.primary.default} />
                <Text className="font-open-semibold text-2xl text-primary-default">
                  Use fingerprint/Face ID
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
