import parse from "html-react-parser";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Done } from "@mui/icons-material";

import { Accommodation } from "../util/types";
import RoomCard from "./RoomCard";
import Rating from "./Rating";

interface Props {
  accommodation: Accommodation;
  backClickHandler: () => void;
}

const AccommodationFullDetails = ({
  accommodation,
  backClickHandler,
}: Props) => {
  const description: string | JSX.Element | JSX.Element[] = parse(
    accommodation.description
  );

  let address = "";
  if (accommodation.address_1) address += accommodation.address_1 + ", ";
  if (accommodation.address_2) address += accommodation.address_2 + ", ";
  if (accommodation.address_3) address += accommodation.address_3 + ", ";
  if (accommodation.postcode) address += accommodation.postcode;

  return (
    <Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "center", sm: "start" }}
      >
        <img
          src={accommodation.images[0].filename}
          alt={accommodation.images[0].alt}
          height={"150px"}
          width={"150px"}
        />
        <Stack spacing={4}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h4">{accommodation.name}</Typography>
            <Stack direction="row" spacing={8}>
              <Typography variant="h6">
                Type: {accommodation.type.name}
              </Typography>
              <Rating ratingId={accommodation.rating.id} orientation="row" />
            </Stack>
            <Typography variant="h6">Address: {address}</Typography>
            <Typography>{description}</Typography>
            <Stack>
              <Typography variant="h6">Facilities:</Typography>
              {accommodation.facilities.length > 0 ? (
                <Grid container>
                  {accommodation.facilities.map((facility, index) => (
                    <Grid item xs={12} sm={6} md={3} key={`facility-${index}`}>
                      <Stack direction="row" spacing={2}>
                        <Typography>{facility.label}</Typography>
                        <Done />
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography fontStyle="italic">Not specified</Typography>
              )}
            </Stack>
            <Stack>
              <Typography variant="h6">Room Types:</Typography>
              <Grid container spacing={2}>
                {accommodation.rooms.map((room, index) => (
                  <Grid item xs={12} sm={6} md={4} key={`room-card-${index}`}>
                    <RoomCard room={room} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            sx={{ width: "100px" }}
            size="large"
            onClick={backClickHandler}
          >
            Back
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AccommodationFullDetails;
