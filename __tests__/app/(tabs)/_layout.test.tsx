import TabLayout from "@/app/(tabs)/_layout";
import { render } from "@testing-library/react-native";

const MockedTabs = jest.fn(() => null) as jest.Mock;

jest.mock("expo-router", () => ({
  Tabs: MockedTabs,
}));

jest.mock("@/components/tabs", () => ({
  TabBarIcon: jest.fn(() => null),
  TabBarLabel: jest.fn(() => null),
}));

describe("TabLayout", () => {
  it("should configure Tabs with the correct screenOptions", () => {
    render(<TabLayout />);
    expect(MockedTabs).toHaveBeenCalledWith(
      expect.objectContaining({
        screenOptions: expect.any(Function),
      }),
    );

    const optionsFn = MockedTabs.mock.calls[0][0].screenOptions;
    const opts = optionsFn({ route: { name: "home" } });

    expect(opts.headerShown).toBe(false);
    expect(typeof opts.tabBarLabel).toBe("function");
    expect(typeof opts.tabBarIcon).toBe("function");
    expect(typeof opts.tabBarButton).toBe("function");
  });
});
