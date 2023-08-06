import { Rating as MuiRating, Stack, Typography } from "@mui/material";

interface Props {
  ratingId: number;
  orientation?: "row" | "column";
}

export const NO_RATING_ID = 9;

const Rating = ({ ratingId, orientation = "row" }: Props) => {
  return (
    <Stack
      direction={orientation}
      spacing={orientation === "row" ? 2 : 0}
      alignItems={orientation === "row" ? "center" : "start"}
    >
      <Typography variant="h6">Rating:</Typography>
      {ratingId === NO_RATING_ID ? (
        <Typography sx={{ fontStyle: "italic" }}>Rating unavailable</Typography>
      ) : (
        <MuiRating
          readOnly
          value={ratingId === NO_RATING_ID ? null : ratingId}
        />
      )}
    </Stack>
  );
};

export default Rating;
