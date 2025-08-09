import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import CustomPerformanceBarChart from './1st'; // Adjust the import path as necessary
import QuarterlyGoalsCard from './2nd'; // Adjust the import path as necessary
import PreviousYearsChart from './3rd';
import { Typography } from '@mui/material';
// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
interface YearlyData {
    year: number;
    actualSum: number;
    targetSum: number;
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

// Bar chart data
const sampleData = [
    { month: "Jan", actual: 350000, goal: 400000 },   // 87.5%
    { month: "Feb", actual: 200000, goal: 60000000 },   // 2% (no actual)
    { month: "Mar", actual: 45000, goal: 70000 },       // 64.3%
    { month: "Apr", actual: 72000, goal: 90000 },       // 80%
    { month: "May", actual: 3000, goal: 50000 },          // 6%
    { month: "Jun", actual: 85000, goal: 80000 },        // 106.3%
    { month: "Jul", actual: 50000, goal: 95000 },        // 52.6%
    { month: "Aug", actual: 120000, goal: 130000 },    // 92.3%
    { month: "Sep", actual: 78000, goal: 85000 },   // 91.8%
    { month: "Oct", actual: 95000, goal: 100000 },    // 95%
    { month: "Nov", actual: 30000, goal: 65000 },    // 46.2%
    { month: "Dec", actual: 82000, goal: 75000 }     // 109.3%
];
const yearlyData: YearlyData[] = [
    { year: 2024, actualSum: 42000, targetSum: 45000 },  // ~93% of goal
    { year: 2023, actualSum: 48000, targetSum: 45000 },  // ~106% of goal
    { year: 2022, actualSum: 32000, targetSum: 45000 },  // ~71% of goal
    { year: 2021, actualSum: 15000, targetSum: 45000 },  // ~33% of goal
    { year: 2020, actualSum: 46000, targetSum: 46000 },  // exactly 100%
    { year: 2019, actualSum: 38000, targetSum: 50000 },  // ~76% of goal
    { year: 2018, actualSum: 5000,  targetSum: 20000 },  // 25% of goal
    { year: 2017, actualSum: 0,     targetSum: 0 },      // edge case
];




export default function ColumnLayoutInsideGrid() {
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, lg: 8 }} >
                    <Item sx={{ height: '100%', backgroundColor: '#FFFFFF', borderRadius: '20px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 2, paddingBottom: 4 }}>
                        <Typography sx={{ mb: 6, mt: 2, alignSelf: 'flex-start', textAlign: 'left', fontSize: '24px', fontWeight: 'bold', fontFamily: "'Nunito Sans'", color: '#202224', lineHeight: '20px' }} >
                            Total Sales
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                overflowX: 'auto',
                                overflowY: 'hidden',
                                position: 'relative',
                                '&::-webkit-scrollbar': {
                                    height: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#c1c1c1',
                                    borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    backgroundColor: '#a0a0a0',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    minWidth: '1000px',
                                    height: {
                                        xs: 'auto',
                                        sm: '340px',
                                        lg: '746px'
                                    }
                                    ,
                                    pb: { sm: 4, lg: 1 }
                                }}
                            >
                                <CustomPerformanceBarChart data={sampleData} />
                            </Box>
                        </Box>


                    </Item>
                </Grid>

                {/* Right column stacked boxes */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Stack spacing={4}>
                        <Grid size={12}>
                            <Item sx={{ backgroundColor: '#FFFFFF', borderRadius: '20px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 2 }}>
                                <Typography sx={{ mb: 2, mt: 2, alignSelf: 'flex-start', textAlign: 'left', fontSize: '24px', fontWeight: 'bold', fontFamily: "'Nunito Sans'", color: '#202224', lineHeight: '20px' }} >
                                    Quarterly Goals
                                </Typography>
                                <Box sx={{
                                    height: { lg: '100%' }, width: '100%', position: "relative",
                                    // Responsive columns
                                    gridTemplateColumns: {
                                        xs: "repeat(1, 1fr)",
                                        sm: "repeat(2, 1fr)",
                                        md: "repeat(4, 1fr)",
                                        lg: "repeat(1, 1fr)",
                                    },
                                    display: "grid",
                                    gap: { sm: 2, lg: 0 },
                                }}>
                                    <QuarterlyGoalsCard sampleData={sampleData} />
                                </Box>
                            </Item>
                        </Grid>
                        <Grid size={12}>
                            <Item
                                sx={{
                                    height: 323,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '20px',
                                    boxSizing: 'border-box',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: 2,
                                }}
                            >
                                {/* Header */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        alignSelf: 'flex-start',
                                        mt: 2,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '18px', lg: '24px' },
                                            fontWeight: 'bold',
                                            color: '#202224',
                                            lineHeight: '20px',
                                            fontFamily: 'Nunito Sans',
                                            px: '10px',
                                            mb: '5px',
                                            
                                        }}
                                    >
                                        Previous Years
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '12px',
                                            color: '#7D7D7D',
                                            ml: '5px',
                                            lineHeight: '20px',
                                        }}
                                    >
                                        (Actual vs Goal)
                                    </Typography>
                                </Box>

                                {/* Chart */}
                                <Box
                                    sx={{
                                        flex: 1,
                                        width: '100%',
                                        position: 'relative',
                                        my: '10px',
                                    }}
                                >
                                    <PreviousYearsChart data={yearlyData} /> {/* ✅ new clear name */}
                                </Box>
                            </Item>

                        </Grid>
                    </Stack>
                </Grid>

            </Grid>
        </Box>
    );
}
