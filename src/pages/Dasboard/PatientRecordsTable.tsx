import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useMediaQuery, useTheme } from "@mui/material";

interface Patient {
    name: string;
    avatar: string;
    genderAge: string;
    date: string;
    time: string;
    status: "In Progress" | "Completed" | "Canceled";
}

const patients: Patient[] = [
    {
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        genderAge: "Male | 38",
        date: "Jul 20, 2025",
        time: "10.00 to 10.30 AM",
        status: "In Progress",
    },
    {
        name: "Swetha Priya",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        genderAge: "Female | 28",
        date: "Jul 20, 2025",
        time: "11.00 to 11.30 AM",
        status: "Completed",
    },
    {
        name: "Lisa Ray",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        genderAge: "Female | 45",
        date: "Jul 20, 2025",
        time: "12.00 to 12.30 AM",
        status: "Canceled",
    },
    {
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        genderAge: "Male | 36",
        date: "Jul 20, 2025",
        time: "01.00 to 01.30 AM",
        status: "Completed",
    },
    {
        name: "Maya Pate",
        avatar: "https://randomuser.me/api/portraits/women/11.jpg",
        genderAge: "Female | 38",
        date: "Jul 20, 2025",
        time: "02.00 to 02.30 AM",
        status: "Completed",
    },
];

export default function PatientTable() {
    const theme = useTheme();
    const isBelowXl = useMediaQuery(theme.breakpoints.down("xl"));
    return (
        <Paper sx={{ borderRadius: 2, p: 2 }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6" fontWeight={600}>
                    Patient Records
                </Typography>
                <Link href="#" underline="hover" color="primary" fontWeight={500}>
                    Filter
                </Link>
            </Box>
            <TableContainer sx={{ borderRadius: 2, p: 0.3 }} >
                <Table size={isBelowXl ? "small" : "medium"}
                    sx={{

                        border: "1px solid #1976d20f",
                        "& th": {
                            backgroundColor: "#E7F0FD",
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#333",
                        },
                        "& td, & th": {
                            border: "1px solid #DDE1E6",
                        },
                    }}
                    aria-label="patient table"
                >
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Patient</TableCell>
                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Gender & Age</TableCell>
                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Date</TableCell>
                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Time</TableCell>
                            <TableCell align="center" sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '20px', color: '#54577A' }}>Payment Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient, index) => (
                            <TableRow key={index} >
                                {/* Patient with Avatar */}
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Avatar src={patient.avatar} sx={{ width: 30, height: 30 }} />
                                        <Typography sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '15px', color: '#54577A' }}>{patient.name}</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell align="center" sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '15px', color: '#54577A' }}>{patient.genderAge}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '15px', color: '#54577A' }}>{patient.date}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '15px', color: '#54577A' }}>{patient.time}</TableCell>

                                {/* Status with Chip */}
                                <TableCell align="center">
                                    {patient.status === "In Progress" && (
                                        <Chip
                                            label="In Progress"
                                            sx={{
                                                backgroundColor: "#F2E01F",
                                                color: "#FFFFFF",
                                                px: 1,
                                                borderRadius: "18px",
                                                "& .MuiChip-label": {
                                                    fontSize: "12px",
                                                    lineHeight: "15px",
                                                    fontWeight: 400,
                                                },
                                            }}
                                        />
                                    )}

                                    {patient.status === "Completed" && (
                                        <Chip
                                            label="Completed"
                                            sx={{
                                                backgroundColor: "#33691D",
                                                color: "#FFFFFF",
                                                px: 1,
                                                borderRadius: "18px",
                                                "& .MuiChip-label": {
                                                    fontSize: "12px",
                                                    lineHeight: "15px",
                                                    fontWeight: 400,
                                                },
                                            }}
                                        />
                                    )}

                                    {patient.status === "Canceled" && (
                                        <Chip
                                            label="Canceled"
                                            sx={{
                                                backgroundColor: "#F32F15",
                                                color: "#FFFFFF",
                                                px: 1,
                                                borderRadius: "18px",
                                                "& .MuiChip-label": {
                                                    fontSize: "12px",
                                                    lineHeight: "15px",
                                                    fontWeight: 400,
                                                },
                                            }}
                                        />
                                    )}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
