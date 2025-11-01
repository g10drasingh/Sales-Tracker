import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Dashboard, ShoppingCart, People, Business, Category } from '@mui/icons-material';
const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: _jsx(Dashboard, {}) },
    { id: 'stock', label: 'Stock', icon: _jsx(ShoppingCart, {}) },
    { id: 'customers', label: 'Customers', icon: _jsx(People, {}) },
    { id: 'vendors', label: 'Vendors', icon: _jsx(Business, {}) },
    { id: 'categories', label: 'Categories', icon: _jsx(Category, {}) },
];
const Sidebar = ({ currentView, setCurrentView }) => {
    return (_jsxs(Drawer, { variant: "permanent", sx: {
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#FFFBFE' },
        }, children: [_jsx(Typography, { variant: "h6", sx: { my: 2, textAlign: 'center', fontWeight: 'bold' }, children: "Gemini ERP" }), _jsx(List, { children: navItems.map((item) => (_jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { selected: currentView === item.id, onClick: () => setCurrentView(item.id), sx: {
                            margin: '0 8px',
                            borderRadius: '4px',
                            '&.Mui-selected': {
                                backgroundColor: '#E8DEF8',
                            },
                        }, children: [_jsx(ListItemIcon, { children: item.icon }), _jsx(ListItemText, { primary: item.label })] }) }, item.id))) })] }));
};
export default Sidebar;
