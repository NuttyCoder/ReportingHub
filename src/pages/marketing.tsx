// /src/pages/marketing.tsx
import { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const campaignOptions = ['Spring Launch', 'Holiday Promo', 'Black Friday'];
const regionOptions = ['North America', 'Europe', 'Asia'];

const getCampaignData = (campaign: string, region: string) => {
  const leads = {
    'Spring Launch': { 'North America': 420, Europe: 360, Asia: 300 },
    'Holiday Promo': { 'North America': 500, Europe: 410, Asia: 380 },
    'Black Friday': { 'North America': 710, Europe: 620, Asia: 540 },
  };
  const spend = {
    'Spring Launch': { 'North America': 130, Europe: 110, Asia: 90 },
    'Holiday Promo': { 'North America': 150, Europe: 120, Asia: 100 },
    'Black Friday': { 'North America': 160, Europe: 140, Asia: 120 },
  };

  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Leads Generated',
        data: [leads[campaign][region], 620, 500, 710],
        backgroundColor: '#6366f1',
        borderRadius: 6,
      },
      {
        label: 'Ad Spend ($K)',
        data: [spend[campaign][region], 150, 130, 160],
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
    ],
  };
};

const getEngagementData = (campaign: string, region: string) => {
  const data = {
    'Spring Launch': {
      'North America': [300, 900, 80],
      Europe: [280, 800, 70],
      Asia: [250, 700, 60],
    },
    'Holiday Promo': {
      'North America': [350, 1000, 85],
      Europe: [320, 900, 75],
      Asia: [290, 850, 65],
    },
    'Black Friday': {
      'North America': [400, 1200, 95],
      Europe: [370, 1100, 90],
      Asia: [330, 1000, 80],
    },
  };
  return {
    labels: ['Clicks', 'Views', 'Conversions'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: data[campaign][region],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        hoverOffset: 6,
      },
    ],
  };
};

const getConversionData = (campaign: string, region: string) => {
  const data = {
    'Spring Launch': {
      'North America': [2.1, 2.4, 2.7, 3.0],
      Europe: [2.0, 2.3, 2.5, 2.8],
      Asia: [1.9, 2.2, 2.4, 2.6],
    },
    'Holiday Promo': {
      'North America': [2.5, 2.8, 3.0, 3.3],
      Europe: [2.3, 2.6, 2.9, 3.1],
      Asia: [2.1, 2.4, 2.6, 2.9],
    },
    'Black Friday': {
      'North America': [3.0, 3.3, 3.5, 3.8],
      Europe: [2.7, 3.0, 3.2, 3.4],
      Asia: [2.4, 2.7, 2.9, 3.2],
    },
  };
  return {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Conversion %',
        data: data[campaign][region],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
};

const options = {
  responsive: true,
  animation: {
    duration: 800,
    easing: 'easeOutQuart' as const,
  },
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Marketing Campaign Performance' },
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

export default function Marketing() {
  const [campaign, setCampaign] = useState(campaignOptions[0]);
  const [region, setRegion] = useState(regionOptions[0]);

  const campaignData = getCampaignData(campaign, region);
  const engagementData = getEngagementData(campaign, region);
  const conversionData = getConversionData(campaign, region);

  useEffect(() => {
    const pbiContainer = document.getElementById('powerbi-embed');
    if (pbiContainer && (window as any).powerbi) {
      (window as any).powerbi.embed(pbiContainer, {
        type: 'report',
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&groupId=YOUR_WORKSPACE_ID',
        tokenType: 1,
        accessToken: 'YOUR_ACCESS_TOKEN',
        settings: {
          panes: { filters: { visible: false }, pageNavigation: { visible: false } },
          background: 'Transparent',
        },
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Marketing Dashboard</h1>

      <div className="flex gap-4">
        <select
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
        >
          {campaignOptions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
        >
          {regionOptions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Campaign Results</h3>
          <Bar data={campaignData} options={options} />
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Key Insights</h3>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>Lead generation varies by campaign and region.</li>
            <li>Compare campaign impact using dropdown filters.</li>
            <li>Visualize ROI trends across quarters.</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Engagement Breakdown</h3>
          <Pie data={engagementData} options={{ animation: { animateRotate: true, duration: 1000 } }} />
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Weekly Conversion Trend</h3>
          <Line data={conversionData} options={options} />
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm text-gray-600 mb-2">Power BI Insights</h3>
        <div id="powerbi-embed" className="w-full h-[500px] rounded border border-gray-300"></div>
      </div>
    </div>
  );
}




