import colors from "@/config/colors";
import { validatePIN } from "@/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Logo from "../../assets/images/adaptive-icon.png";
import LogoSub from "../../assets/images/header-logo.png";

export default function Unlock() {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const pinRefs = useRef<TextInput[]>([]);
  const [supportsBio, setSupportsBio] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setSupportsBio(hasHardware && isEnrolled);
    })();
  }, []);

  const handleUnlock = async () => {
    if (await validatePIN(pin.join(""))) {
      router.replace("/home");
    } else {
      Alert.alert("Error", "Invalid PIN. Please try again.");
    }
  };

  const handleBiometric = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autentícate",
      fallbackLabel: "Usar PIN",
    });
    if (result.success) {
      router.replace("/home");
    }
  };

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text.length === 1 && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }

    if (text === "") {
      pinRefs.current[index - 1]?.focus();
    }

    if (index === 3 && text.length === 1) {
      Keyboard.dismiss();
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
              source={Logo}
              className="mx-auto mt-[20%] max-h-[200] max-w-[200]"
              resizeMode="contain"
            />
            <Image
              source={LogoSub}
              className="mx-auto -mt-10 mb-5 max-h-[200] max-w-[200]"
              resizeMode="contain"
            />
            <Text className="mx-6 mb-6 text-center font-open-bold text-2xl text-white">
              Enter your PIN to unlock the app
            </Text>
            <View className="mx-auto flex-row gap-5">
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(el) => {
                    pinRefs.current[index] = el as TextInput;
                  }}
                  maxLength={1}
                  value={pin[index]}
                  className="w-10 border-b-[2px] border-primary-dark text-center font-open-bold text-4xl text-white"
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange(text, index)}
                  accessibilityLabel={`Dígit ${index + 1} for PIN`}
                />
              ))}
            </View>
            <View className="mx-auto w-[80%]">
              <TouchableOpacity
                onPress={handleUnlock}
                className="mt-10 w-full flex-row items-center justify-center gap-4 rounded-full bg-white px-8 py-4"
              >
                <Ionicons
                  name="lock-open"
                  size={24}
                  color={colors.primary.default}
                />
                <Text className="font-open-semibold text-2xl text-primary-default">
                  Unlock App
                </Text>
              </TouchableOpacity>
              {supportsBio && (
                <TouchableOpacity
                  onPress={handleBiometric}
                  className="mt-6 w-full flex-row items-center justify-center gap-4 rounded-full bg-white px-8 py-4"
                >
                  <Ionicons
                    name="finger-print"
                    size={24}
                    color={colors.primary.default}
                  />
                  <Text className="font-open-semibold text-2xl text-primary-default">
                    Use fingerprint/Face ID
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
