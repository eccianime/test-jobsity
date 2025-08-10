import Show from "@/app/show/[id]";
import useFavorites from "@/hooks/useFavorites";
import { useGetEpisodesListQuery } from "@/redux/services/episodes";
import { useGetShowDetailsQuery } from "@/redux/services/shows";
import { renderImage } from "@/utils";
import {
  COMPONENTS_TEST_IDS,
  SCREEN_COMPONENTS_TEST_IDS,
} from "@/utils/constants";
import { fireEvent, render } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";

jest.mock("@/components/BackButton", () => jest.fn(() => null));

jest.mock("@/components/show/ShowTabs", () =>
  jest.fn(({ tabs }) => {
    const { View } = jest.requireActual("react-native");
    const MockedShowTabs = ({ tabs }: any) => (
      <View testID={`mock-show-tabs`} tabs={tabs} />
    );
    MockedShowTabs.displayName = "MockedShowTabs";
    return <MockedShowTabs tabs={tabs} />;
  }),
);
jest.mock("@/components/show/InformationTab", () =>
  jest.fn(() => {
    const { View } = jest.requireActual("react-native");
    const MockedInformationTab = () => <View testID={`information-item`} />;
    MockedInformationTab.displayName = "MockedInformationTab";
    return <MockedInformationTab />;
  }),
);
jest.mock("@/components/show/EpisodesTab", () =>
  jest.fn(() => {
    const { View } = jest.requireActual("react-native");
    const MockedEpisodesTab = () => <View testID={`episodes-item`} />;
    MockedEpisodesTab.displayName = "MockedEpisodesTab";
    return <MockedEpisodesTab />;
  }),
);

jest.mock("@/hooks/useFavorites", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("@/redux/services/shows", () => ({
  useGetShowDetailsQuery: jest.fn(),
}));
jest.mock("@/redux/services/episodes", () => ({
  useGetEpisodesListQuery: jest.fn(),
}));

jest.mock("@/utils", () => ({
  renderImage: jest.fn(),
}));

describe("Show screen", () => {
  const mockAddToFavorites = jest.fn();
  const mockDeleteFromFavorites = jest.fn();
  const mockIsFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: "123" });
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: mockIsFavorite,
      addToFavorites: mockAddToFavorites,
      deleteFromFavorites: mockDeleteFromFavorites,
    });
    (renderImage as jest.Mock).mockReturnValue("mock-image");
  });

  it("should render LoadingScreen when loading", () => {
    (useGetShowDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
    });
    (useGetEpisodesListQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });

    const { getByTestId } = render(<Show />);
    expect(getByTestId(COMPONENTS_TEST_IDS.LOADING_SCREEN)).toBeTruthy();
  });

  it("should render image with correct source", () => {
    (useGetShowDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { id: "123", image: "some-image" },
    });
    (useGetEpisodesListQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });
    mockIsFavorite.mockReturnValue(false);

    const { getByTestId } = render(<Show />);
    const image = getByTestId(SCREEN_COMPONENTS_TEST_IDS.SHOW_IMAGE);
    expect(renderImage).toHaveBeenCalledWith("some-image");
    expect(image.props.source === "mock-image").toBe(true);
  });

  it("should call deleteFromFavorites if already favorite", () => {
    (useGetShowDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { id: "123", image: null },
    });
    (useGetEpisodesListQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });
    mockIsFavorite.mockReturnValue(true);

    const { getByTestId } = render(<Show />);
    fireEvent.press(
      getByTestId(SCREEN_COMPONENTS_TEST_IDS.DELETE_ADD_FAVORITE_BUTTON),
    );
    expect(mockDeleteFromFavorites).toHaveBeenCalledWith("123");
  });

  it("should call addToFavorites if not favorite", () => {
    const mockData = { id: "123", image: null };
    (useGetShowDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });
    (useGetEpisodesListQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });
    mockIsFavorite.mockReturnValue(false);

    const { getByTestId } = render(<Show />);
    fireEvent.press(
      getByTestId(SCREEN_COMPONENTS_TEST_IDS.DELETE_ADD_FAVORITE_BUTTON),
    );
    expect(mockAddToFavorites).toHaveBeenCalledWith(mockData);
  });

  it("should pass correct tabs to ShowTabs", () => {
    const mockData = { id: "123", image: null };
    const mockEpisodes = [{ season: 2 }, { season: 1 }];
    (useGetShowDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });
    (useGetEpisodesListQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockEpisodes,
    });
    mockIsFavorite.mockReturnValue(false);

    const { getByTestId } = render(<Show />);
    const tabsProp = getByTestId("mock-show-tabs").props.tabs;

    expect(tabsProp).toHaveLength(2);
    expect(tabsProp[0].name).toBe("Information");
    expect(tabsProp[1].name).toBe("Episodes");
    expect(tabsProp[1].content.props.data).toEqual([
      { season: 2 },
      { season: 1 },
    ]);
  });
});
