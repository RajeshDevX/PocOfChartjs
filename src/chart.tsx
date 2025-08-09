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
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Actual label plugin
const actualValueLabel = {
  id: "actualValueLabel",
  afterDatasetsDraw(chart: Chart<any>, args: any, pluginOptions: any) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    meta.data.forEach((bar: any, index: number) => {
      if (pluginOptions.hoveredIndex === index) return;

      const actual = pluginOptions.data[index].actual;
      if (actual == null) return;

      const label = `$${actual.toLocaleString()}`;
      ctx.fillStyle = "#555";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, bar.x, bar.y - 10);
    });
    ctx.restore();
  },
};

const goalYAxisLabel = {
  id: "goalYAxisLabel",
  afterDraw(chart: Chart<any>) {
    const { ctx, chartArea, scales } = chart;
    const yAxis = scales.y;
    const xAxis = scales.x;

    // Get pixel for y=0
    const y0 = yAxis.getPixelForValue(0);

    // Position to the left of y-axis line
    const x = chartArea.left - 10;
    const y = y0 + 35.1; // Adjust this to match your spacing

    ctx.save();
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#666";
    ctx.textAlign = "right";
    ctx.fillText("Goal", x, y);
    ctx.restore();
  },
};
ChartJS.register(actualValueLabel, goalYAxisLabel);
type DataType = {
  month: string;
  actual?: number;
  goal: number;
};

const data: DataType[] = [
  { month: "Jan", actual: 400000, goal: 50000 },
  { month: "Feb", actual: 60000, goal: 80000 },
  { month: "Mar", actual: 70000, goal: 100000 },
  { month: "Apr", actual: 90000, goal: 90000 },
  { month: "May", actual: 50000, goal: 70000 },
  { month: "Jun", actual: 80000, goal: 100000 },
  { month: "Jul", actual: 95000, goal: 0 },
  { month: "Aug", goal: 130000 },
  { month: "Sep", actual: 85000, goal: 100000 },
  { month: "Oct", actual: 100000, goal: 100000 },
  { month: "Nov", actual: 65000, goal: 90000 },
  { month: "Dec", actual: 75000, goal: 110000 },
];

function App() {
  const isMobile = window.innerWidth < 1080;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const performanceData = data.map((d) => {
    if (!d.actual || d.goal === 0) return 2;
    return Math.round((d.actual / d.goal) * 100);
  });

  const barColors = data.map((d) => {
    if (!d.actual || d.goal === 0) return "#000";
    return d.actual >= d.goal ? "#4CAF50" : "#FF9800";
  });

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Performance (%)",
        data: performanceData,
        backgroundColor: barColors,
        borderRadius: 6,
        barThickness: 30,

      },
    ],
  };
  function getDynamicYAxisMax(data: DataType[]): number {
    const percentages = data.map(d =>
      d.actual && d.goal ? Math.round((d.actual / d.goal) * 100) : 0
    );

    const maxPercentage = Math.max(...percentages, 100);

    const step = maxPercentage <= 200 ? 20 : maxPercentage <= 500 ? 50 : 100;

    return Math.ceil(maxPercentage / step) * step;
  }


  const options: any = {
    responsive: true,
    layout: {
      padding: {
        top: 30, // <-- Add padding for value labels
      },
    }, plugins: {
      legend: { display: false },
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

          // Update tooltip content
          tooltipEl.innerHTML = `
    <div style="background:#333;color:#fff;padding:4px 8px;border-radius:4px;font-size:12px;white-space:nowrap;">
      Actual: ${actual ?? "N/A"}<br/>
      Goal: ${goal}<br/>
      ${actual && goal
              ? `Performance: ${Math.round((actual / goal) * 100)}%`
              : "Insufficient data"
            }
    </div>
  `;

          // Make tooltip visible first to get accurate measurements
          tooltipEl.style.opacity = "1";
          tooltipEl.style.position = "absolute";
          tooltipEl.style.pointerEvents = "none";

          // Get bar element and chart canvas
          const dataPoint = tooltipModel.dataPoints[0].element;
          const chart = context.chart;
          const canvas = chart.canvas;
          const canvasRect = canvas.getBoundingClientRect();

          // Calculate bar center position
          const barCenterX = dataPoint.x;
          const barTopY = dataPoint.y;
          const leftPosition = barCenterX;
          const topPosition = barTopY; 

          tooltipEl.style.left = `${leftPosition}px`;
          tooltipEl.style.top = `${topPosition}px`;
        }

      },
      actualValueLabel: {
        hoveredIndex,
        data,
      },
    },
    onHover: (event: any, elements: any) => {
      setHoveredIndex(elements.length > 0 ? elements[0].index : null);
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
          padding: 8,
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
          callback: function (_: unknown, index: number) {
            const month = data[index].month;
            const goal = data[index].goal;
            return isMobile ? `${month}\n$${goal.toLocaleString()}` : [`${month}`, `$${goal.toLocaleString()}`];
          },
          color: "#9e9e9e",
          font: {
            size: isMobile ? 10 : 12,
            weight: "300",
          },
          padding: isMobile ? 2 : 10,
          maxRotation: isMobile ? 90 : 0,
          minRotation: isMobile ? 90 : 0,
        }
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        px: { xs: 1, sm: 2, md: 3 }, // padding for inner spacing
        maxWidth: {
          xs: "100%",   // Mobile
          sm: "600px",  // Portrait tablet
          md: "900px",  // Tablet
          lg: "1080px", // Laptop
          xl: "1280px", // Desktop
        },
        height: "746px",
        backgroundColor: 'red',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Box
        sx={{
          width: "100%",
          maxWidth: "1080px",
          height: "600px",
          position: "relative",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Bar data={chartData} options={options} />
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
      </Box>
    </Box>
  );
}

export default App;
