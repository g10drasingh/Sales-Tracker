
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => {
  return (
    <Card sx={{ borderRadius: '16px', boxShadow: 3 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div" fontWeight="bold">
            {value}
          </Typography>
        </Box>
        <Box sx={{ backgroundColor: color, borderRadius: '50%', p: 1.5 }}>
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
