import React from 'react';
import DashboardCard from './DashboardCard';
import { CustomerIcon, StockIcon, VendorIcon, SalesIcon } from './Icons';
import { mockProducts, mockCustomers, mockVendors, mockSales } from '../mockData';

const Dashboard: React.FC = () => {
    const totalSales = mockSales.reduce((acc, sale) => acc + sale.totalAmount, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const totalStock = mockProducts.reduce((acc, product) => acc + product.quantity, 0);
    const customerCount = mockCustomers.length;
    const vendorCount = mockVendors.length;

    const salesData = mockSales.map(sale => ({
        name: new Date(sale.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        Sales: sale.totalAmount,
    })).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Total Sales" value={totalSales} icon={<SalesIcon className="h-6 w-6 text-white" />} color="bg-green-500" />
                <DashboardCard title="Total Stock Items" value={totalStock} icon={<StockIcon className="h-6 w-6 text-white" />} color="bg-blue-500" />
                <DashboardCard title="Customers" value={customerCount} icon={<CustomerIcon className="h-6 w-6 text-white" />} color="bg-yellow-500" />
                <DashboardCard title="Vendors" value={vendorCount} icon={<VendorIcon className="h-6 w-6 text-white" />} color="bg-purple-500" />
            </div>

            {/* Sales Chart and Recent Sales */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Overview</h2>
                    <div className="flex justify-around items-end h-64 border-l border-b border-gray-200 p-4 space-x-2">
                        {salesData.length > 0 ? (
                            salesData.map((data, index) => {
                                const maxSale = Math.max(...salesData.map(d => d.Sales), 1); // Avoid division by zero
                                const heightPercentage = (data.Sales / maxSale) * 100;
                                return (
                                    <div key={index} className="flex flex-col items-center flex-1 h-full justify-end">
                                        <div 
                                            className="w-3/4 bg-secondary hover:bg-primary transition-colors rounded-t-sm"
                                            style={{ height: `${heightPercentage}%` }}
                                            title={`Sales: ${data.Sales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} on ${data.name}`}
                                        ></div>
                                        <span className="text-xs text-gray-500 mt-2 whitespace-nowrap">{data.name}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-500">
                                No sales data to display.
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Sales</h2>
                    <div className="space-y-4">
                        {mockSales.slice(0, 5).map(sale => (
                            <div key={sale.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-800">{sale.customerName}</p>
                                    <p className="text-xs text-gray-500">{new Date(sale.date).toLocaleDateString()}</p>
                                </div>
                                <p className="font-semibold text-green-600">
                                    {sale.totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;