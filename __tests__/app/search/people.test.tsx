import SearchPeople from "@/app/search/people";
import { useGetPeopleByTermQuery } from "@/redux/services/search";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
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

jest.mock("@/components/search/NoResults", () =>
  jest.fn(() => {
    const { View } = jest.requireActual("react-native");
    const MockNoResults = () => <View testID="mock-no-results" />;
    MockNoResults.displayName = "mock-no-results";
    return <MockNoResults />;
  }),
);
jest.mock("@/components/search/PeopleList", () =>
  jest.fn(({ data }) => {
    const { View } = jest.requireActual("react-native");
    const MockPeopleList = ({ data }: any) => (
      <View testID="mock-people-list" data={data} />
    );
    MockPeopleList.displayName = "mock-people-list";
    return <MockPeopleList data={data} />;
  }),
);

jest.mock("@/redux/services/search", () => ({
  useGetPeopleByTermQuery: jest.fn(),
}));

describe("SearchPeople screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue({ query: "john" });
  });

  it("should render LoadingScreen when loading", () => {
    (useGetPeopleByTermQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
    });

    const { getByTestId } = render(<SearchPeople />);
    expect(getByTestId(COMPONENTS_TEST_IDS.LOADING_SCREEN)).toBeTruthy();
  });

  it("should render NoResults when no data", () => {
    (useGetPeopleByTermQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });

    const { getByTestId } = render(<SearchPeople />);
    expect(getByTestId("mock-no-results")).toBeTruthy();
  });

  it("should render PeopleList when data is present", () => {
    const mockData = [{ id: 1, name: "John Doe" }];
    (useGetPeopleByTermQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    const { getByTestId } = render(<SearchPeople />);
    expect(getByTestId("mock-people-list").props.data).toEqual(mockData);
  });

  it("should call useGetPeopleByTermQuery with search term", () => {
    (useGetPeopleByTermQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });

    render(<SearchPeople />);
    expect(useGetPeopleByTermQuery).toHaveBeenCalledWith({
      searchTerm: "john",
    });
  });
});
