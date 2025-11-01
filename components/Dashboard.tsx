import React from 'react';
// Fix: Added .tsx extension to ensure module resolution.
import DashboardCard from './DashboardCard.tsx';
import { ChartBarIcon, UsersIcon, PackageIcon, TruckIcon } from './Icons.tsx';
// Fix: Added .ts extension to ensure module resolution.
import { Product, Customer, Vendor, Sale } from '../types.ts';

interface DashboardProps {
  products: Product[];
  customers: Customer[];
  vendors: Vendor[];
  sales: Sale[];
}

const Dashboard: React.FC<DashboardProps> = ({ products, customers, vendors, sales }) => {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalCustomers = customers.length;
  const totalVendors = vendors.length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<ChartBarIcon className="h-8 w-8 text-white" />}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Total Stock"
          value={totalStock.toLocaleString()}
          icon={<PackageIcon className="h-8 w-8 text-white" />}
          color="bg-green-500"
        />
        <DashboardCard
          title="Total Customers"
          value={totalCustomers}
          icon={<UsersIcon className="h-8 w-8 text-white" />}
          color="bg-yellow-500"
        />
        <DashboardCard
          title="Total Vendors"
          value={totalVendors}
          icon={<TruckIcon className="h-8 w-8 text-white" />}
          color="bg-red-500"
        />
      </div>
      {/* We can add more components like recent sales, top products etc. here */}
    </div>
  );
};

export default Dashboard;
