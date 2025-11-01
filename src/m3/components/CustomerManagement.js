import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box, Typography } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
const CustomerManagement = ({ customers, setCustomers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [customerForm, setCustomerForm] = useState({ name: '', email: '', phone: '' });
    const handleOpenModal = (customer = null) => {
        setEditingCustomer(customer);
        setCustomerForm(customer ? { name: customer.name, email: customer.email, phone: customer.phone } : { name: '', email: '', phone: '' });
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSaveCustomer = () => {
        if (editingCustomer) {
            setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...editingCustomer, ...customerForm } : c));
        }
        else {
            const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
            setCustomers([...customers, { id: newId, ...customerForm }]);
        }
        handleCloseModal();
    };
    const handleDeleteCustomer = (id) => setCustomers(customers.filter(c => c.id !== id));
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }, children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", children: "Customer Management" }), _jsx(Button, { variant: "contained", startIcon: _jsx(Add, {}), onClick: () => handleOpenModal(), children: "Add Customer" })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Email" }), _jsx(TableCell, { children: "Phone" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: customers.map((customer) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: customer.name }), _jsx(TableCell, { children: customer.email }), _jsx(TableCell, { children: customer.phone }), _jsxs(TableCell, { children: [_jsx(IconButton, { onClick: () => handleOpenModal(customer), children: _jsx(Edit, {}) }), _jsx(IconButton, { onClick: () => handleDeleteCustomer(customer.id), children: _jsx(Delete, {}) })] })] }, customer.id))) })] }) }), _jsxs(Dialog, { open: isModalOpen, onClose: handleCloseModal, children: [_jsx(DialogTitle, { children: editingCustomer ? 'Edit Customer' : 'Add Customer' }), _jsxs(DialogContent, { children: [_jsx(TextField, { autoFocus: true, margin: "dense", label: "Name", type: "text", fullWidth: true, value: customerForm.name, onChange: e => setCustomerForm({ ...customerForm, name: e.target.value }) }), _jsx(TextField, { margin: "dense", label: "Email", type: "email", fullWidth: true, value: customerForm.email, onChange: e => setCustomerForm({ ...customerForm, email: e.target.value }) }), _jsx(TextField, { margin: "dense", label: "Phone", type: "tel", fullWidth: true, value: customerForm.phone, onChange: e => setCustomerForm({ ...customerForm, phone: e.target.value }) })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseModal, children: "Cancel" }), _jsx(Button, { onClick: handleSaveCustomer, children: "Save" })] })] })] }));
};
export default CustomerManagement;
