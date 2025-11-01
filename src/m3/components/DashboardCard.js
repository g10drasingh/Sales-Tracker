import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography, Box } from '@mui/material';
const DashboardCard = ({ title, value, icon, color }) => {
    return (_jsx(Card, { sx: { borderRadius: '16px', boxShadow: 3 }, children: _jsxs(CardContent, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsxs(Box, { children: [_jsx(Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true, children: title }), _jsx(Typography, { variant: "h5", component: "div", fontWeight: "bold", children: value })] }), _jsx(Box, { sx: { backgroundColor: color, borderRadius: '50%', p: 1.5 }, children: icon })] }) }));
};
export default DashboardCard;
