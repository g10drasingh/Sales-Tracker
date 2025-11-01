import React, { useState } from 'react';
import { Vendor } from '../../types';
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

interface VendorManagementProps {
  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
}

const VendorManagement: React.FC<VendorManagementProps> = ({ vendors, setVendors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [vendorForm, setVendorForm] = useState<Omit<Vendor, 'id'> & { id?: number }>({ name: '', contactPerson: '', phone: '', email: '', address: '', mobile: '' });

  const handleOpenModal = (vendor: Vendor | null = null) => {
    setEditingVendor(vendor);
    setVendorForm(vendor ? { ...vendor } : { name: '', contactPerson: '', phone: '', email: '', address: '', mobile: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVendor(null);
  };

  const handleSaveVendor = () => {
    if (editingVendor) {
      setVendors(vendors.map(v => v.id === editingVendor.id ? { ...editingVendor, ...vendorForm } : v));
    } else {
      const newId = vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1;
      setVendors([...vendors, { ...vendorForm, id: newId }]);
    }
    handleCloseModal();
  };

  const handleDeleteVendor = (id: number) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">Vendor Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenModal()}>Add Vendor</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id} hover>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.contactPerson}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
                <TableCell>{vendor.address}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(vendor)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteVendor(vendor.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editingVendor ? 'Edit Vendor' : 'Add Vendor'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Name" type="text" fullWidth value={vendorForm.name} onChange={e => setVendorForm({...vendorForm, name: e.target.value})} />
          <TextField margin="dense" label="Contact Person" type="text" fullWidth value={vendorForm.contactPerson} onChange={e => setVendorForm({...vendorForm, contactPerson: e.target.value})} />
          <TextField margin="dense" label="Phone" type="tel" fullWidth value={vendorForm.phone} onChange={e => setVendorForm({...vendorForm, phone: e.target.value})} />
          <TextField margin="dense" label="Mobile" type="tel" fullWidth value={vendorForm.mobile} onChange={e => setVendorForm({...vendorForm, mobile: e.target.value})} />
          <TextField margin="dense" label="Email" type="email" fullWidth value={vendorForm.email} onChange={e => setVendorForm({...vendorForm, email: e.target.value})} />
          <TextField margin="dense" label="Address" type="text" fullWidth value={vendorForm.address} onChange={e => setVendorForm({...vendorForm, address: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveVendor}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VendorManagement;
