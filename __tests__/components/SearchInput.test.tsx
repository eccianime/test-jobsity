import SearchInput from "@/components/SearchInput";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { fireEvent, render } from "@testing-library/react-native";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import React from "react";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe("SearchInput", () => {
  const useRouterMock = useRouter as jest.Mock;
  const useLocalSearchParamsMock = useLocalSearchParams as jest.Mock;
  const usePathnameMock = usePathname as jest.Mock;

  beforeEach(() => {
    useRouterMock.mockReturnValue({ push: jest.fn(), replace: jest.fn() });
    useLocalSearchParamsMock.mockReturnValue({});
    usePathnameMock.mockReturnValue("/");
  });

  it("should render placeholder based on type", () => {
    const { getByPlaceholderText } = render(<SearchInput type="people" />);
    expect(getByPlaceholderText("Search People")).toBeTruthy();
  });

  it("should update text input value on change", () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const input = getByPlaceholderText("Search Shows");
    fireEvent.changeText(input, "Test");
    expect(input.props.value).toBe("Test");
  });

  it("should call router.push if not in search path", () => {
    const router = { push: jest.fn(), replace: jest.fn() };
    useRouterMock.mockReturnValue(router);
    usePathnameMock.mockReturnValue("/home");

    const { getByTestId } = render(<SearchInput />);
    const button = getByTestId(COMPONENTS_TEST_IDS.SEARCH_BUTTON);
    fireEvent.press(button);

    expect(router.push).toHaveBeenCalled();
  });

  it("should call router.replace if already in search path", () => {
    const router = { push: jest.fn(), replace: jest.fn() };
    useRouterMock.mockReturnValue(router);
    usePathnameMock.mockReturnValue("/search/show");

    const { getByTestId } = render(<SearchInput />);
    const button = getByTestId(COMPONENTS_TEST_IDS.SEARCH_BUTTON);
    fireEvent.press(button);

    expect(router.replace).toHaveBeenCalled();
  });

  it("should update text input value if there's a query", () => {
    useLocalSearchParamsMock.mockReturnValue({ query: "simpleQuery" });
    const { getByPlaceholderText } = render(<SearchInput />);
    const input = getByPlaceholderText("Search Shows");
    expect(input.props.value).toBe("simpleQuery");
  });
});
