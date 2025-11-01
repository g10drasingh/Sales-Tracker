import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { mockSales, mockProducts, mockCustomers } from '../../mockData';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6565', '#66FF66', '#6666FF'];
const Dashboard = () => {
    const totalSales = mockSales.reduce((acc, sale) => acc + sale.totalPrice, 0);
    const totalCustomers = mockCustomers.length;
    const salesByMonth = mockSales.reduce((acc, sale) => {
        const month = new Date(sale.date).toLocaleString('default', { month: 'long' });
        acc[month] = (acc[month] || 0) + sale.totalPrice;
        return acc;
    }, {});
    const monthlyChartData = Object.keys(salesByMonth).map(month => ({
        month,
        sales: salesByMonth[month],
    }));
    const salesByCategory = mockSales.reduce((acc, sale) => {
        const product = mockProducts.find(p => p.id === sale.productId);
        if (product) {
            const category = product.categoryId; // Assuming categoryId is directly on the product
            acc[category] = (acc[category] || 0) + sale.totalPrice;
        }
        return acc;
    }, {});
    const categoryChartData = Object.keys(salesByCategory).map(categoryId => ({
        name: `Category ${categoryId}`,
        value: salesByCategory[+categoryId],
    }));
    return (_jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(DashboardCard, { title: "Total Sales", value: `$${totalSales.toFixed(2)}` }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(DashboardCard, { title: "Total Customers", value: totalCustomers.toString() }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(DashboardCard, { title: "Total Products", value: mockProducts.length.toString() }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Paper, { sx: { p: 2 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Monthly Sales" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: monthlyChartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "sales", fill: "#8884d8" })] }) })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Paper, { sx: { p: 2 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Sales by Category" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: categoryChartData, cx: "50%", cy: "50%", labelLine: false, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: categoryChartData.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) })] }) })] }));
};
export default Dashboard;
