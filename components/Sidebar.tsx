import React from 'react';
import { DashboardIcon, PackageIcon, UsersIcon, TruckIcon, TagIcon } from './Icons';
import { View } from '../App.tsx';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="h-6 w-6" /> },
    { id: 'stock', label: 'Stock', icon: <PackageIcon className="h-6 w-6" /> },
    { id: 'customers', label: 'Customers', icon: <UsersIcon className="h-6 w-6" /> },
    { id: 'vendors', label: 'Vendors', icon: <TruckIcon className="h-6 w-6" /> },
    { id: 'categories', label: 'Categories', icon: <TagIcon className="h-6 w-6" /> },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-10">Gemini ERP</div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setCurrentView(item.id as View)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  currentView === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span className="ml-4">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
