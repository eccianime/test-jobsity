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
    newPin[index] = text;
    setPin(newPin);

    if (text.length === 1 && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }

    if (text === "" && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }

    if (index === 3 && text.length === 1) {
      Keyboard.dismiss();
    }
  };

  return { pin, pinRefs, handleChange, isValidPin };
};
