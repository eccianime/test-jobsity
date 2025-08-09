import ShowsList from "@/components/home/ShowsList";
import useShowPaginator from "@/hooks/useShowPaginator";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { render } from "@testing-library/react-native";

jest.mock("@/hooks/useShowPaginator");

jest.mock("@/components/LoadingScreen", () => {
  const MockLoadingScreen = () => <></>;
  MockLoadingScreen.displayName = "LoadingScreen";
  return MockLoadingScreen;
});

jest.mock("@/components/home/ShowsListFooter", () => {
  const MockShowsListFooter = () => <></>;
  MockShowsListFooter.displayName = "ShowsListFooter";
  return MockShowsListFooter;
});

jest.mock("@/components/home/ShowsListItem", () => {
  const MockShowsListItem = () => <></>;
  MockShowsListItem.displayName = "ShowsListItem";
  return MockShowsListItem;
});

describe("ShowsList", () => {
  it("should render LoadingScreen when isLoading is true", () => {
    (useShowPaginator as jest.Mock).mockReturnValue({
      isLoading: true,
      currentData: [],
      paginationNumbers: [],
      uiPage: 1,
      hasMore: true,
      goToPage: jest.fn(),
    });
    const { toJSON } = render(<ShowsList />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render FlatList with correct props", () => {
    const mockData = [
      { id: 1, name: "Show 1", image: {} },
      { id: 2, name: "Show 2", image: {} },
    ];
    (useShowPaginator as jest.Mock).mockReturnValue({
      isLoading: false,
      currentData: mockData,
      paginationNumbers: [1, 2],
      uiPage: 1,
      hasMore: true,
      goToPage: jest.fn(),
    });

    const { getByTestId } = render(<ShowsList />);
    expect(getByTestId(COMPONENTS_TEST_IDS.SHOWS_LIST)).toBeTruthy();
  });
});
