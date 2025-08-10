import Home from "@/app/(tabs)/home";
import { render } from "@testing-library/react-native";

jest.mock(
  "@/components/Header",
  () =>
    ({ children }: any) =>
      children,
);
jest.mock("@/components/ComposedSearch", () => jest.fn(() => null));
jest.mock("@/components/home/ShowsList", () => jest.fn(() => null));

describe("Home", () => {
  it("should render Header with Search and ShowsList", () => {
    const { toJSON } = render(<Home />);
    expect(toJSON()).toMatchSnapshot();
  });
});
