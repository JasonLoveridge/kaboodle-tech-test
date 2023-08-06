import React, { useState } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Accommodation, Room } from "../util/types";

interface Props {
  room: Room;
}

const RoomCard = ({ room }: Props) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack sx={{ marginY: "8px" }}>
          <Typography variant="h6">{room.name}</Typography>
        </Stack>
        <Typography>Type: {room.type}</Typography>
        <Typography>Min occupancy: {room.min_occupancy}</Typography>
        <Typography>Max occupancy: {room.max_occupancy}</Typography>
        <Typography>Price: {room.price?.price ?? "unknown"}</Typography>
        {room.total_number ? (
          <Typography>
            {room.number_available} left out of {room.total_number}
          </Typography>
        ) : (
          <Typography>Availability unknown</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
