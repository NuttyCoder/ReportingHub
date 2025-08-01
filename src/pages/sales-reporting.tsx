// /src/pages/sales-reporting.tsx
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const productSalesData = {
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    data: {
      north: [3000, 2500, 2200, 3100, 2800],
      south: [3300, 2900, 2500, 3200, 3100],
      east: [2800, 2700, 2400, 3000, 2600],
      west: [2900, 2700, 2500, 3100, 2500],
    },
  },
  quarterly: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    data: {
      north: [8200, 9100, 8900, 9500],
      south: [8800, 9200, 8600, 9600],
      east: [7900, 8700, 8200, 8900],
      west: [8000, 8500, 8100, 8800],
    },
  },
};

export default function SalesReporting() {
  const [period, setPeriod] = useState('monthly');
  const [region, setRegion] = useState('all');
  const [department, setDepartment] = useState('all');

  const labels = productSalesData[period].labels;
  const regionKeys = ['north', 'south', 'east', 'west'];

  const filteredData = labels.map((_, i) => {
    if (region === 'all') {
      return regionKeys.reduce((sum, r) => sum + productSalesData[period].data[r][i], 0) / regionKeys.length;
    } else {
      return productSalesData[period].data[region][i];
    }
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Product Sales ($)',
        data: filteredData,
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: period === 'monthly' ? 'Monthly Sales Overview' : 'Quarterly Sales Overview',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
      },
      x: {
        grid: { color: '#f3f4f6' },
      },
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Sales Reporting</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-sm text-gray-500">Top Performing Products</h2>
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            <li>📦 Product A — $12,000</li>
            <li>📦 Product B — $9,800</li>
            <li>📦 Product C — $7,600</li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-sm text-gray-500">Regional Sales</h2>
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            <li>🌎 North — $24,000</li>
            <li>🌎 South — $22,500</li>
            <li>🌎 East — $20,100</li>
            <li>🌎 West — $18,400</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex gap-3">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
            >
              <option value="all">All Regions</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
            >
              <option value="all">All Departments</option>
              <option value="sales">Sales</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

