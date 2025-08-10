import { usePinInput } from "@/hooks/usePinInput";
import { savePIN, validatePIN } from "@/storage";
import { router } from "expo-router";
import React from "react";
import { Alert, Button } from "react-native";

export default function PinInputMock({ type }: { type: "setup" | "unlock" }) {
  const { pin, isValidPin } = usePinInput();
  const pinString = pin.join("");

  const handlePress = async () => {
    if (type === "setup") {
      if (!isValidPin()) {
        Alert.alert("Error", "Please enter a valid 4-digit PIN.");
        return;
      }
      savePIN(pinString);
      router.replace("/unlock");
    } else {
      const isValid = await validatePIN(pinString);
      if (isValid) {
        router.replace("/home");
      } else {
        Alert.alert("Error", "Invalid PIN. Please try again.");
      }
    }
  };

  return (
    <Button
      title={type === "setup" ? "Save PIN" : "Unlock"}
      onPress={handlePress}
    />
  );
}
