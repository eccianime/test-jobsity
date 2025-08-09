import ComposedSearch from "@/components/ComposedSearch";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { render } from "@testing-library/react-native";
import { usePathname } from "expo-router";

jest.mock("expo-router", () => ({
  usePathname: jest.fn(),
  useLocalSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe("ComposedSearch", () => {
  const usePathnameMock = usePathname as jest.Mock;

  it("should set initial search type to 'show'", () => {
    usePathnameMock.mockReturnValue("/home");
    const { getByTestId } = render(<ComposedSearch />);
    expect(getByTestId(COMPONENTS_TEST_IDS.SEARCH_SELECTOR)).toBeTruthy();
    expect(getByTestId(COMPONENTS_TEST_IDS.SEARCH_INPUT)).toBeTruthy();
  });

  it("should update search type based on pathname (this case = people)", () => {
    usePathnameMock.mockReturnValue("/search/people");
    const { getByTestId } = render(<ComposedSearch />);
    expect(getByTestId(COMPONENTS_TEST_IDS.SEARCH_SELECTOR)).toBeTruthy();
  });
});
