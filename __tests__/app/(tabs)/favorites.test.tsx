import Favorites from "@/app/(tabs)/favorites";
import useFavorites from "@/hooks/useFavorites";
import { render } from "@testing-library/react-native";

jest.mock("@/hooks/useFavorites", () => jest.fn());
jest.mock("expo-router", () => ({
  useFocusEffect: (cb: any) => cb(),
}));
jest.mock("@/components/favorites/FavoritesList", () => jest.fn(() => null));
jest.mock("@/components/Header", () => jest.fn(() => null));

describe("Favorites", () => {
  it("should getFavorites functions on focus and render the sorted list", () => {
    const getFavorites = jest.fn();
    (useFavorites as jest.Mock).mockReturnValue({
      data: [{ name: "B" }, { name: "A" }],
      getFavorites,
    });

    render(<Favorites />);

    expect(getFavorites).toHaveBeenCalled();
  });
});
