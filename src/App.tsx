import React, { useMemo, useState } from "react";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import accommodationData from "./data/accommodation.json";
import roomData from "./data/accommodation_availability.json";

import AccommodationCard from "./components/AccommodationCard";
import AccommodationFullDetails from "./components/AccommodationFullDetails";

import { Accommodation, Room, RoomAvailability } from "./util/types";

const PAGE_SIZE = 12;

function App() {
  const accommodations: Accommodation[] = useMemo(() => {
    const enrichedAccommodations = accommodationData.accommodations.map(
      (accommodation: Accommodation) => {
        let enrichedAccommodation = { ...accommodation };

        enrichedAccommodation.rooms = accommodation.rooms.map(
          (accommodationRoom: Room) => {
            let enrichedRoom = { ...accommodationRoom };
            const roomAvailability: RoomAvailability | undefined =
              roomData.rooms.find((room) => room.id === accommodationRoom.id);

            enrichedRoom.number_available = roomAvailability
              ? roomAvailability.available
              : undefined;
            enrichedRoom.total_number = roomAvailability
              ? roomAvailability.total
              : undefined;

            return enrichedRoom;
          }
        );

        return enrichedAccommodation;
      }
    );
    return enrichedAccommodations;
  }, [accommodationData]);

  const [view, setView] = useState<"list" | "single">("list");
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation>();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleShowAvailableOnlyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowAvailableOnly(event.target.checked);
    setCurrentPage(1);
  };

  const handleMinRatingFilterChange = (event: SelectChangeEvent) => {
    setMinRating(parseInt(event.target.value));
    setCurrentPage(1);
  };

  let filteredAccommodations = accommodations;
  if (showAvailableOnly) {
    filteredAccommodations = filteredAccommodations.filter((accommodation) => {
      return accommodation.rooms.some(
        (room) => room.number_available && room.number_available > 0
      );
    });
  }
  if (minRating > 0) {
    filteredAccommodations = filteredAccommodations.filter((accommodation) => {
      return (
        accommodation.rating.id !== 9 && accommodation.rating.id >= minRating
      );
    });
  }
  let currentAccommodations = filteredAccommodations.slice(
    PAGE_SIZE * (currentPage - 1),
    PAGE_SIZE * currentPage
  );
  const numberOfPages = Math.ceil(filteredAccommodations.length / PAGE_SIZE);

  return (
    <Stack sx={{ alignItems: "center", margin: "48px 96px" }}>
      <Typography variant="h2" sx={{ marginBottom: "24px" }}>
        Karoomdle
      </Typography>
      {view === "list" && (
        <>
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 4 }}
            >
              <Stack>
                <InputLabel id="minimum-rating-select-label">
                  Minimum rating
                </InputLabel>
                <Select
                  labelId="minimum-rating-select-label"
                  value={minRating.toString()}
                  onChange={handleMinRatingFilterChange}
                  size="small"
                >
                  <MenuItem value={0}>Any</MenuItem>
                  <MenuItem value={1}>1 star</MenuItem>
                  <MenuItem value={2}>2 stars</MenuItem>
                  <MenuItem value={3}>3 stars</MenuItem>
                  <MenuItem value={4}>4 stars</MenuItem>
                  <MenuItem value={5}>5 stars</MenuItem>
                </Select>
              </Stack>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showAvailableOnly}
                      onChange={handleShowAvailableOnlyChange}
                    />
                  }
                  labelPlacement="top"
                  label="Show properties with availability only"
                />
              </FormGroup>
            </Stack>
            {numberOfPages > 1 && (
              <Pagination
                count={numberOfPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            )}
            <Stack>
              {currentAccommodations.length > 0 ? (
                <Grid container spacing={4}>
                  {currentAccommodations.map((accommodation, index) => (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      key={`accommodation-card-${index}`}
                    >
                      <AccommodationCard
                        accommodation={accommodation}
                        viewDetailsClickHandler={() => {
                          setView("single");
                          setSelectedAccommodation(accommodation);
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography fontStyle={"italic"}>
                  No results available
                </Typography>
              )}
            </Stack>
            {numberOfPages > 1 && (
              <Pagination
                count={numberOfPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            )}
          </Stack>
        </>
      )}
      {view === "single" && selectedAccommodation && (
        <AccommodationFullDetails
          accommodation={selectedAccommodation}
          backClickHandler={() => {
            setView("list");
          }}
        />
      )}
    </Stack>
  );
}

export default App;
