import ShowItem from "@/components/home/ShowsListItem";
import { ShowProps } from "@/types/schema";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

const sampleShow: ShowProps = {
  id: 123,
  name: "Test Show",
  image: {
    original: "https://example.com/image.jpg",
    medium: "https://example.com/medium-image.jpg",
  },
  summary: "This is a test show",
  genres: [],
  schedule: { time: "", days: [] },
};

const noImageSampleShow: ShowProps = {
  ...sampleShow,
  image: {
    original: "",
    medium: "",
  },
};

const mediumImageSampleShow: ShowProps = {
  ...sampleShow,
  image: {
    original: "",
    medium: "https://example.com/medium-image.jpg",
  },
};

describe("ShowItem", () => {
  it("should render show name and image", () => {
    const { getByText, getByLabelText } = render(
      <ShowItem data={sampleShow} index={0} />,
    );

    expect(getByText("Test Show")).toBeTruthy();
    expect(getByLabelText("Poster for Test Show")).toBeTruthy();
  });

  it("should call router.push with correct URL on press", () => {
    const { getByRole } = render(<ShowItem data={sampleShow} index={0} />);

    fireEvent.press(getByRole("button"));
    expect(router.push).toHaveBeenCalledWith("/show/123");
  });

  it("should render not available image", () => {
    const { getByLabelText } = render(
      <ShowItem data={noImageSampleShow} index={0} />,
    );

    const Image = getByLabelText("Poster for Test Show");
    expect(Image.props.source.testUri).toContain("no_image.png");
  });

  it("should render medium image", () => {
    const { getByLabelText } = render(
      <ShowItem data={mediumImageSampleShow} index={0} />,
    );

    const Image = getByLabelText("Poster for Test Show");
    expect(Image.props.source.uri).toContain("medium-image.jpg");
  });
});
