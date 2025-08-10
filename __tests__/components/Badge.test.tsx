import Badge from "@/components/Badge";
import { render } from "@testing-library/react-native";

describe("Badge", () => {
  it("should render correctly with given content", () => {
    const { getByText } = render(<Badge content="New Badge" />);
    expect(getByText("New Badge")).toBeTruthy();
  });

  it("should render empty string content without crashing", () => {
    const { getByText } = render(<Badge content="" />);
    expect(getByText("")).toBeTruthy();
  });

  it("should render numeric content correctly", () => {
    const { getByText } = render(<Badge content={123} />);
    expect(getByText("123")).toBeTruthy();
  });
});
