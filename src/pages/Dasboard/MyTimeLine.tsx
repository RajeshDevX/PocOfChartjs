import * as React from "react";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from "@mui/lab";
import { Paper, Typography } from "@mui/material";

interface Appointment {
    time: string;
    name: string;
    status?: string;
    color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
}

const appointments: Appointment[] = [
    { time: "09:00", name: "John Doe", status: "Confirmed", color: "primary" },
    { time: "09:30", name: "Sarah Lee", status: "Pending", color: "secondary" },
    { time: "10:00", name: "Break", color: "warning" },
    { time: "10:30", name: "Michael Brown", status: "Confirmed", color: "success" },
    { time: "11:00", name: "Emma Wilson", status: "Cancelled", color: "error" },
    { time: "11:30", name: "David Smith", status: "Confirmed", color: "primary" },
    { time: "12:00", name: "Lunch Break", color: "info" },
    { time: "01:00", name: "Olivia Johnson", status: "Confirmed", color: "success" },
    { time: "01:30", name: "William Davis", status: "Pending", color: "secondary" },
    { time: "02:00", name: "Sophia Martinez", status: "Confirmed", color: "primary" },
];

export default function AppointmentTimeline() {
    return (
        <Timeline
            sx={{
                flex: 1,
                minHeight: "100%",
                width: "100%",
                "& .MuiTimelineItem-root": {
                    minHeight: 80,
                },
                "& .MuiTimelineOppositeContent-root": {
                    flex: "0 0 auto",
                    minWidth: "40px",
                    paddingRight: 2,  
                    textAlign: "right",
                },

                "& .MuiTimelineContent-root": {
                    flex: 1,             
                },
            }}
        >
            {appointments.map((appt, index) => (
                <TimelineItem key={index}>
                    <TimelineOppositeContent color="text.secondary">
                        {appt.time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot variant="outlined" />
                        <TimelineConnector
                            sx={{
                                bgcolor: "transparent",
                                borderLeft: "2px dashed gray",
                                borderImage: "repeating-linear-gradient(gray 0 8px, transparent 8px 14px) 1"
                            }}
                        />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="subtitle1">{appt.name}</Typography>
                            {appt.status && (
                                <Typography
                                    variant="body2"
                                    color={appt.status === "Confirmed" ? "success.main" : "text.secondary"}
                                >
                                    {appt.status}
                                </Typography>
                            )}
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}
