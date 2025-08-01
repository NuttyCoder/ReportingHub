// /src/pages/home.tsx
import React from 'react';

const stats = [
  { label: 'Total Clients', value: 24, icon: '👥', color: 'bg-blue-100 text-blue-800' },
  { label: 'Active Subscriptions', value: 18, icon: '📈', color: 'bg-green-100 text-green-800' },
  { label: 'Pending Payments', value: 3, icon: '💳', color: 'bg-yellow-100 text-yellow-800' },
  { label: 'Reports Shared', value: 42, icon: '📊', color: 'bg-purple-100 text-purple-800' },
];

const recentActivity = [
  { id: 1, type: 'Login', desc: 'You logged in from Dallas, TX', date: 'Jul 30, 2025' },
  { id: 2, type: 'Report', desc: 'You downloaded the Q2 Financial Report', date: 'Jul 29, 2025' },
  { id: 3, type: 'User', desc: 'New user "Jane Smith" added to your account', date: 'Jul 28, 2025' },
  { id: 4, type: 'Subscription', desc: 'Your subscription renewed successfully', date: 'Jul 27, 2025' },
];

export default function Home() {
  // Compact client dashboard (from Client Management)
  const client = { name: 'Acme Corporation', plan: 'Enterprise', status: 'Active', renewal: 'Aug 15, 2025', users: 5 };
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <h1 className="text-3xl font-bold mb-2 text-blue-900">Welcome to My Data Hub</h1>
      <p className="text-gray-500 mb-8">Your central dashboard for users, subscription, and report management.</p>
      {/* Compact Client Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">{client.users}</div>
          <div className="text-xs text-gray-500">Active Users</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className={`px-2 py-1 rounded text-sm font-semibold mb-2 ${client.plan === 'Enterprise' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{client.plan}</div>
          <div className="text-xs text-gray-500">Subscription Plan</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className={`px-2 py-1 rounded-full text-sm font-semibold mb-2 ${client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{client.status}</div>
          <div className="text-xs text-gray-500">Status</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-sm font-bold text-gray-700 mb-2">{client.renewal}</div>
          <div className="text-xs text-gray-500">Renewal Date</div>
        </div>
      </div>
     
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4 text-blue-900">Recent Activity</h2>
        <ul className="divide-y divide-gray-100">
          {recentActivity.map(activity => (
            <li key={activity.id} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-medium text-blue-700 mr-2">[{activity.type}]</span>
                {activity.desc}
              </div>
              <span className="text-xs text-gray-400">{activity.date}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl shadow p-6 flex flex-col items-start">
          <div className="text-lg font-semibold mb-2">Add New User</div>
          <p className="text-sm mb-4">Quickly add a new user to your business account.</p>
          <button className="px-4 py-2 bg-white text-blue-600 rounded font-bold shadow hover:bg-blue-50">Add User</button>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-xl shadow p-6 flex flex-col items-start">
          <div className="text-lg font-semibold mb-2">Share Report</div>
          <p className="text-sm mb-4">Send a KPI or financial report to a client.</p>
          <button className="px-4 py-2 bg-white text-green-600 rounded font-bold shadow hover:bg-green-50">Share Report</button>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-xl shadow p-6 flex flex-col items-start">
          <div className="text-lg font-semibold mb-2">View Analytics</div>
          <p className="text-sm mb-4">See platform usage and performance analytics.</p>
          <button className="px-4 py-2 bg-white text-purple-600 rounded font-bold shadow hover:bg-purple-50">View Analytics</button>
        </div>
      </div>
    </div>
  );
}
