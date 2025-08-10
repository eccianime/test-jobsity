import ShowsListFooter from "@/components/home/ShowsListFooter";
import { COMPONENTS_TEST_IDS } from "@/utils/constants";
import { fireEvent, render } from "@testing-library/react-native";

describe("ShowsListFooter", () => {
  const handleChangePage = jest.fn();

  const paginationNumbers = [1, 2, 3];

  it("should disable Previous button on first page", () => {
    const { getByTestId } = render(
      <ShowsListFooter
        paginationNumbers={paginationNumbers}
        currentPage={1}
        isLastPage={false}
        handleChangePage={handleChangePage}
      />,
    );
    const prevButton = getByTestId(COMPONENTS_TEST_IDS.FOOTER_PREVIOUS_BUTTON);
    expect(prevButton?.props?.accessibilityState?.disabled).toBe(true);
  });

  it("should disable Next button on last page", () => {
    const { getByTestId } = render(
      <ShowsListFooter
        paginationNumbers={paginationNumbers}
        currentPage={3}
        isLastPage={true}
        handleChangePage={handleChangePage}
      />,
    );
    const nextButton = getByTestId(COMPONENTS_TEST_IDS.FOOTER_NEXT_BUTTON);
    expect(nextButton?.props.accessibilityState?.disabled).toBe(true);
  });

  it("should call handleChangePage with correct page on button press", () => {
    const { getByTestId, getByText } = render(
      <ShowsListFooter
        paginationNumbers={paginationNumbers}
        currentPage={2}
        isLastPage={false}
        handleChangePage={handleChangePage}
      />,
    );

    fireEvent.press(getByTestId(COMPONENTS_TEST_IDS.FOOTER_PREVIOUS_BUTTON));
    expect(handleChangePage).toHaveBeenCalledWith(1);

    fireEvent.press(getByTestId(COMPONENTS_TEST_IDS.FOOTER_NEXT_BUTTON));
    expect(handleChangePage).toHaveBeenCalledWith(3);

    fireEvent.press(getByText("2"));
    expect(handleChangePage).toHaveBeenCalledWith(2);
  });
});
