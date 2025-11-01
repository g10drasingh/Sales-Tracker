import React, { useState } from 'react';
import { Customer } from '../../types';
import { 
    Button, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    DialogActions, 
    Box, 
    Typography 
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

interface CustomerManagementProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({ customers, setCustomers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerForm, setCustomerForm] = useState<Omit<Customer, 'id'> & { id?: number }>({ name: '', email: '', phone: '', address: '' });

  const handleOpenModal = (customer: Customer | null = null) => {
    setEditingCustomer(customer);
    setCustomerForm(customer ? { ...customer } : { name: '', email: '', phone: '', address: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleSaveCustomer = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...editingCustomer, ...customerForm } : c));
    } else {
      const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
      setCustomers([...customers, { ...customerForm, id: newId }]);
    }
    handleCloseModal();
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">Customer Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenModal()}>Add Customer</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} hover>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(customer)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteCustomer(customer.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Name" type="text" fullWidth value={customerForm.name} onChange={e => setCustomerForm({...customerForm, name: e.target.value})} />
          <TextField margin="dense" label="Email" type="email" fullWidth value={customerForm.email} onChange={e => setCustomerForm({...customerForm, email: e.target.value})} />
          <TextField margin="dense" label="Phone" type="tel" fullWidth value={customerForm.phone} onChange={e => setCustomerForm({...customerForm, phone: e.target.value})} />
          <TextField margin="dense" label="Address" type="text" fullWidth value={customerForm.address} onChange={e => setCustomerForm({...customerForm, address: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerManagement;
