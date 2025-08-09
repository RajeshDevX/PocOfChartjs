import { Box, Typography, LinearProgress } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const Card = styled(Paper)(({ theme }) => ({
//     backgroundColor: "#fff",
//     borderRadius: "16px",
//     padding: theme.spacing(3),
//     boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
// }));

const QuarterRow = ({ label, actual, goal }: { label: string; actual: number; goal: number }) => {
    const percentage = goal > 0 ? Math.round((actual / goal) * 100) : 0;
    const isMet = percentage >= 100;
    const color =
        percentage === 0 ? "#EDEDED" : isMet ? "#57B77D" : "#F16A4F";

    return (
        <Box sx={{ mb: 2, backgroundColor: "#f8f8f8", borderRadius: "11px", padding: 2 }}>
            {/* Top row */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, fontFamily: "'Nunito Sans'", color: "#202224" }}>
                    {label}
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, fontFamily: "'Nunito Sans'", color: "#202224" }}>
                    {percentage}%
                </Typography>
            </Box>

            {/* Progress bar */}
            <LinearProgress
                variant="determinate"
                value={percentage > 100 ? 100 : percentage}
                sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#E0E0E0",
                    "& .MuiLinearProgress-bar": { backgroundColor: color },
                    my: 1,
                }}
            />

            {/* Bottom row */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: "'Nunito Sans'", color: "#555" }}>
                    ${actual.toLocaleString()}
                </Typography>
                <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: "'Nunito Sans'", color: "#555" }}>
                    ${goal.toLocaleString()}
                </Typography>
            </Box>
        </Box>
    );
};

export default function QuarterlyGoalsCard({ sampleData }: any) {


    // Group into quarters
    const quarters = [
        { label: "Quarter 1", months: [0, 1, 2] },
        { label: "Quarter 2", months: [3, 4, 5] },
        { label: "Quarter 3", months: [6, 7, 8] },
        { label: "Quarter 4", months: [9, 10, 11] },
    ].map((q) => {
        const actual = q.months.reduce((sum, idx) => sum + (sampleData[idx].actual || 0), 0);
        const goal = q.months.reduce((sum, idx) => sum + (sampleData[idx].goal || 0), 0);
        return { label: q.label, actual, goal };
    });

    return (
        <>
            {quarters.map((q) => (
                <QuarterRow key={q.label} label={q.label} actual={q.actual} goal={q.goal} />
            ))}
        </>
    );
}
