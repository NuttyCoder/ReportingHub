// /src/layouts/MainLayout.tsx
import { ReactNode, useState } from 'react';
import { useLogo } from '@/context/LogoContext';
import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  BarChart2Icon,
  DollarSignIcon,
  TrendingUpIcon,
  PieChartIcon,
  TruckIcon,
  ShieldIcon,
  SettingsIcon,
  CreditCardIcon,
  HelpCircleIcon
} from 'lucide-react';

const navItems = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Dashboard', icon: BarChart2Icon },
  { label: 'Sales Reporting', icon: DollarSignIcon },
  { label: "Financial KPIs", icon: TrendingUpIcon },
  { label: 'Marketing', icon: PieChartIcon },
  { label: 'Row Level Security', icon: ShieldIcon },
  { label: 'Admin Panel', icon: SettingsIcon },
  { label: 'Client Management', icon: CreditCardIcon },
  { label: 'Help', icon: HelpCircleIcon },
];


export function MainLayout({ children }: { children: ReactNode }) {
  const { logo, setLogo } = useLogo();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const isAdmin = true; // Change to false to simulate client view
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f9fafa] text-gray-900">
      {/* Sidebar for desktop */}
      <aside className="w-56 bg-white border-r border-gray-200 hidden md:block">
        <div className="flex flex-col items-center p-5">
          {logo ? (
            <img src={logo} alt="Logo" className="h-12 mb-2 object-contain" />
          ) : null}
          <div className="text-lg font-semibold tracking-tight">My Data Hub</div>
        </div>
        <nav className="px-4 py-3 space-y-1">
          {navItems
            .filter(item => item.label !== 'Client Management' || isAdmin)
            .map(({ label, icon: Icon }) => (
              <Link key={label} href={`/${label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    router.pathname.includes(label.toLowerCase().split(' ')[0])
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  >
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
              </Link>
            ))}
        </nav>
      </aside>

      {/* Mobile nav bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 h-20 flex flex-col items-center justify-center px-4">
        {logo ? (
          <img src={logo} alt="Logo" className="h-10 mt-2 mb-1 object-contain" />
        ) : null}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Open menu"
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              {/* Hamburger icon */}
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <span className="font-semibold text-lg tracking-tight">My Data Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label={theme === 'Dark Theme' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setTheme(theme === 'Dark Theme' ? 'Light Theme' : 'Dark Theme')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              {theme === 'Dark Theme' ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex">
          <aside className="w-64 bg-white h-full shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-lg tracking-tight">My Data Hub</span>
              <button
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* X icon */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <nav className="space-y-2">
              {navItems
                .filter(item => item.label !== 'Client Management' || isAdmin)
                .map(({ label, icon: Icon }) => (
                  <Link key={label} href={`/${label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        router.pathname.includes(label.toLowerCase().split(' ')[0])
                          ? 'bg-gray-100 text-gray-900 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </div>
                  </Link>
                ))}
            </nav>
          </aside>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main content area, with top padding for mobile nav bar */}
      <main className="flex-1 flex flex-col pt-0 md:pt-0">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 text-sm hidden md:flex">
          <div className="text-gray-700">Welcome back</div>
          <div className="flex items-center gap-4">
            {/* Theme toggle icon */}
            <button
              aria-label={theme === 'Dark Theme' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setTheme(theme === 'Dark Theme' ? 'Light Theme' : 'Dark Theme')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              {theme === 'Dark Theme' ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <span className="text-gray-500">user@example.com</span>
            <button className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 transition">Logout</button>
          </div>
        </header>
        <section className="flex-1 overflow-auto p-8 pt-20 md:pt-8">{children}</section>
      </main>
    </div>
  );
}


