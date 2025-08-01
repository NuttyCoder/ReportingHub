// /src/pages/financial-kpis.tsx
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const financialData = {
  revenue: {
    yearly: [850000, 980000, 1050000, 1200000],
    quarterly: [300000, 280000, 320000, 350000],
  },
  ebitda: {
    yearly: [220000, 270000, 300000, 350000],
    quarterly: [80000, 75000, 90000, 105000],
  },
};

export default function FinancialKPIs() {
  const [view, setView] = useState('yearly');

  const revenueChart = {
    labels: view === 'yearly' ? ['2020', '2021', '2022', '2023'] : ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: financialData.revenue[view],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.4,
      },
    ],
  };

  const ebitdaChart = {
    labels: view === 'yearly' ? ['2020', '2021', '2022', '2023'] : ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'EBITDA ($)',
        data: financialData.ebitda[view],
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#e5e7eb' } },
      x: { grid: { color: '#f3f4f6' } },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Financial KPIs</h1>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
        >
          <option value="yearly">Yearly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-sm text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold text-gray-900">$1.2M</p>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-sm text-gray-500">EBITDA</h2>
          <p className="text-2xl font-bold text-gray-900">$350K</p>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-sm text-gray-500">Gross Margin</h2>
          <p className="text-2xl font-bold text-gray-900">62%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Revenue Trend</h3>
          <Line data={revenueChart} options={options} />
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">EBITDA Trend</h3>
          <Line data={ebitdaChart} options={options} />
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm text-gray-600 mb-2">Financial Performance Notes</h3>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>Revenue increased 8% QoQ driven by new enterprise clients.</li>
          <li>EBITDA margin remained stable despite increased marketing spend.</li>
          <li>Operational efficiency gains improved gross margin by 3%.</li>
        </ul>
      </div>
    </div>
  );
}
