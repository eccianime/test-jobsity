import Setup from "@/app/(auth)/setup";
import { SCREEN_COMPONENTS_TEST_IDS } from "@/utils/constants";
import { fireEvent, render } from "@testing-library/react-native";
import { Keyboard } from "react-native";

jest.mock("@/components/auth/PinInput", () => {
  const { Text, View } = jest.requireActual("react-native");
  return jest.fn(({ type }) => (
    <View>
      {type === "setup" ? <Text>Save PIN</Text> : <Text>Unlock</Text>}
    </View>
  ));
});

describe("Setup Screen", () => {
  it("should render the main logo", () => {
    const { getByTestId } = render(<Setup />);
    const targetImage = getByTestId(SCREEN_COMPONENTS_TEST_IDS.TOP_LOGO);

    expect(targetImage).toBeTruthy();
  });

  it("should render the sub logo", () => {
    const { getByTestId } = render(<Setup />);
    const targetImage = getByTestId(SCREEN_COMPONENTS_TEST_IDS.LOGO_LETTERS);

    expect(targetImage).toBeTruthy();
  });

  it("should render the instruction text", () => {
    const { getByText } = render(<Setup />);
    expect(
      getByText(
        "Set a four number PIN to prevent unauthorized users from accessing the app",
      ),
    ).toBeTruthy();
  });

  it("should render PinInput with correct type", () => {
    const { getByText } = render(<Setup />);
    expect(getByText("Save PIN")).toBeVisible();
  });

  it("should dismiss keyboard when tapping outside", () => {
    const dismissSpy = jest.spyOn(Keyboard, "dismiss");
    const { getByTestId } = render(<Setup />);

    fireEvent.press(
      getByTestId(SCREEN_COMPONENTS_TEST_IDS.TOUCHABLE_WITHOUT_FEEDBACK),
    );

    expect(dismissSpy).toHaveBeenCalled();
  });
});
