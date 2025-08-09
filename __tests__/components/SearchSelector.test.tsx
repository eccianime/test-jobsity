import SearchSelector from "@/components/SearchSelector";
import { fireEvent, render } from "@testing-library/react-native";

describe("SearchSelector", () => {
  it("should render correctly and responds to presses", () => {
    const changeTypeMock = jest.fn();
    const { getAllByRole } = render(
      <SearchSelector type="show" changeType={changeTypeMock} />,
    );

    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(2);

    fireEvent.press(buttons[1]);
    expect(changeTypeMock).toHaveBeenCalledWith("people");

    fireEvent.press(buttons[0]);
    expect(changeTypeMock).toHaveBeenCalledWith("show");
  });
});
