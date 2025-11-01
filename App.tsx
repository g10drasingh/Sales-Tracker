import React, { useState } from 'react';
// Fix: Added .tsx extension to ensure module resolution.
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import StockManagement from './components/StockManagement.tsx';
import CustomerManagement from './components/CustomerManagement.tsx';
import VendorManagement from './components/VendorManagement.tsx';
import CategoryManagement from './components/CategoryManagement.tsx';
// Fix: Added .ts extension to ensure module resolution.
import { mockProducts, mockCustomers, mockVendors, mockSales, mockCategories } from './mockData.ts';
import { Product, Customer, Vendor, Sale, Category } from './types.ts';

export type View = 'dashboard' | 'stock' | 'customers' | 'vendors' | 'categories';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard products={products} customers={customers} vendors={vendors} sales={sales} />;
      case 'stock':
        return <StockManagement products={products} setProducts={setProducts} categories={categories} vendors={vendors} />;
      case 'customers':
        return <CustomerManagement customers={customers} setCustomers={setCustomers} />;
      case 'vendors':
        return <VendorManagement vendors={vendors} setVendors={setVendors} />;
      case 'categories':
        return <CategoryManagement categories={categories} setCategories={setCategories} />;
      default:
        return <Dashboard products={products} customers={customers} vendors={vendors} sales={sales} />;
    }
  };

  return (
    <div className="flex">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      {renderView()}
    </div>
  );
};

export default App;
