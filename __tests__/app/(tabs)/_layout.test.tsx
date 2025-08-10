import TabLayout from "@/app/(tabs)/_layout";
import { render } from "@testing-library/react-native";

describe("TabLayout", () => {
  it("should render the initial tab", () => {
    const { toJSON } = render(<TabLayout />);
    expect(toJSON()).toMatchSnapshot();
  });
});
