import Header from "@/components/Header";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe("Header", () => {
  const useRouterMock = useRouter as jest.Mock;
  const useSafeAreaInsetsMock = useSafeAreaInsets as jest.Mock;

  beforeEach(() => {
    useSafeAreaInsetsMock.mockReturnValue({
      top: 10,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });

  it("should render correctly with children", () => {
    useRouterMock.mockReturnValue({ replace: jest.fn() });
    const { getByTestId } = render(
      <Header isSearchResult={true}>
        <></>
      </Header>,
    );
    expect(getByTestId(COMPONENTS_TEST_IDS.HEADER)).toBeTruthy();
  });

  it("should call router.replace('/unlock') when lock icon pressed", () => {
    const replaceMock = jest.fn();
    useRouterMock.mockReturnValue({ replace: replaceMock });

    const { getByTestId } = render(<Header />);

    fireEvent.press(getByTestId(COMPONENTS_TEST_IDS.LOCK_BUTTON));
    expect(replaceMock).toHaveBeenCalledWith("/unlock");
  });
});
