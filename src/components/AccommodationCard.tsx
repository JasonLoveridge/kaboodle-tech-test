import React, { useState } from "react";
import parse from "html-react-parser";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { Accommodation } from "../util/types";
import Rating from "./Rating";

interface Props {
  accommodation: Accommodation;
  viewDetailsClickHandler: () => void;
}

const AccommodationCard = ({
  accommodation,
  viewDetailsClickHandler,
}: Props) => {
  const [descExpanded, setDescExpanded] = useState(false);

  const description: string | JSX.Element | JSX.Element[] = parse(
    accommodation.description
  );

  return (
    <Card variant="outlined">
      <CardContent sx={{ paddingBottom: 0 }}>
        <Stack direction="row" spacing={2}>
          <Stack spacing={1}>
            <img
              src={accommodation.images[0].filename}
              alt={accommodation.images[0].alt}
              height={"150px"}
            />
            <Typography variant="h6">
              Type: {accommodation.type.name}
            </Typography>
            <Rating ratingId={accommodation.rating.id} orientation="column" />
          </Stack>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5">{accommodation.name}</Typography>
            <Stack
              sx={{
                maxHeight: descExpanded ? "inf" : "120px",
                overflowY: "hidden",
              }}
            >
              <Typography>{description}</Typography>
            </Stack>
            <Stack sx={{ width: "100%", alignItems: "center" }}>
              <Button
                onClick={() => {
                  setDescExpanded(!descExpanded);
                }}
                sx={{ width: "100px" }}
              >
                See {descExpanded ? "less" : "more"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ paddingBottom: "16px", justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            viewDetailsClickHandler();
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccommodationCard;
