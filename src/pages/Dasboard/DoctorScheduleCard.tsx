import React, { useState } from "react";
import {
    Box,
    Avatar,
    Typography,
    IconButton,
    Card,
    Divider,
    Chip,
    Paper,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MyDatePicker from "./calender";



import MyTimeline from "./MyTimeLine";
const scheduleItems = [
    {
        time: '9:30',
        period: 'am',
        title: 'Consultation Amber Hotel',
        status: 'Confirmed',
        statusColor: '#4CAF50'
    },
    {
        time: '10:30',
        period: 'am',
        title: 'Staff Meeting',
        status: null
    },
    {
        time: '11:40',
        period: 'am',
        title: 'Break Time',
        status: null
    },
    {
        time: '12:10',
        period: 'pm',
        title: 'Swetha Priya',
        status: 'Confirmed',
        statusColor: '#4CAF50'
    },

];

const DoctorScheduleCard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <Paper sx={{ borderRadius: 2, py: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
                {/* Doctor Profile */}
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box position="relative">
                        <Avatar
                            src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Download-Free-Pictures-3840x2160.jpg"
                            sx={{ width: 90, height: 90 }}
                        />
                        <IconButton
                            size="small"
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                bgcolor: "#1755E7",
                                color: "#FFFFFF",
                                boxShadow: 1,
                                "&:hover": {
                                    backgroundColor: "#FFFFFF",
                                    color: "#1755E7",
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <CameraAltIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Typography variant="h6" mt={1}>
                        Dr. John Smith
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        General Practitioner
                    </Typography>
                </Box>

                {/* Calendar */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <MyDatePicker />
                </Box>
                <Box>
                    <Typography textAlign="center" sx={{ color: '#54577A', fontSize: '18px', fontWeight: '600', lineHeight: '24.5px', mb: 2 }}>
                        Today Schedule
                    </Typography>
                    <Box sx={{
                        height: { xs: "270px", xl: "425px" },
                        overflowY: "auto",
                        width: '100%',
                        // pr: 1,
                        "&::-webkit-scrollbar": {
                            width: "5px",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "transparent",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#888",
                            borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#555",
                        },
                        "&::-webkit-scrollbar-button": {
                            display: "none",
                        },
                    }}>
                        <MyTimeline />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default DoctorScheduleCard;
