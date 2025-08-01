// /src/pages/dashboard.tsx
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Title);

const chartData = {
  'last-7': {
    north: { sales: 7000, churn: 2.2 },
    south: { sales: 8000, churn: 2.5 },
    east: { sales: 7500, churn: 2.3 },
    west: { sales: 8500, churn: 2.6 },
  },
  'last-30': {
    north: { sales: 20000, churn: 2.4 },
    south: { sales: 24000, churn: 2.6 },
    east: { sales: 22000, churn: 2.5 },
    west: { sales: 25000, churn: 2.7 },
  },
  'last-90': {
    north: { sales: 55000, churn: 2.3 },
    south: { sales: 58000, churn: 2.5 },
    east: { sales: 53000, churn: 2.2 },
    west: { sales: 60000, churn: 2.6 },
  },
};

function getFilteredData(range: string, region: string) {
  const baseLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const regions = region === 'all' ? Object.keys(chartData[range]) : [region];

  const barValues = baseLabels.map((_, i) =>
    regions.reduce((sum, r) => sum + chartData[range][r].sales * (1 + i * 0.02), 0) / regions.length
  );

  const lineValues = baseLabels.map((_, i) =>
    regions.reduce((sum, r) => sum + chartData[range][r].churn * (1 + i * 0.01), 0) / regions.length
  );

  return {
    barData: {
      labels: baseLabels,
      datasets: [
        {
          label: 'Sales ($)',
          data: barValues,
          backgroundColor: '#3b82f6',
        },
      ],
    },
    lineData: {
      labels: baseLabels,
      datasets: [
        {
          label: 'Churn Rate (%)',
          data: lineValues,
          borderColor: '#10b981',
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: "top" as const },
        title: { display: true, text: 'KPI Overview', font: { size: 16 } },
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#e5e7eb' } },
        x: { grid: { color: '#f3f4f6' } },
      },
    },
  };
}

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState('last-30');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const { barData, lineData, options } = getFilteredData(selectedRange, selectedRegion);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <div className="flex gap-3">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
          >
            <option value="all">All Regions</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
          >
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
          </select>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
          >
            <option value="last-7">Last 7 Days</option>
            <option value="last-30">Last 30 Days</option>
            <option value="last-90">Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-sm text-gray-500">Sales This Month</h2>
          <p className="text-xl font-bold text-gray-900">$24,500</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-sm text-gray-500">Active Subscriptions</h2>
          <p className="text-xl font-bold text-gray-900">1,204</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-sm text-gray-500">Churn Rate</h2>
          <p className="text-xl font-bold text-gray-900">2.5%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Sales Performance</h3>
          <Bar data={barData} options={options} />
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Churn Trend</h3>
          <Line data={lineData} options={options} />
        </div>
      </div>

      {/* Embedded Power BI Report */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm text-gray-600 mb-2">Embedded Power BI Report</h3>
        <iframe
          title="Power BI Report"
          width="100%"
          height="500"
          src="https://app.powerbi.com/view?r=YOUR_REPORT_ID"
          frameBorder="0"
          allowFullScreen
          className="rounded border border-gray-300"
        ></iframe>
      </div>
    </div>
  );
}
