import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
} from 'chart.js';
import type {
    ChartOptions,
    ChartData,
    ChartDataset
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);

type YearlyData = {
    year: number;
    actualSum: number;
    targetSum: number;
};

const formatCurrency = (value: number): string => {
    return `$${Math.floor(value).toLocaleString()}`;
};

interface PreviousYearsChartProps {
    data: YearlyData[];
}

const PreviousYearsChart: React.FC<PreviousYearsChartProps> = ({ data }) => {
    const labels = data.map((item) => item.year.toString());

    const datasetData = data.map((item) => {
        const ratio = item.targetSum === 0 ? 0 : item.actualSum / item.targetSum;
        const percent = Math.min(ratio, 1) * 99; // Cap at 99% to leave space for label
        return percent < 40 ? 40 : percent; // Minimum bar width for visibility
    });

    const dataset: ChartDataset<'bar', number[]> = {
        data: datasetData,
        backgroundColor: '#525252',
        borderRadius: 5,
        barThickness: 30,
        categoryPercentage: 1.0, // 1.0 = full category width (no spacing)
        barPercentage: 1.0, 
    };

    const chartData: ChartData<'bar', number[], string> = {
        labels,
        datasets: [dataset],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        indexAxis: 'y',
        scales: {
            x: {
                display: false,
                max: 100,
            },
            y: {
                ticks: {
                    font: {
                        family: 'Nunito Sans',
                        size: 12,
                        weight: 'bold',
                    },
                    color: '#2B303466',
                },
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },

            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
            datalabels: {
                anchor: (ctx) => {
                    const val = ctx.dataset.data[ctx.dataIndex] as number;
                    return val <= 2 ? 'end' : 'center';
                },
                align: (ctx) => {
                    const val = ctx.dataset.data[ctx.dataIndex] as number;
                    return val <= 2 ? 'end' : 'center';
                },
                offset: (ctx) => {
                    const val = ctx.dataset.data[ctx.dataIndex] as number;
                    return val <= 2 ? -5 : 0;
                },
                color: (ctx) => {
                    const val = ctx.dataset.data[ctx.dataIndex] as number;
                    return val <= 2 ? '#525252' : '#FFFFFF';
                },
                formatter: (_: any, context: any) => {
                    const item = data[context.dataIndex];
                    return `${formatCurrency(item.actualSum)} / ${formatCurrency(item.targetSum)}`;
                },
                font: {
                    size: 12,
                    weight: 'bold',
                    family: 'Nunito Sans',
                },
                clip: false,
            },
        },
    };

    return <div style={{ width: '100%', height: '100%' }}>
        <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
    </div>
};

export default PreviousYearsChart;
