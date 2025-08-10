import colors from "@/config/colors";
import { usePinInput } from "@/hooks/usePinInput";
import { savePIN, validatePIN } from "@/storage";
import { PinInputProps } from "@/types/components";
import { router } from "expo-router";
import { LockIcon, LockOpenIcon } from "phosphor-react-native";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PinInput({ type }: Readonly<PinInputProps>) {
  const { pin, pinRefs, handleChange, isValidPin } = usePinInput();

  const handlePress = () => {
    if (type === "setup") {
      return handleSavePin();
    }
    return handleUnlock();
  };

  const handleSavePin = async () => {
    if (isValidPin()) {
      await savePIN(pin.join(""));
      router.replace("/unlock");
    } else {
      Alert.alert("Error", "Please enter a valid 4-digit PIN.");
    }
  };

  const handleUnlock = async () => {
    if (await validatePIN(pin.join(""))) {
      router.replace("/home");
    } else {
      Alert.alert("Error", "Invalid PIN. Please try again.");
    }
  };

  const Icon = type === "setup" ? LockIcon : LockOpenIcon;

  return (
    <View>
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
        onPress={handlePress}
        className="mx-auto mt-10 w-[80%] flex-row items-center justify-center gap-4 rounded-full bg-white px-8 py-4"
      >
        <Icon size={24} color={colors.primary.default} />
        <Text className="font-open-semibold text-2xl text-primary-default">
          {type === "setup" ? "Save PIN" : "Unlock"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
