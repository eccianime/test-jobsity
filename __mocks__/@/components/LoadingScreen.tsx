import { Text, View } from "react-native";

const MockedLoadingScreen = () => (
  <View testID={`loading-item`}>
    <Text>Loading, please wait...</Text>
  </View>
);

export default MockedLoadingScreen;
