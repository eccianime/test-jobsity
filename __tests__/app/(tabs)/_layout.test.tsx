import TabLayout from "@/app/(tabs)/_layout";
import { render } from "@testing-library/react-native";

jest.mock("expo-router", () => ({
  Tabs: jest.fn(() => null),
  useContextKey: jest.fn(),
}));

jest.mock("@/components/tabs", () => ({
  TabBarIcon: jest.fn(() => null),
  TabBarLabel: jest.fn(() => null),
}));

describe("TabLayout", () => {
  it("should render the initial tab", () => {
    const { toJSON } = render(<TabLayout />);
    expect(toJSON()).toMatchSnapshot();
  });
});
