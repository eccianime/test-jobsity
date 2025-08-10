import Index from "@/app/index";
import { getPIN } from "@/storage";
import { SCREEN_COMPONENTS_TEST_IDS } from "@/utils/constants";
import { act, render } from "@testing-library/react-native";
import { router } from "expo-router";

jest.mock("expo-image", () => ({
  Image: ({ source, ...props }: any) => {
    const { Image } = jest.requireActual("expo-image");
    const MockedImage = () => <Image source={source} {...props} />;
    MockedImage.displayName = "mock-image";
    return <MockedImage source={source} {...props} />;
  },
}));
jest.mock("@/storage", () => ({
  getPIN: jest.fn(),
}));

describe("Index Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it("renders splash image", () => {
    (getPIN as jest.Mock).mockResolvedValue(null);
    const { getByTestId } = render(<Index />);
    const image = getByTestId(SCREEN_COMPONENTS_TEST_IDS.SPLASH_IMAGE);
    expect(image).toBeTruthy();
  });

  it("navigates to /unlock if PIN exists", async () => {
    (getPIN as jest.Mock).mockResolvedValue("1234");

    render(<Index />);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(getPIN).toHaveBeenCalledTimes(1);
    expect(router.replace).toHaveBeenCalledWith("/unlock");
  });

  it("navigates to /setup if no PIN exists", async () => {
    (getPIN as jest.Mock).mockResolvedValue(null);

    render(<Index />);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(getPIN).toHaveBeenCalledTimes(1);
    expect(router.replace).toHaveBeenCalledWith("/setup");
  });

  it("waits at least 2 seconds before navigating", async () => {
    (getPIN as jest.Mock).mockResolvedValue("1234");

    render(<Index />);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(router.replace).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(router.replace).toHaveBeenCalledWith("/unlock");
  });
});
