import React from 'react';
import { Box, Typography, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type YearlyData = {
    year: number;
    actualSum: number;
    targetSum: number;
};

interface PreviousYearsChartProps {
    data: YearlyData[];
}

const formatInteger = (value: number | null | undefined): string => {
    if (typeof value !== 'number' || isNaN(value)) return '0';
    return Math.round(value).toLocaleString();
};

const formatCurrency = (amount: number | null | undefined) => {
    if (typeof amount !== 'number') return '$0';
    return `$${formatInteger(amount)}`;
};

const getBarColor = (actual: number, goal: number) => {
    if (goal === 0) return '#525252';
    const ratio = actual / goal;
    return ratio >= 0.8 ? '#525252' : '#525252'; // can expand logic later
};

const PreviousYearsChart: React.FC<PreviousYearsChartProps> = ({ data }) => {
    const getBarWidth = (actual: number, goal: number) => {
        if (goal <= 0) return 0;
        const ratio = actual / goal;
        return Math.min(ratio * 100, 100);
    };

    // Detect if device is tablet or mobile
    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans' }}>
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    maxHeight: '240px',
                    pr: 2,
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#c1c1c1',
                        borderRadius: '20px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#a8a8a8' },
                }}
            >
                {data.length > 0 ? (
                    data.map(item => {
                        const percentage =
                            item.targetSum > 0
                                ? String(Math.round((item.actualSum / item.targetSum) * 100))
                                : '0';

                        return (
                            <Box
                                key={item.year}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1.5,
                                    gap: 1,
                                    cursor: 'pointer'
                                }}
                            >
                                {/* Year */}
                                <Typography
                                    sx={{
                                        width: 50,
                                        fontSize: '12px',
                                        color: '#2B303466',
                                        fontWeight: 800,
                                        flexShrink: 0,
                                        // textAlign: 'left',
                                    }}
                                >
                                    {item.year}
                                </Typography>

                                {/* Bar */}
                                <Box sx={{ position: 'relative', flex: 1, minWidth: 0, height: 35 }}>
                                    <Tooltip
                                        arrow
                                        placement={isMobileOrTablet ? 'top' : 'right'} // dynamic placement
                                        enterTouchDelay={0}
                                        leaveTouchDelay={3000}
                                        title={
                                            <Box sx={{ fontSize: '12px', fontFamily: 'Nunito Sans', color: '#333', fontWeight: 'bold' }}>
                                                <div>
                                                    <strong style={{ fontWeight: 700, color: '#767676', lineHeight: '9px' }}>Actual:</strong> {formatCurrency(Math.round(item.actualSum))}
                                                </div>
                                                <div>
                                                    <strong style={{ fontWeight: 700, color: '#767676', lineHeight: '9px' }}>Actual %:</strong> {percentage}%
                                                </div>
                                                <div>
                                                    <strong style={{ fontWeight: 700, color: '#767676', lineHeight: '9px' }}>Goal:</strong> {formatCurrency(item.targetSum)}
                                                </div>
                                            </Box>
                                        }
                                        slotProps={{
                                            tooltip: {
                                                sx: {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                                    backdropFilter: 'blur(8px)',
                                                    WebkitBackdropFilter: 'blur(8px)',
                                                    color: '#333',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                                    borderRadius: '8px',
                                                    padding: '8px 12px',
                                                    border: '1px solid rgba(255,255,255,0.4)',
                                                }
                                            },
                                            arrow: {
                                                sx: {
                                                    color: 'rgba(255, 255, 255, 0.6)',
                                                    backdropFilter: 'blur(8px)',
                                                    WebkitBackdropFilter: 'blur(8px)',
                                                }
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: `${getBarWidth(item.actualSum, item.targetSum)}%`,
                                                height: '100%',
                                                backgroundColor: getBarColor(item.actualSum, item.targetSum),
                                                borderRadius: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                minWidth: 80,
                                                overflow: 'hidden',
                                                transition: 'width 0.3s ease-in-out',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    color: '#FFFFFF',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    padding: '0 8px',
                                                    fontFamily: 'Nunito Sans',
                                                }}
                                            >
                                                {`${formatCurrency(item.actualSum)} / ${formatCurrency(item.targetSum)}`}
                                            </Box>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Box>
                        );
                    })
                ) : (
                    <Box sx={{ textAlign: 'center', py: 4, color: '#575757', fontSize: '14px', fontWeight: 500 }}>
                        No data available.
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PreviousYearsChart;
