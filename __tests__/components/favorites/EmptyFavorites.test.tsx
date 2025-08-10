import EmptyFavorites from "@/components/favorites/EmptyFavorites";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";

describe("EmptyFavorites", () => {
  it("should render icon, message and button", () => {
    const { getByText, getByTestId } = render(<EmptyFavorites />);
    expect(getByTestId(COMPONENTS_TEST_IDS.EMPTY_FAVORITES_ICON)).toBeTruthy();
    expect(getByText("There are no favorites yet!")).toBeTruthy();
    expect(getByText("Go Back")).toBeTruthy();
  });

  it("should call router.back when pressing Go Back button", () => {
    const { getByText } = render(<EmptyFavorites />);
    fireEvent.press(getByText("Go Back"));
    expect(router.back).toHaveBeenCalled();
  });
});
