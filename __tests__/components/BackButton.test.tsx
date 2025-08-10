import BackButton from "@/components/BackButton";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";

describe("BackButton", () => {
  it("should render the button with the icon", () => {
    const { getByTestId } = render(<BackButton />);
    const button = getByTestId(COMPONENTS_TEST_IDS.BACK_BUTTON);
    expect(button).toBeTruthy();
  });

  it("should call router.back when the button is pressed", () => {
    const { getByTestId } = render(<BackButton />);
    const button = getByTestId(COMPONENTS_TEST_IDS.BACK_BUTTON);

    fireEvent.press(button);
    expect(router.back).toHaveBeenCalled();
  });
});
