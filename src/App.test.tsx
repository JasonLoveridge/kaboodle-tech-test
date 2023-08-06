import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Top level app component", () => {
  it("renders app title", () => {
    render(<App />);
    const appTitle = screen.getByText(/Karoomdle/i);
    expect(appTitle).toBeInTheDocument();
  });
});
