import React from "react";
import { render, screen } from "@testing-library/react";
import Rating, { NO_RATING_ID } from "./Rating";
import { Price, Room } from "../util/types";

describe("Rating component", () => {
  it("renders rating information", () => {
    render(<Rating ratingId={1} />);
    const ratingText = screen.getByText(/Rating:/i);
    const ratingImage = screen.getByRole("img");
    expect(ratingText).toBeInTheDocument();
    expect(ratingImage).toBeInTheDocument();
  });
  it("renders rating unavailable", () => {
    render(<Rating ratingId={NO_RATING_ID} />);
    const ratingUnavailable = screen.getByText(/Rating unavailable/i);
    expect(ratingUnavailable).toBeInTheDocument();
  });
});
