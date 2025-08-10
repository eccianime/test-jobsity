import Episode from "@/app/episode/[id]";
import { useGetEpisodeDetailsQuery } from "@/redux/services/episodes";
import { render } from "@testing-library/react-native";

jest.mock("@/redux/services/episodes", () => ({
  useGetEpisodeDetailsQuery: jest.fn(),
}));
jest.mock("expo-router/build/hooks", () => ({
  useLocalSearchParams: () => ({ id: "1" }),
}));
jest.mock("@/components/BackButton", () => jest.fn(() => null));
jest.mock("@/components/LoadingScreen", () => {
  const { View } = jest.requireActual("react-native");
  const MockedLoadingScreen = () => <View testID={`loading-item`} />;
  MockedLoadingScreen.displayName = "MockedLoadingScreen";
  return MockedLoadingScreen;
});
jest.mock("@/utils", () => ({
  renderImage: jest.fn(() => ({ uri: "test" })),
  removeHtmlTags: jest.fn((txt) => txt),
}));

describe("Episode", () => {
  it("should show LoadingScreen when isLoading is true", () => {
    (useGetEpisodeDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });
    const { getByTestId } = render(<Episode />);
    expect(getByTestId("loading-item")).toBeTruthy();
  });

  it("should show the details when there's any data", () => {
    (useGetEpisodeDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        _links: { show: { name: "Test Show" } },
        season: 1,
        number: 2,
        name: "Episode Name",
        summary: "Some summary",
        image: {},
      },
    });
    const { getByText } = render(<Episode />);
    expect(getByText("Test Show")).toBeTruthy();
    expect(getByText("S1 - E2: Episode Name")).toBeTruthy();
  });
});
