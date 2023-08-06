import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AccommodationFullDetails from "./AccommodationFullDetails";
import { Accommodation, Price, Room } from "../util/types";

const dummyAccommodation: Accommodation = {
  id: 1,
  sort_order: 1,
  name: "Test Property Name",
  type: {
    id: 1,
    name: "Hotel",
  },
  description: "Test property description",
  address_1: "123 Test Lane",
  address_2: "",
  address_3: "Test Town",
  postcode: "AB12 C34",
  country: {
    id: 1,
    name: "United Kingdom",
  },
  resort: {
    id: 1,
    name: "Test Resort",
  },
  location: {
    id: 1,
    location_long: 11.86708005850528,
    location_lat: 47.1726510645752,
    name: "Test Property Location",
  },
  images: [
    {
      alt: "Dummy Image",
      title: "Dummy Image",
      filename: "https://via.placeholder.com/500/EE5E55/ffffff/?text=Kaboodle",
    },
  ],
  rating: {
    id: 1,
    label: "1*",
  },
  facilities: [
    {
      id: 1,
      label: "WiFi",
    },
  ],
  rooms: [
    {
      id: 129,
      sort_order: 450,
      type_id: 22,
      max_occupancy: 2,
      min_occupancy: 2,
      number_of_nights: 5,
      type: "Single",
      name: "Test Room A",
    },
    {
      id: 130,
      sort_order: 0,
      type_id: 4,
      max_occupancy: 3,
      min_occupancy: 3,
      number_of_nights: 5,
      type: "Double",
      name: "Test Room B",
    },
  ],
};

describe("Accommodation full details component", () => {
  const testBackClickHandler = jest.fn();
  it("renders accommodation details", () => {
    render(
      <AccommodationFullDetails
        accommodation={dummyAccommodation}
        backClickHandler={testBackClickHandler}
      />
    );
    const accommodationName = screen.getByText(/Test Property Name/i);
    const facility = screen.getByText(/WiFi/i);
    const roomA = screen.getByText(/Test Room A/i);
    const roomB = screen.getByText(/Test Room B/i);
    expect(accommodationName).toBeInTheDocument();
    expect(facility).toBeInTheDocument();
    expect(roomA).toBeInTheDocument();
    expect(roomB).toBeInTheDocument();
  });

  it("calls back click handler when back is clicked", () => {
    render(
      <AccommodationFullDetails
        accommodation={dummyAccommodation}
        backClickHandler={testBackClickHandler}
      />
    );
    const backButton = screen.getByText(/Back/i);
    fireEvent.click(backButton);
    expect(testBackClickHandler).toHaveBeenCalled();
  });
});
