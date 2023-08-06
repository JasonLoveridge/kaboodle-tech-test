import React from "react";
import { render, screen } from "@testing-library/react";
import RoomCard from "./RoomCard";
import { Price, Room } from "../util/types";

const dummyRoom: Room = {
  id: 1,
  sort_order: 1,
  type_id: 1,
  max_occupancy: 5,
  min_occupancy: 1,
  number_of_nights: 7,
  type: "Test room type",
  name: "Test room name",
};

describe("Room card component", () => {
  it("renders room information", () => {
    render(<RoomCard room={dummyRoom} />);
    const roomName = screen.getByText(/Test room name/i);
    const roomType = screen.getByText(/Test room type/i);
    const availabilityUnknown = screen.getByText(/Availability unknown/i);
    const priceUnknown = screen.getByText(/Price: unknown/i);
    expect(roomName).toBeInTheDocument();
    expect(roomType).toBeInTheDocument();
    expect(availabilityUnknown).toBeInTheDocument();
    expect(priceUnknown).toBeInTheDocument();
  });

  it("renders availability when availability data is available", () => {
    const roomWithAvailability: Room = {
      number_available: 1,
      total_number: 5,
      ...dummyRoom,
    };
    render(<RoomCard room={roomWithAvailability} />);
    const availability = screen.getByText(/1 left out of 5/i);
    expect(availability).toBeInTheDocument();
  });

  it("renders price when price data is available", () => {
    const dummyPrice: Price = {
      value: 100,
      currency_id: 1,
      currency_iso_code: "GBP",
      currency_exponent: 1,
      price: "£100",
    };
    const roomWithPrice: Room = {
      price: dummyPrice,
      ...dummyRoom,
    };
    render(<RoomCard room={roomWithPrice} />);
    const price = screen.getByText(/£100/i);
    expect(price).toBeInTheDocument();
  });
});
