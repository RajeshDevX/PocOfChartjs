import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Grid, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

export default function MuiCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const theme = useTheme();

  return (
    <Grid container sx={{ width: '100%',height:{xs:'250px',xl:'320px'} }}>
      <Grid size={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue as Dayjs)}
            views={["day"]}
            slotProps={{
              day: (ownerState) => {
                const isSunday = dayjs(ownerState.day).day() === 0; // Sunday
                const isSelected =
                  value && dayjs(ownerState.day).isSame(value, "month");
                return {
                  sx: {
                    color: isSunday
                      ? theme.palette.error.main
                      : theme.palette.text.secondary,
                    ...(isSelected && {
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.primary.contrastText,
                      },
                    }),
                  },
                };
              },
            }}
            sx={{
              width: '100%',
              maxWidth: 'none',
              '& .MuiPickersDay-root': {
                width: {xs:25,xl:36},
                height: {xs:25,xl:36},
                margin: '2px',
                borderRadius: '50%', // Ensures all days are circular
              },
          
              // Selected day styling (filled circle)
              '& .MuiPickersDay-root.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              },
              // Make the entire calendar take full width
              '& .MuiPickersLayout-root': {
                width: '100%',
              },
              // Header (month/year and navigation)
              '& .MuiPickersCalendarHeader-root': {
                width: '100%',
                // paddingLeft: '16px',
                // paddingRight: '16px',
                margin: 0,
                justifyContent: 'flex-start',
              },
              '& .MuiPickersCalendarHeader-labelContainer': {
                justifyContent: 'flex-start',
                marginRight: 'auto',
              },
              // Week day labels row
              '& .MuiDayCalendar-header': {
                justifyContent: 'space-around',
                width: '100%',
                paddingLeft: '16px',
                paddingRight: '16px',
              },
              '& .MuiDayCalendar-weekDayLabel': {
                color: theme.palette.text.secondary,
                width: 'calc(100% / 7)',
                maxWidth: 'none',
                margin: 0,
              },
              '& .MuiDayCalendar-weekDayLabel:first-of-type': {
                color: theme.palette.error.main,
                fontWeight: 600,
              },
              // Month grid
              '& .MuiDayCalendar-monthContainer': {
                width: '100%',
                paddingLeft: '16px',
                paddingRight: '16px',
              },
              '& .MuiDayCalendar-weekContainer': {
                justifyContent: 'space-around',
                width: '100%',
                margin: 0,
              },
              // Day buttons
            //   '& .MuiPickersDay-root': {
            //     width: 'calc(100% / 7 - 4px)',
            //     height: 'calc(100% / 7 - 4px)',
            //     maxWidth: 'none',
            //     margin: '2px',
            //     fontSize: '0.875rem',
            //     minWidth: '36px',
            //     minHeight: '36px',
            //   },
              // Selected day styling
            //   '& .MuiPickersDay-root.Mui-selected': {
            //     backgroundColor: theme.palette.primary.main,
            //     borderRadius: '50%',
            //     '&:hover': {
            //       backgroundColor: theme.palette.primary.dark,
            //     },
            //   },
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}