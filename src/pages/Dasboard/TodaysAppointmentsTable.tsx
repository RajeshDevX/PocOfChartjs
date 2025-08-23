import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";

interface Appointment {
    name: string;
    avatar: string;
    gender: string;
    age: number;
    diagnosis: string;
    type: "New Patient" | "Old Patient";
    time: string;
    showHistory?: boolean;
}

const appointments: Appointment[] = [
    {
        name: "Angelina",
        avatar: "https://randomuser.me/api/portraits/women/11.jpg",
        gender: "Female",
        age: 35,
        diagnosis: "Health checkup consulting",
        type: "New Patient",
        time: "10:20",
    },
    {
        name: "John Williams",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        gender: "Male",
        age: 38,
        diagnosis: "Health checkup consulting",
        type: "Old Patient",
        time: "12:20",
        showHistory: true,
    },
    {
        name: "Rita Merlin",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        gender: "Female",
        age: 26,
        diagnosis: "Health checkup consulting",
        type: "Old Patient",
        time: "09:30",
        showHistory: true,
    },
    {
        name: "Angelina",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        gender: "Female",
        age: 45,
        diagnosis: "Health checkup consulting",
        type: "New Patient",
        time: "10:20",
    },
    {
        name: "John Williams",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        gender: "Male",
        age: 39,
        diagnosis: "Health checkup consulting",
        type: "Old Patient",
        time: "12:20",
        showHistory: true,
    },
];

export default function TodayAppointmentsTable() {
    const theme = useTheme();
    const isBelowXl = useMediaQuery(theme.breakpoints.down("xl"));
    return (
        <Paper sx={{ borderRadius: 2, p: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >

                <Typography variant="h6" fontWeight={600}>
                    Today Appointments
                </Typography>
                <Link href="#" underline="hover" color="primary" fontWeight={500}>
                    View All
                </Link>
            </Box>

            <TableContainer sx={{
                width: "100%",
                overflowX: "auto",
            }}>
                <Table
                    size={isBelowXl ? "small" : "medium"}
                    aria-label="appointments table"
                >
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Patient</TableCell>
                            <TableCell sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Gender</TableCell>
                            <TableCell sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Age</TableCell>
                            <TableCell sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Diagnosis</TableCell>
                            <TableCell sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Patient Type</TableCell>
                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Avatar src={row.avatar} sx={{ width: 30, height: 30 }} />
                                        <Typography sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '15px', color: '#54577A' }}>{row.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '15px', color: '#54577A' }}>{row.gender}</TableCell>
                                <TableCell sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '15px', color: '#54577A' }}>{row.age}</TableCell>
                                <TableCell sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '15px', color: '#54577A' }}>{row.diagnosis}</TableCell>

                                <TableCell >
                                    <Box>
                                        <Typography sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '15px', color: '#54577A' }} >{row.type}</Typography>
                                        {row.showHistory && (
                                            <Link
                                                href="#"
                                                underline="hover"

                                                sx={{ fontSize: "10px", color: "#0075C5" }}
                                            >
                                                View History
                                            </Link>
                                        )}
                                    </Box>
                                </TableCell>

                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            background: "#CBD6F2",
                                            color: "#42526E",
                                            fontWeight: 400,
                                            borderRadius: "8px",
                                            textTransform: "none",
                                            size: '12px',
                                            "&:hover": { background: "#c7d2fe" },
                                        }}
                                    >
                                        {row.time}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
