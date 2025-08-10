import PinInput from "@/components/auth/PinInput";
import { usePinInput } from "@/hooks/usePinInput";
import { savePIN, validatePIN } from "@/storage";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

jest.mock("@/hooks/usePinInput", () => ({
  usePinInput: jest.fn(),
}));

jest.mock("@/storage", () => ({
  savePIN: jest.fn(),
  validatePIN: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
}));

jest.spyOn(Alert, "alert");

describe("PinInput", () => {
  const mockPinRefs = { current: [] };

  const setupMocks = (pin = ["", "", "", ""], isValid = true) => {
    (usePinInput as jest.Mock).mockReturnValue({
      pin,
      pinRefs: mockPinRefs,
      handleChange: jest.fn(),
      isValidPin: jest.fn(() => isValid),
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  it("should render Save PIN button when type='setup'", () => {
    const { getByText } = render(<PinInput type="setup" />);
    expect(getByText("Save PIN")).toBeTruthy();
  });

  it("should render Unlock button when type='unlock'", () => {
    const { getByText } = render(<PinInput type="unlock" />);
    expect(getByText("Unlock")).toBeTruthy();
  });

  it("should call savePIN function y navigate to /unlock when PIN is valid in setup", async () => {
    setupMocks(["1", "2", "3", "4"], true);
    const { getByText } = render(<PinInput type="setup" />);

    fireEvent.press(getByText("Save PIN"));

    await waitFor(() => {
      expect(savePIN).toHaveBeenCalledWith("1234");
      expect(router.replace).toHaveBeenCalledWith("/unlock");
    });
  });

  it("should show error alert if the PIN is not valid in setup", async () => {
    setupMocks(["1", "", "3", ""], false);
    const { getByText } = render(<PinInput type="setup" />);

    fireEvent.press(getByText("Save PIN"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Please enter a valid 4-digit PIN.",
      );
    });
  });

  it("should call validatePIN function and navigate to /home when the PIN is correct in unlock", async () => {
    (validatePIN as jest.Mock).mockResolvedValue(true);
    setupMocks(["1", "2", "3", "4"]);
    const { getByText } = render(<PinInput type="unlock" />);

    fireEvent.press(getByText("Unlock"));

    await waitFor(() => {
      expect(validatePIN).toHaveBeenCalledWith("1234");
      expect(router.replace).toHaveBeenCalledWith("/home");
    });
  });

  it("should show an alert if the PIN is incorrect in unlock", async () => {
    (validatePIN as jest.Mock).mockResolvedValue(false);
    setupMocks(["1", "2", "3", "4"]);
    const { getByText } = render(<PinInput type="unlock" />);

    fireEvent.press(getByText("Unlock"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Invalid PIN. Please try again.",
      );
    });
  });
});
