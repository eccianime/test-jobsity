import FavoritesList from "@/components/favorites/FavoritesList";
import { ShowProps } from "@/types/schema";
import { render } from "@testing-library/react-native";

jest.mock("@/components/home/ShowsListItem", () => {
  const { Text } = jest.requireActual("react-native");
  const MockShowsListItem = ({ data, index }: any) => (
    <Text testID={`show-item-${index}`}>{data.name}</Text>
  );
  MockShowsListItem.displayName = "ShowsListItem";
  return MockShowsListItem;
});

jest.mock("@/components/favorites/EmptyFavorites", () => {
  const { Text } = jest.requireActual("react-native");
  const MockEmptyFavorites = () => <Text testID="empty-favorites" />;
  MockEmptyFavorites.displayName = "EmptyFavorites";
  return MockEmptyFavorites;
});

describe("FavoritesList", () => {
  it("renders empty component when data is empty", () => {
    const { getByTestId } = render(<FavoritesList data={[]} />);
    expect(getByTestId("empty-favorites")).toBeTruthy();
  });

  it("renders list items when data is present", () => {
    const testData: ShowProps[] = [
      {
        id: 1,
        name: "Show 1",
        image: { medium: "", original: "" },
        summary: "",
        genres: [],
        schedule: { time: "", days: [] },
      },
      {
        id: 2,
        name: "Show 2",
        image: { medium: "", original: "" },
        summary: "",
        genres: [],
        schedule: { time: "", days: [] },
      },
    ];

    const { getByTestId } = render(<FavoritesList data={testData} />);

    expect(getByTestId("show-item-0").props.children).toBe("Show 1");
    expect(getByTestId("show-item-1").props.children).toBe("Show 2");
  });
});
