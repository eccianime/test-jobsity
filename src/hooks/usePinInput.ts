import { useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";

export const usePinInput = () => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const pinRefs = useRef<TextInput[]>([]);

  const isValidPin = () => {
    const fullPin = pin.join("");
    return fullPin.length === 4 && /^\d{4}$/.test(fullPin);
  };

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    const newText = text.replace(/\D/g, "");
    newPin[index] = newText;
    setPin(newPin);

    if (newText.length === 1 && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }

    if (newText === "" && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }

    if (index === 3 && newText.length === 1) {
      Keyboard.dismiss();
    }
  };

  return { pin, pinRefs, handleChange, isValidPin };
};
