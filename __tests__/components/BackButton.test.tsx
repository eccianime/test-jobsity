import BackButton from "@/components/BackButton";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
  },
}));

describe("BackButton", () => {
  it("should render the button with the icon", () => {
    const { getByTestId } = render(<BackButton />);
    const button = getByTestId(COMPONENTS_TEST_IDS.BACK_BUTTON);
    expect(button).toBeTruthy();
  });

  it("should call router.back when the button is pressed", () => {
    const { router } = jest.requireMock("expo-router");
    const { getByTestId } = render(<BackButton />);
    const button = getByTestId(COMPONENTS_TEST_IDS.BACK_BUTTON);

    fireEvent.press(button);
    expect(router.back).toHaveBeenCalled();
  });
});
