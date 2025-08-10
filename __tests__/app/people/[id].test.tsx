import People from "@/app/people/[id]";
import { useGetPeopleDetailsQuery } from "@/redux/services/people";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { render } from "@testing-library/react-native";

jest.mock("@/redux/services/people", () => ({
  useGetPeopleDetailsQuery: jest.fn(),
}));
jest.mock("@/components/BackButton", () => jest.fn(() => null));

jest.mock("@/components/person/PersonSeriesList", () => jest.fn(() => null));
jest.mock("@/utils", () => ({
  renderImage: jest.fn(() => ({ uri: "img" })),
}));

describe("People", () => {
  it("should show the LoadingScreen when isLoading is true", () => {
    (useGetPeopleDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });
    const { getByTestId } = render(<People />);
    expect(getByTestId(COMPONENTS_TEST_IDS.LOADING_SCREEN)).toBeTruthy();
  });

  it("should show 'no casted' text when there's no series in castcredits", () => {
    (useGetPeopleDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { name: "John Doe", image: {}, _embedded: { castcredits: [] } },
    });
    const { getByText } = render(<People />);
    expect(getByText("This person hasn't been cast in any shows")).toBeTruthy();
  });

  it("should show a list of series when there are castcredits", () => {
    (useGetPeopleDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { name: "John Doe", image: {}, _embedded: { castcredits: [{}] } },
    });
    const { getByText } = render(<People />);
    expect(getByText("Has worked on:")).toBeTruthy();
  });
});
