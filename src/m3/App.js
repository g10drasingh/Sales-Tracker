import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StockManagement from './components/StockManagement';
import CustomerManagement from './components/CustomerManagement';
import VendorManagement from './components/VendorManagement';
import CategoryManagement from './components/CategoryManagement';
import { mockProducts, mockCustomers, mockVendors, mockCategories } from '../mockData';
const viewComponents = {
    dashboard: Dashboard,
    stock: StockManagement,
    customers: CustomerManagement,
    vendors: VendorManagement,
    categories: CategoryManagement,
};
const App = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [products, setProducts] = useState(mockProducts);
    const [customers, setCustomers] = useState(mockCustomers);
    const [vendors, setVendors] = useState(mockVendors);
    const [categories, setCategories] = useState(mockCategories);
    const renderView = () => {
        const Component = viewComponents[currentView];
        const props = {};
        switch (currentView) {
            case 'stock':
                props.products = products;
                props.setProducts = setProducts;
                props.categories = categories;
                props.vendors = vendors;
                break;
            case 'customers':
                props.customers = customers;
                props.setCustomers = setCustomers;
                break;
            case 'vendors':
                props.vendors = vendors;
                props.setVendors = setVendors;
                break;
            case 'categories':
                props.categories = categories;
                props.setCategories = setCategories;
                break;
            default:
                break;
        }
        return Component ? _jsx(Component, { ...props }) : _jsx(Dashboard, {});
    };
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsxs(Box, { sx: { display: 'flex' }, children: [_jsx(Sidebar, { currentView: currentView, setCurrentView: setCurrentView }), _jsx(Box, { component: "main", sx: { flexGrow: 1, p: 3 }, children: renderView() })] })] }));
};
export default App;
