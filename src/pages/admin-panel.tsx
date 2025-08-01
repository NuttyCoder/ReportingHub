// /src/pages/admin-panel.tsx
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Dialog } from '@headlessui/react';
import { saveAs } from 'file-saver';

const mockUsers = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', role: 'Admin', status: 'Active', permissions: { view: true, edit: true, delete: true } },
  { id: 2, name: 'John Smith', email: 'john@example.com', role: 'Analyst', status: 'Suspended', permissions: { view: true, edit: true, delete: false } },
  { id: 3, name: 'Maria Gomez', email: 'maria@example.com', role: 'Viewer', status: 'Active', permissions: { view: true, edit: false, delete: false } },
];

export default function AdminPanel() {
  // Audit logs data
  const auditLogs = [
    { message: 'Jane Doe updated permissions for John Smith', timestamp: '2025-07-31 09:15:00' },
    { message: 'Maria Gomez was added as a Viewer', timestamp: '2025-07-31 09:00:00' },
    { message: 'License limit reached for external users', timestamp: '2025-07-31 08:45:00' }
  ];

  // Export audit logs as CSV
  const exportAuditLogs = () => {
    const headers = ['Message', 'Timestamp'];
    const rows = auditLogs.map(log => [log.message, log.timestamp]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'audit_logs.csv');
  };
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor } = useTheme();
  const [brandName, setBrandName] = useState('');
  const [form, setForm] = useState({ id: null, name: '', email: '', role: 'Viewer', status: 'Active', permissions: { view: true, edit: false, delete: false } });

  const openModal = (user = { id: null, name: '', email: '', role: 'Viewer', status: 'Active', permissions: { view: true, edit: false, delete: false } }) => {
    setForm(user);
    setIsOpen(true);
  };

  const saveUser = () => {
    if (form.id) {
      setUsers(users.map(u => (u.id === form.id ? form : u)));
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setIsOpen(false);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status'];
    const rows = users.map(u => [u.id, u.name, u.email, u.role, u.status]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'user_data.csv');
  };

  // Import CSV handler
  const importCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      let text = event.target.result;
      if (typeof text !== 'string') {
        text = new TextDecoder('utf-8').decode(text);
      }
      const lines = text.split(/\r?\n/).filter(Boolean);
      // Expecting: Name,Email
      const newUsers = lines.map((line, idx) => {
        const [name, email] = line.split(',');
        if (!name || !email) return null;
        return { id: Date.now() + idx, name: name.trim(), email: email.trim(), role: 'Viewer', status: 'Active', permissions: { view: true, edit: false, delete: false } };
      }).filter(Boolean);
      setUsers([...users, ...newUsers]);
    };
    reader.readAsText(file);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (filterRole === 'All' || user.role === filterRole) &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div
      className={`space-y-6 min-h-screen p-6 transition-colors duration-300`}
      style={{
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor
      } as React.CSSProperties}
    >
      <h1 className="text-2xl font-semibold">Admin Panel</h1>

      

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1 text-sm border border-gray-300 rounded shadow-sm"
        />

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="text-sm border border-gray-300 rounded px-3 py-1 bg-white shadow-sm"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Analyst">Analyst</option>
          <option value="Viewer">Viewer</option>
        </select>

        <button onClick={() => openModal()} className="ml-auto px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">+ Add User</button>
        <button onClick={exportCSV} className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition">Export CSV</button>
        <label className="px-4 py-1 text-sm bg-pink-600 text-white rounded hover:bg-pink-700 transition cursor-pointer">
          Import CSV
          <input type="file" accept=".csv" onChange={importCSV} className="hidden" />
        </label>
      </div>

      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-gray-700 font-semibold">Name</th>
              <th className="px-4 py-2 text-gray-700 font-semibold">Email</th>
              <th className="px-4 py-2 text-gray-700 font-semibold">Role</th>
              <th className="px-4 py-2 text-gray-700 font-semibold">Status</th>
              <th className="px-4 py-2 text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const userWithPermissions = {
                ...user,
                permissions: user.permissions || { view: true, edit: false, delete: false }
              };
              return (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => openModal(userWithPermissions)}
                    >
                      Edit
                    </button>
                    <button className="text-xs text-red-600 hover:underline" onClick={() => setUsers(users.filter(u => u.id !== user.id))}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md z-50 text-gray-900 dark:text-white">
          <h2 className="text-lg font-semibold mb-4">{form.id ? 'Edit User' : 'Add User'}</h2>
          <div className="space-y-3">
            <input type="text" className="w-full border px-3 py-1 rounded text-sm" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" className="w-full border px-3 py-1 rounded text-sm" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <select className="w-full border px-3 py-1 rounded text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="Admin">Admin</option>
              <option value="Analyst">Analyst</option>
              <option value="Viewer">Viewer</option>
            </select>
            <select className="w-full border px-3 py-1 rounded text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
            <div className="text-sm font-medium">Permissions:</div>
            <label className="block"><input type="checkbox" checked={form.permissions.view} onChange={(e) => setForm({ ...form, permissions: { ...form.permissions, view: e.target.checked } })} /> View</label>
            <label className="block"><input type="checkbox" checked={form.permissions.edit} onChange={(e) => setForm({ ...form, permissions: { ...form.permissions, edit: e.target.checked } })} /> Edit</label>
            <label className="block"><input type="checkbox" checked={form.permissions.delete} onChange={(e) => setForm({ ...form, permissions: { ...form.permissions, delete: e.target.checked } })} /> Delete</label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setIsOpen(false)} className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button onClick={saveUser} className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </div>
      </Dialog>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Audit Logs</h2>
          <button onClick={exportAuditLogs} className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition">Export Logs</button>
        </div>
        <ul className="text-sm list-disc pl-5">
          {auditLogs.map((log, idx) => (
            <li key={idx}>
              <span className="font-medium">{log.message}</span>
              <span className="ml-2 text-xs text-gray-400">({log.timestamp})</span>
            </li>
          ))}
        </ul>
      </div>
</div>
      
  );
}


