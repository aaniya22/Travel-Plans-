import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress, Chip, Paper } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import DateRangeIcon from "@mui/icons-material/DateRange";

const SharedTripView = () => {
  const { token } = useParams();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/trips/shared/${token}`)
      .then((r) => setTrip(r.data))
      .catch(() => setError("This link is invalid or has been disabled."));
  }, [token]);

  if (error) return <Box sx={{ p: 4, textAlign: "center" }}><Typography color="error">{error}</Typography></Box>;
  if (!trip) return <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Paper elevation={2} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Box
          component="img"
          src={trip.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?fit=crop&w=1200"}
          alt={trip.destination}
          sx={{ width: "100%", height: 220, objectFit: "cover" }}
        />
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <PlaceIcon color="primary" />
            <Typography variant="h5" fontWeight={700}>{trip.destination}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Chip label={trip.status} size="small" />
            <Chip icon={<DateRangeIcon />} label={`${new Date(trip.startDate).toLocaleDateString()} – ${new Date(trip.endDate).toLocaleDateString()}`} size="small" />
          </Box>
          {trip.description && <Typography color="text.secondary">{trip.description}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
};

export default SharedTripView;