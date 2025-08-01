// /src/pages/logistics.tsx
import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const logisticsRegions = ['North America', 'Europe', 'Asia'];
const carriers = ['DHL', 'FedEx', 'UPS'];

export default function Logistics() {
  const [region, setRegion] = useState('North America');
  const [carrier, setCarrier] = useState('DHL');
  const [showFleet, setShowFleet] = useState(true);
  const [showDeliveryTime, setShowDeliveryTime] = useState(true);

  const shipmentPerformance = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'On-Time %',
        data: [95, 92, 90, 94],
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
      {
        label: 'Delayed %',
        data: [5, 8, 10, 6],
        backgroundColor: '#ef4444',
        borderRadius: 6,
      },
    ],
  };

  const deliveryTimeData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Avg Delivery Time (days)',
        data: [2.1, 2.4, 2.2, 2.0],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  useEffect(() => {
    const pbiContainer = document.getElementById('powerbi-logistics');
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
  }, [region, carrier]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Logistics Dashboard</h1>

      <div className="flex gap-4">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
        >
          {logisticsRegions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <select
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
          className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
        >
          {carriers.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label className="text-sm flex items-center gap-1">
          <input type="checkbox" checked={showFleet} onChange={() => setShowFleet(!showFleet)} /> Fleet Usage
        </label>

        <label className="text-sm flex items-center gap-1">
          <input type="checkbox" checked={showDeliveryTime} onChange={() => setShowDeliveryTime(!showDeliveryTime)} /> Avg Delivery
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ease-in-out">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-2">Shipment Performance</h3>
          <Bar data={shipmentPerformance} options={{ responsive: true, animation: { duration: 800, easing: 'easeOutQuart' } }} />
        </div>

        {showFleet && (
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm animate-fade-in">
            <h3 className="text-sm text-gray-600 mb-2">Fleet Usage</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>{carrier} active routes in {region}</li>
              <li>Utilization at 86%</li>
              <li>Maintenance compliance: 97%</li>
            </ul>
          </div>
        )}

        {showDeliveryTime && (
          <div className="md:col-span-2 p-4 bg-white rounded-lg border border-gray-200 shadow-sm animate-fade-in">
            <h3 className="text-sm text-gray-600 mb-2">Average Delivery Time</h3>
            <Line data={deliveryTimeData} options={{ responsive: true, animation: { duration: 1000, easing: 'easeOutQuart' } }} />
          </div>
        )}
      </div>

      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm text-gray-600 mb-2">Power BI Insights</h3>
        <div id="powerbi-logistics" className="w-full h-[500px] rounded border border-gray-300"></div>
      </div>
    </div>
  );
}
