import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useMediaQuery, Popper, Paper, Tooltip } from '@mui/material';
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
    return actual / goal >= 0.8 ? '#525252' : '#525252';
};

const TooltipContent = ({ item }: { item: YearlyData }) => {
    const percentage = item.targetSum > 0
        ? Math.round((item.actualSum / item.targetSum) * 100)
        : 0;

    return (
        <Box sx={{ fontSize: '12px', fontFamily: 'Nunito Sans', color: '#333', fontWeight: 'bold' }}>
            <div>
                <strong style={{ fontWeight: 700, color: '#767676' }}>Actual:</strong> {formatCurrency(Math.round(item.actualSum))}
            </div>
            <div>
                <strong style={{ fontWeight: 700, color: '#767676' }}>Actual %:</strong> {percentage}%
            </div>
            <div>
                <strong style={{ fontWeight: 700, color: '#767676' }}>Goal:</strong> {formatCurrency(item.targetSum)}
            </div>
        </Box>
    );
};

const PreviousYearsChart: React.FC<PreviousYearsChartProps> = ({ data }) => {
    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('lg'));
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [tooltipData, setTooltipData] = useState<YearlyData | null>(null);
    const popperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                anchorEl &&
                !anchorEl.contains(event.target as Node) &&
                popperRef.current &&
                !popperRef.current.contains(event.target as Node)
            ) {
                setAnchorEl(null);
                setTooltipData(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [anchorEl]);
    const getBarWidth = (actual: number, goal: number) => {
        if (goal <= 0) return 0;
        return Math.min((actual / goal) * 100, 100);
    };

    const handleMobileClick = (event: React.MouseEvent<HTMLElement>, item: YearlyData) => {
        if (anchorEl && tooltipData?.year === item.year) {
            setAnchorEl(null);
            setTooltipData(null);
        } else {
            setAnchorEl(event.currentTarget);
            setTooltipData(item);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: '240px', pr: 2 }}>
                {data.map((item) => (
                    <Box key={item.year} sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                        {/* Year */}
                        <Typography sx={{ width: 50, fontSize: '12px', color: '#2B303466', fontWeight: 800 }}>
                            {item.year}
                        </Typography>

                        {/* Bar */}
                        <Box sx={{ position: 'relative', flex: 1, height: 35 }}>
                            {isMobileOrTablet ? (
                                <Box
                                    onClick={(e) => handleMobileClick(e, item)}
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
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            px: 1
                                        }}
                                    >
                                        {`${formatCurrency(item.actualSum)} / ${formatCurrency(item.targetSum)}`}
                                    </Typography>
                                </Box>
                            ) : (
                                <Tooltip
                                    arrow
                                    placement="right"
                                    enterTouchDelay={0}
                                    leaveTouchDelay={3000}
                                    title={<TooltipContent item={item} />}
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
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#fff',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                px: 1
                                            }}
                                        >
                                            {`${formatCurrency(item.actualSum)} / ${formatCurrency(item.targetSum)}`}
                                        </Typography>
                                    </Box>
                                </Tooltip>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Mobile Popper Tooltip */}
            <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement="top"
                sx={{ zIndex: 1300 }}
                ref={popperRef} // attach the ref here

            >
                {tooltipData && (
                    <Paper
                        sx={{
                            p: 1,
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            border: '1px solid rgba(255,255,255,0.4)'
                        }}
                    >
                        <TooltipContent item={tooltipData} />
                    </Paper>
                )}
            </Popper>
        </Box>
    );
};

export default PreviousYearsChart;
