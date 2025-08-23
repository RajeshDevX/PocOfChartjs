import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Table1 from "./TodaysAppointmentsTable";
import Table2 from "./PatientRecordsTable";
import DoctorScheduleCard from "./DoctorScheduleCard";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";

export default function DashboardLayout() {
  const [view, setView] = React.useState("day");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    if (newView !== null) setView(newView);
  };

  return (
    <Box sx={{ flexGrow: 1, }}>
      <Grid container spacing={2}>
        {/* Left side (tables + header) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: "wrap", gap: 1 }}>
              <Typography variant="h4" color="primary.main">
                Welcome to Avura!
              </Typography>
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={handleChange}
                sx={{
                  display: "flex",
                  gap: 1, // spacing between buttons
                  "& .MuiToggleButton-root": {
                    flex: 1,               // equal width
                    minWidth: 0,           // prevent auto-sizing based on text
                    border: "none",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "text.secondary",
                    "&.Mui-selected": {
                      backgroundColor: "action.selected",
                      color: "text.primary",
                    },
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  },
                }}
              >
                <ToggleButton value="day">Day</ToggleButton>
                <ToggleButton value="week">Week</ToggleButton>
                <ToggleButton value="month">Month</ToggleButton>
              </ToggleButtonGroup>

            </Box>
            {/* <Table1 />
            <Table2 /> */}
          </Stack>
        </Grid>

        {/* Right side (doctor card) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <DoctorScheduleCard />
        </Grid>
      </Grid>
    </Box>
  );
}
