import SearchShows from "@/app/search/show";
import { useGetShowsByTermQuery } from "@/redux/services/search";
import { render } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";

jest.mock("@/components/ComposedSearch", () =>
  jest.fn(() => {
    const { View } = jest.requireActual("react-native");
    const MockComposedSearch = () => <View testID="mock-composed-search" />;
    MockComposedSearch.displayName = "mock-composed-search";
    return <MockComposedSearch />;
  }),
);

jest.mock("@/components/Header", () =>
  jest.fn(({ children }) => {
    const { View } = jest.requireActual("react-native");
    const MockHeader = ({ children }: any) => (
      <View testID="mock-header">{children}</View>
    );
    MockHeader.displayName = "mock-header";
    return <MockHeader>{children}</MockHeader>;
  }),
);

jest.mock("@/components/LoadingScreen", () =>
  jest.fn(() => {
    const { View } = jest.requireActual("react-native");
    const MockLoadingScreen = () => <View testID="mock-loading-screen" />;
    MockLoadingScreen.displayName = "mock-loading-screen";
    return <MockLoadingScreen />;
  }),
);
jest.mock("@/components/search/NoResults", () =>
  jest.fn(() => {
    const { View } = jest.requireActual("react-native");
    const MockNoResults = () => <View testID="mock-no-results" />;
    MockNoResults.displayName = "mock-no-results";
    return <MockNoResults />;
  }),
);
jest.mock("@/components/search/SearchList", () =>
  jest.fn(({ data }) => {
    const { View } = jest.requireActual("react-native");
    const MockSearchList = ({ data }: any) => (
      <View testID="mock-search-list" data={data} />
    );
    MockSearchList.displayName = "mock-search-list";
    return <MockSearchList data={data} />;
  }),
);

jest.mock("@/redux/services/search", () => ({
  useGetShowsByTermQuery: jest.fn(),
}));
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

describe("SearchShows screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      query: "breaking bad",
    });
  });

  it("should render LoadingScreen when loading", () => {
    (useGetShowsByTermQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
    });

    const { getByTestId } = render(<SearchShows />);
    expect(getByTestId("mock-loading-screen")).toBeTruthy();
  });

  it("should render NoResults when no data", () => {
    (useGetShowsByTermQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });

    const { getByTestId } = render(<SearchShows />);
    expect(getByTestId("mock-no-results")).toBeTruthy();
  });

  it("should render SearchList when data is present", () => {
    const mockData = [{ id: 1, title: "Breaking Bad" }];
    (useGetShowsByTermQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    const { getByTestId } = render(<SearchShows />);
    expect(getByTestId("mock-search-list").props.data).toEqual(mockData);
  });

  it("should call useGetShowsByTermQuery with search term", () => {
    (useGetShowsByTermQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });

    render(<SearchShows />);
    expect(useGetShowsByTermQuery).toHaveBeenCalledWith({
      searchTerm: "breaking bad",
    });
  });
});
