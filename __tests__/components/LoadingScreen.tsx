import LoadingScreen from "@/components/LoadingScreen";
import { render } from "@testing-library/react-native";
import React from "react";

describe("LoadingScreen", () => {
  it("should render spinner and text", () => {
    const { getByText } = render(<LoadingScreen />);
    expect(getByText("Loading, please wait...")).toBeTruthy();
  });
});
