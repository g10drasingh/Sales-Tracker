import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { mockSales, mockProducts, mockCustomers } from '../../mockData';
import { Sale } from '../../types';
import { AttachMoney, People, Inventory } from '@mui/icons-material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6565', '#66FF66', '#6666FF'];

const Dashboard: React.FC = () => {
  const totalSales = mockSales.reduce((acc, sale) => acc + sale.totalPrice, 0);
  const totalCustomers = mockCustomers.length;

  const salesByMonth = mockSales.reduce((acc, sale) => {
    const month = new Date(sale.date).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + sale.totalPrice;
    return acc;
  }, {} as Record<string, number>);

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
  }, {} as Record<number, number>);

  const categoryChartData = Object.keys(salesByCategory).map(categoryId => ({
    name: `Category ${categoryId}`,
    value: salesByCategory[+categoryId],
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <DashboardCard title="Total Sales" value={`$${totalSales.toFixed(2)}`} icon={<AttachMoney />} color="#8884d8" />
      </Grid>
      <Grid item xs={12} md={4}>
        <DashboardCard title="Total Customers" value={totalCustomers.toString()} icon={<People />} color="#82ca9d" />
      </Grid>
      <Grid item xs={12} md={4}>
        <DashboardCard title="Total Products" value={mockProducts.length.toString()} icon={<Inventory />} color="#ffc658" />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Sales
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Sales by Category
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
