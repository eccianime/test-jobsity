import * as SecureStore from "expo-secure-store";

const TOKEN_NAME = "USER_PIN";

export const savePIN = async (pin: string) => {
  await SecureStore.setItemAsync(TOKEN_NAME, pin);
};

export const getPIN = async () => {
  return await SecureStore.getItemAsync(TOKEN_NAME);
};

export const validatePIN = async (input: string) => {
  const savedPin = await getPIN();
  return savedPin === input;
};
