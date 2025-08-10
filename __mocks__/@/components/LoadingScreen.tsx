import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { Text, View } from "react-native";

const MockedLoadingScreen = () => (
  <View testID={COMPONENTS_TEST_IDS.LOADING_SCREEN}>
    <Text>Loading, please wait...</Text>
  </View>
);

export default MockedLoadingScreen;
