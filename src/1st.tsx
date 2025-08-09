import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Chart,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";

// Register Chart.js components (without the custom plugins)
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Custom label plugin for actual values
const actualValueLabel = {
    id: "actualValueLabel",
    afterDatasetsDraw(chart: Chart<any>, args: any, pluginOptions: any) {
        const { } = args;
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);

        ctx.save();
        meta.data.forEach((bar: any, index: number) => {
            if (!pluginOptions.data || !pluginOptions.data[index]) return;

            const actual = pluginOptions.data[index]?.actual;
            if (actual == null) return;

            const label = `$${actual.toLocaleString()}`;
            ctx.fillStyle = "#555";
            ctx.font = "bold 12px 'Nunito Sans'";
            ctx.textAlign = "center";

            // Position text at the top of the bar
            ctx.fillText(label, bar.x, bar.y - 10);
        });
        ctx.restore();
    },
};


// Plugin for "Goal" label under Y axis
const goalYAxisLabel = {
    id: "goalYAxisLabel",
    afterDraw(chart: Chart<any>) {
        const { ctx, chartArea, scales } = chart;
        const yAxis = scales.y;
        const y0 = yAxis.getPixelForValue(0);
        const x = chartArea.left;
        const y = y0 + 34.2; // Adjust this to match your spacing
        ctx.save();
        ctx.font = "bold 12px 'Nunito Sans'";
        ctx.fillStyle = "#777777";
        ctx.textAlign = "right";
        ctx.fillText("Goal", x, y);
        ctx.restore();
    },
};

// DON'T register the plugins globally
// ChartJS.register(actualValueLabel, goalYAxisLabel);

export type PerformanceData = {
    month: string;
    actual?: number;
    goal: number;
};

interface Props {
    data: PerformanceData[];
}

const CustomPerformanceBarChart: React.FC<Props> = ({ data }) => {
    const [hoveredIndex] = useState<number | null>(null);
    const width = window.innerWidth;
    const isTablet = width >= 600 && width < 1024;
    const performanceData = data.map((d) =>
        !d.actual || d.goal === 0 ? 2 : Math.round((d.actual / d.goal) * 100)
    );

    const barColors = data.map((d) =>
        !d.actual || d.goal === 0
            ? "#000"
            : d.actual >= d.goal
                ? "#57B77D"
                : "#F16A4F"
    );

    const chartData = {
        labels: data.map((d) => d.month),
        datasets: [
            {
                label: "Performance (%)",
                data: performanceData,
                backgroundColor: barColors,
                hoverBackgroundColor: barColors,
                borderRadius: 6,
                barThickness: 30,
            },
        ],
    };

    const getDynamicYAxisMax = (data: PerformanceData[]): number => {
        const percentages = data.map((d) =>
            !d.actual || d.goal === 0 ? 2 : Math.round((d.actual / d.goal) * 100)
        );
        const maxPercentage = Math.max(...percentages);
        const step = maxPercentage <= 200 ? 20 : maxPercentage <= 500 ? 50 : 100;
        return Math.ceil(maxPercentage / step) * step;
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            datalabels: {
                display: false,
            },
            tooltip: {
                enabled: false,
                external: (context: any) => {
                    const tooltipEl = document.getElementById("chartjs-tooltip");
                    if (!tooltipEl) return;
                    const tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = "0";
                        return;
                    }
                    const index = tooltipModel.dataPoints[0].dataIndex;
                    const { actual, goal } = data[index];
                    tooltipEl.innerHTML = `
                        <div style="
                            backdrop-filter: blur(24px);
                            background: rgba(255,255,255,0.1);
                            border-radius:10px;
                            width:112px;
                            height:52px;
                            padding:8px;
                            font-size:12px;
                            font-family:'Nunito Sans';
                            white-space:nowrap;
                            box-sizing:border-box;
                            display:flex;
                            flex-direction:column;
                            gap:10px;
                            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                            justify-content:center;
                        ">
                            <div style="font-weight:700;color:#767676;line-height:9px;font-family:'Nunito Sans';">
                                Actual: ${actual ?? "N/A"}
                            </div>
                            <div style="font-weight:700;color:#767676;line-height:9px;font-family:'Nunito Sans';">
                                ${actual && goal
                            ? `Actual %: ${Math.round((actual / goal) * 100)}%`
                            : "Insufficient data"
                        }
                            </div>
                        </div>
                    `;

                    tooltipEl.style.opacity = "1";
                    tooltipEl.style.position = "absolute";
                    tooltipEl.style.pointerEvents = "none";
                    const dataPoint = tooltipModel.dataPoints[0].element;
                    tooltipEl.style.left = `${dataPoint.x}px`;
                    tooltipEl.style.top = `${dataPoint.y - 40}px`;
                },
            },
            actualValueLabel: { hoveredIndex, data },
        },
        scales: {
            y: {
                border: { display: false },
                beginAtZero: true,
                max: getDynamicYAxisMax(data),
                ticks: {
                    callback: (value: number) => `${value}%`,
                    color: "#9e9e9e",
                    font: { size: 12, weight: "300" },
                },
                grid: {
                    drawTicks: false,
                    borderColor: "transparent",
                    color: "rgba(0,0,0,0.05)",
                },
            },
            x: {
                grid: {
                    drawTicks: false,
                    drawBorder: false,
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: (_: unknown, index: number) => {
                        const month = data[index].month;
                        const goal = data[index].goal;
                        return [`${month}`, `$${goal.toLocaleString()}`];
                    },
                    color: "#555555",
                    font: {
                        size: 12,
                        weight: "700",
                        family: "'Nunito Sans'",
                    },
                    padding: 10,
                    maxRotation: isTablet ? 90 : 0,
                    minRotation: isTablet ? 90 : 0,
                },
            },
        },
    };

    return (
        <>
            <Bar
                data={chartData}
                options={options}
                plugins={[actualValueLabel, goalYAxisLabel]} // Pass plugins here instead
                style={{ height: '100%', width: '100%' }}
            />
            <Box
                id="chartjs-tooltip"
                sx={{
                    opacity: 0,
                    position: "absolute",
                    pointerEvents: "none",
                    transform: "translate(-50%, 0)",
                    transition: "all 0.1s ease",
                }}
            />
        </>
    );
};

export default CustomPerformanceBarChart;