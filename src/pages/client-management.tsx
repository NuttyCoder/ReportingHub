
// --- New Client Management Page ---
import React, { useState } from 'react';
import { useLogo } from '@/context/LogoContext';
  const { setLogo } = useLogo();

// ...existing client management code...
const mockClients = [
  { id: 1, name: 'Acme Corporation', plan: 'Enterprise', status: 'Active', renewal: 'Aug 15, 2025', users: 5 },
  { id: 2, name: 'Global Innovations', plan: 'Enterprise', status: 'Active', renewal: 'Sep 3, 2025', users: 12 },
  { id: 3, name: 'Tech Solutions', plan: 'Professional', status: 'Pending', renewal: 'Jul 22, 2025', users: 3 },
  { id: 4, name: 'Nova Ventures', plan: 'Professional', status: 'Active', renewal: 'Oct 10, 2025', users: 8 },
];

const emailTemplates = [
  { id: 1, name: 'Welcome Email', description: 'Sent when a new user is added' },
  { id: 2, name: 'Report Notification', description: 'Sent when a report is shared' },
  { id: 3, name: 'Subscription Renewal', description: 'Sent before subscription renewal' },
  { id: 4, name: 'Alert Notification', description: 'Sent when KPI threshold is reached' },
];

export default function ClientManagement() {
  const [selectedGateway, setSelectedGateway] = useState('Stripe');
  const [apiKey, setApiKey] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [autoRenew, setAutoRenew] = useState(true);
  const [sendReceipts, setSendReceipts] = useState(true);
  const [brandName, setBrandName] = useState('Acme Analytics');
  const [primaryColor, setPrimaryColor] = useState('#44361EE');
  const [secondaryColor, setSecondaryColor] = useState('#3F37C9');
  const [customDomain, setCustomDomain] = useState('analytics.acmecorp.com');
  const [removeFooter, setRemoveFooter] = useState(true);
  const { setLogo } = useLogo();
  const [localLogoFile, setLocalLogoFile] = useState<File | null>(null);

  // ...existing client management code...
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gray-50">
      <h1 className="text-2xl font-semibold">Client Management</h1>
      <p className="text-gray-500 mb-6">Manage subscriptions and white label settings</p>
      {/* Subscription Management */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Subscription Management</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Client</th>
              <th className="py-2 text-left">Plan</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Renewal</th>
              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockClients.map(client => (
              <tr key={client.id} className="border-b">
                <td className="py-2 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                    {client.name.split(' ').map(w => w[0]).join('')}
                  </span>
                  <span>{client.name}</span>
                  <span className="text-xs text-gray-400 ml-2">{client.users} users</span>
                </td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${client.plan === 'Enterprise' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{client.plan}</span>
                </td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{client.status}</span>
                </td>
                <td className="py-2">{client.renewal}</td>
                <td className="py-2">
                  <button className="text-pink-600 hover:underline text-sm">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Payment Integration */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Payment Integration</h2>
        <div className="flex gap-4 mb-4">
          {['Stripe', 'PayPal', 'Other'].map(gateway => (
            <button
              key={gateway}
              className={`flex-1 py-2 border rounded-lg text-sm font-medium ${selectedGateway === gateway ? 'border-pink-500 bg-pink-50' : 'border-gray-200 bg-white'}`}
              onClick={() => setSelectedGateway(gateway)}
            >
              {gateway}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium mb-1">API Key</label>
            <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Webhook Secret</label>
            <input type="password" value={webhookSecret} onChange={e => setWebhookSecret(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="flex gap-6 items-center mb-4">
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={autoRenew} onChange={e => setAutoRenew(e.target.checked)} /> Enable automatic subscription renewal
          </label>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={sendReceipts} onChange={e => setSendReceipts(e.target.checked)} /> Send payment receipts to clients
          </label>
        </div>
        <button className="px-6 py-2 bg-pink-600 text-white rounded font-medium">Save Settings</button>
      </div>
      {/* White Label Settings */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">White Label Settings</h2>
          <label className="block text-xs font-medium mb-1">Brand Name</label>
          {/* Brand name input removed due to stub context */}
          <label className="block text-xs font-medium mb-1">Logo Upload</label>
          <div className="w-full h-32 border-dashed border-2 border-gray-300 rounded flex items-center justify-center mb-4">
            <input
              type="file"
              className="hidden"
              id="logo-upload"
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0] || null;
                setLocalLogoFile(file);
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                  setLogo();
                  };
                  reader.readAsDataURL(file);
                } else {
                  setLogo();
                }
              }}
            />
            <label htmlFor="logo-upload" className="cursor-pointer text-gray-400 flex flex-col items-center">
              <span className="text-2xl">📁</span>
              <span>Drag and drop your logo here</span>
              <span className="text-pink-600 underline">Browse Files</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium mb-1">Primary Color</label>
              <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-full h-10 border rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Secondary Color</label>
              <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="w-full h-10 border rounded" />
            </div>
          </div>
          <label className="block text-xs font-medium mb-1">Custom Domain</label>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400">https://</span>
            <input type="text" value={customDomain} onChange={e => setCustomDomain(e.target.value)} className="flex-1 border rounded px-3 py-2 text-sm" />
          </div>
          <label className="flex items-center gap-2 text-xs mb-4">
            <input type="checkbox" checked={removeFooter} onChange={e => setRemoveFooter(e.target.checked)} /> Remove "Powered by 7 Realms AI"
          </label>
          <button className="px-6 py-2 bg-pink-600 text-white rounded font-medium">Apply Branding</button>
        </div>
        {/* Email Templates */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Email Templates</h2>
          <div className="space-y-3">
            {emailTemplates.map(template => (
              <div key={template.id} className="bg-gray-50 border rounded px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-gray-500">{template.description}</div>
                </div>
                <button className="text-pink-600 hover:underline text-sm">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
