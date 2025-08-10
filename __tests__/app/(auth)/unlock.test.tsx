import Unlock from "@/app/(auth)/unlock";
import { SCREEN_COMPONENTS_TEST_IDS } from "@/utils/constants";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";

describe("Unlock screen", () => {
  let mockReplace: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  it("should render logos and instruction text", () => {
    (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(
      false,
    );
    (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(false);

    const { getByTestId, getByText } = render(<Unlock />);

    const logo = getByTestId(SCREEN_COMPONENTS_TEST_IDS.TOP_LOGO);
    const logoSub = getByTestId(SCREEN_COMPONENTS_TEST_IDS.LOGO_LETTERS);
    expect(logo).toBeTruthy();
    expect(logoSub).toBeTruthy();

    expect(getByText("Enter your PIN to unlock the app")).toBeTruthy();
  });

  it("should render PinInput with correct type", () => {
    const { getByText } = render(<Unlock />);
    expect(getByText("Unlock")).toBeVisible();
  });

  it("should show biometric button if supported and enrolled", async () => {
    (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
    (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);

    const { getByText } = render(<Unlock />);
    await waitFor(() => {
      expect(getByText("Use fingerprint/Face ID")).toBeTruthy();
    });
  });

  it("should not show biometric button if not supported", async () => {
    (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(
      false,
    );
    (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(false);

    const { queryByText } = render(<Unlock />);
    await waitFor(() => {
      expect(queryByText("Use fingerprint/Face ID")).toBeNull();
    });
  });

  it("should navigate to /home after successful biometric auth", async () => {
    (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
    (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
    (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { getByText } = render(<Unlock />);
    const button = await waitFor(() => getByText("Use fingerprint/Face ID"));

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/home");
    });
  });

  it("should not navigate if biometric auth fails", async () => {
    (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
    (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
    (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({
      success: false,
    });

    const { getByText } = render(<Unlock />);
    const button = await waitFor(() => getByText("Use fingerprint/Face ID"));

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });
});
