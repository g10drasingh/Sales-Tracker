import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box, Typography } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
const VendorManagement = ({ vendors, setVendors }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVendor, setEditingVendor] = useState(null);
    const [vendorForm, setVendorForm] = useState({ name: '', contactPerson: '', phone: '' });
    const handleOpenModal = (vendor = null) => {
        setEditingVendor(vendor);
        setVendorForm(vendor ? { name: vendor.name, contactPerson: vendor.contactPerson, phone: vendor.phone } : { name: '', contactPerson: '', phone: '' });
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSaveVendor = () => {
        if (editingVendor) {
            setVendors(vendors.map(v => v.id === editingVendor.id ? { ...editingVendor, ...vendorForm } : v));
        }
        else {
            const newId = vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1;
            setVendors([...vendors, { id: newId, ...vendorForm }]);
        }
        handleCloseModal();
    };
    const handleDeleteVendor = (id) => setVendors(vendors.filter(v => v.id !== id));
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }, children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", children: "Vendor Management" }), _jsx(Button, { variant: "contained", startIcon: _jsx(Add, {}), onClick: () => handleOpenModal(), children: "Add Vendor" })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Contact Person" }), _jsx(TableCell, { children: "Phone" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: vendors.map((vendor) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: vendor.name }), _jsx(TableCell, { children: vendor.contactPerson }), _jsx(TableCell, { children: vendor.phone }), _jsxs(TableCell, { children: [_jsx(IconButton, { onClick: () => handleOpenModal(vendor), children: _jsx(Edit, {}) }), _jsx(IconButton, { onClick: () => handleDeleteVendor(vendor.id), children: _jsx(Delete, {}) })] })] }, vendor.id))) })] }) }), _jsxs(Dialog, { open: isModalOpen, onClose: handleCloseModal, children: [_jsx(DialogTitle, { children: editingVendor ? 'Edit Vendor' : 'Add Vendor' }), _jsxs(DialogContent, { children: [_jsx(TextField, { autoFocus: true, margin: "dense", label: "Name", type: "text", fullWidth: true, value: vendorForm.name, onChange: e => setVendorForm({ ...vendorForm, name: e.target.value }) }), _jsx(TextField, { margin: "dense", label: "Contact Person", type: "text", fullWidth: true, value: vendorForm.contactPerson, onChange: e => setVendorForm({ ...vendorForm, contactPerson: e.target.value }) }), _jsx(TextField, { margin: "dense", label: "Phone", type: "tel", fullWidth: true, value: vendorForm.phone, onChange: e => setVendorForm({ ...vendorForm, phone: e.target.value }) })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseModal, children: "Cancel" }), _jsx(Button, { onClick: handleSaveVendor, children: "Save" })] })] })] }));
};
export default VendorManagement;
