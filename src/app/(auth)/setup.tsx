import colors from "@/config/colors";
import { savePIN } from "@/storage";
import { router } from "expo-router";
import { LockIcon } from "phosphor-react-native";
import { useRef, useState } from "react";
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

export default function Setup() {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);

  const pinRefs = useRef<TextInput[]>([]);

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

  const isValidPin = () => {
    const fullPin = pin.join("");
    return fullPin.length === 4 && /^\d{4}$/.test(fullPin);
  };

  const handleSavePin = async () => {
    if (isValidPin()) {
      await savePIN(pin.join(""));
      router.replace("/unlock");
    } else {
      Alert.alert("Error", "Please enter a valid 4-digit PIN.");
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
              Set a four number PIN to prevent unauthorized users from accessing
              the app
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
            <TouchableOpacity
              onPress={handleSavePin}
              className="mx-auto mt-10 flex-row items-center justify-center gap-4 rounded-full bg-white px-8 py-4"
            >
              <LockIcon
                size={24}
                weight="fill"
                color={colors.primary.default}
              />
              <Text className="font-open-semibold text-2xl text-primary-default">
                Save PIN
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
