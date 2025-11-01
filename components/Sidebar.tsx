
import React from 'react';
// FIX: Import `SalesIcon` from `./Icons` to resolve the "Cannot find name 'SalesIcon'" error.
import { DashboardIcon, StockIcon, CustomerIcon, VendorIcon, SalesIcon } from './Icons';
import { type View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  view: View;
  label: string;
  icon: React.ReactNode;
  currentView: View;
  onClick: (view: View) => void;
}> = ({ view, label, icon, currentView, onClick }) => {
  const isActive = currentView === view;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(view);
      }}
      className={`flex items-center px-4 py-3 text-gray-200 hover:bg-medium hover:text-white rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-secondary text-white' : ''
      }`}
    >
      {icon}
      <span className="mx-4 font-medium">{label}</span>
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-dark text-white">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <SalesIcon className="h-8 w-8 text-secondary" />
        <h1 className="text-2xl font-bold ml-2">S3 Tech</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavItem view="dashboard" label="Dashboard" icon={<DashboardIcon className="h-6 w-6" />} currentView={currentView} onClick={setCurrentView} />
        <NavItem view="stocks" label="Stocks" icon={<StockIcon className="h-6 w-6" />} currentView={currentView} onClick={setCurrentView} />
        <NavItem view="customers" label="Customers" icon={<CustomerIcon className="h-6 w-6" />} currentView={currentView} onClick={setCurrentView} />
        <NavItem view="vendors" label="Vendors" icon={<VendorIcon className="h-6 w-6" />} currentView={currentView} onClick={setCurrentView} />
      </nav>
    </div>
  );
};

export default Sidebar;