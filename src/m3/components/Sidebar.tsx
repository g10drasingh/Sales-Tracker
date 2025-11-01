
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
import { Dashboard, ShoppingCart, People, Business, Category, Logout } from '@mui/icons-material';
import { View } from '../App';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { id: 'stock', label: 'Stock', icon: <ShoppingCart /> },
  { id: 'customers', label: 'Customers', icon: <People /> },
  { id: 'vendors', label: 'Vendors', icon: <Business /> },
  { id: 'categories', label: 'Categories', icon: <Category /> },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#FFFBFE' },
      }}
    >
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center', fontWeight: 'bold' }}>
        Gemini ERP
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={currentView === item.id}
              onClick={() => setCurrentView(item.id as View)}
              sx={{
                margin: '0 8px',
                borderRadius: '4px',
                '&.Mui-selected': {
                  backgroundColor: '#E8DEF8',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleSignOut} sx={{ mt: 'auto', mb: 2, mx: 'auto' }} startIcon={<Logout />}>
        Sign Out
      </Button>
    </Drawer>
  );
};

export default Sidebar;
