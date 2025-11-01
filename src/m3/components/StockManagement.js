import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, FormControl, InputLabel, Collapse, Box, Typography } from '@mui/material';
import { Edit, Delete, Add, ExpandMore, ExpandLess } from '@mui/icons-material';
const StockManagement = ({ products, setProducts, categories, vendors }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '',
        categoryId: categories[0]?.id || 0,
        vendorId: vendors[0]?.id || 0,
        stock: 0,
        price: 0,
        attributes: {},
    });
    const [expandedRow, setExpandedRow] = useState(null);
    const getInitialAttributes = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        const attributes = {};
        if (category) {
            category.subcategories.forEach(sc => {
                if (sc.details.length > 0) {
                    attributes[sc.id] = sc.details[0].id;
                }
            });
        }
        return attributes;
    };
    useEffect(() => {
        setProductForm(prev => ({
            ...prev,
            attributes: getInitialAttributes(prev.categoryId),
        }));
    }, [productForm.categoryId, categories]);
    const handleOpenModal = (product = null) => {
        setEditingProduct(product);
        if (product) {
            setProductForm(product);
        }
        else {
            const defaultCategory = categories[0];
            setProductForm({
                name: '',
                categoryId: defaultCategory?.id || 0,
                vendorId: vendors[0]?.id || 0,
                stock: 0,
                price: 0,
                attributes: getInitialAttributes(defaultCategory?.id || 0),
            });
        }
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSaveProduct = () => {
        const productData = { ...productForm };
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, ...productData } : p));
        }
        else {
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            setProducts([...products, { id: newId, ...productData }]);
        }
        handleCloseModal();
    };
    const handleDeleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
    const getCategoryName = (categoryId) => categories.find(c => c.id === categoryId)?.name || 'N/A';
    const getVendorName = (vendorId) => vendors.find(v => v.id === vendorId)?.name || 'N/A';
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }, children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", children: "Stock Management" }), _jsx(Button, { variant: "contained", startIcon: _jsx(Add, {}), onClick: () => handleOpenModal(), children: "Add Product" })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, {}), _jsx(TableCell, { children: "Product Name" }), _jsx(TableCell, { children: "Category" }), _jsx(TableCell, { children: "Vendor" }), _jsx(TableCell, { children: "Stock" }), _jsx(TableCell, { children: "Price" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: products.map((product) => (_jsxs(React.Fragment, { children: [_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: _jsx(IconButton, { size: "small", onClick: () => setExpandedRow(expandedRow === product.id ? null : product.id), children: expandedRow === product.id ? _jsx(ExpandLess, {}) : _jsx(ExpandMore, {}) }) }), _jsx(TableCell, { children: product.name }), _jsx(TableCell, { children: getCategoryName(product.categoryId) }), _jsx(TableCell, { children: getVendorName(product.vendorId) }), _jsx(TableCell, { children: product.stock }), _jsxs(TableCell, { children: ["$", product.price.toFixed(2)] }), _jsxs(TableCell, { children: [_jsx(IconButton, { onClick: () => handleOpenModal(product), children: _jsx(Edit, {}) }), _jsx(IconButton, { onClick: () => handleDeleteProduct(product.id), children: _jsx(Delete, {}) })] })] }), _jsx(TableRow, { children: _jsx(TableCell, { style: { paddingBottom: 0, paddingTop: 0 }, colSpan: 7, children: _jsx(Collapse, { in: expandedRow === product.id, timeout: "auto", unmountOnExit: true, children: _jsx(Box, { margin: 1, children: _jsx(Typography, { variant: "h6", gutterBottom: true, component: "div", children: "Product Details" }) }) }) }) })] }, product.id))) })] }) }), _jsxs(Dialog, { open: isModalOpen, onClose: handleCloseModal, children: [_jsx(DialogTitle, { children: editingProduct ? 'Edit Product' : 'Add Product' }), _jsxs(DialogContent, { children: [_jsx(TextField, { autoFocus: true, margin: "dense", label: "Product Name", type: "text", fullWidth: true, value: productForm.name, onChange: e => setProductForm({ ...productForm, name: e.target.value }) }), _jsxs(FormControl, { fullWidth: true, margin: "dense", children: [_jsx(InputLabel, { children: "Category" }), _jsx(Select, { value: productForm.categoryId, onChange: e => setProductForm({ ...productForm, categoryId: Number(e.target.value) }), children: categories.map(c => _jsx(MenuItem, { value: c.id, children: c.name }, c.id)) })] }), _jsxs(FormControl, { fullWidth: true, margin: "dense", children: [_jsx(InputLabel, { children: "Vendor" }), _jsx(Select, { value: productForm.vendorId, onChange: e => setProductForm({ ...productForm, vendorId: Number(e.target.value) }), children: vendors.map(v => _jsx(MenuItem, { value: v.id, children: v.name }, v.id)) })] }), _jsx(TextField, { margin: "dense", label: "Stock", type: "number", fullWidth: true, value: productForm.stock, onChange: e => setProductForm({ ...productForm, stock: Number(e.target.value) }) }), _jsx(TextField, { margin: "dense", label: "Price", type: "number", fullWidth: true, value: productForm.price, onChange: e => setProductForm({ ...productForm, price: Number(e.target.value) }) })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseModal, children: "Cancel" }), _jsx(Button, { onClick: handleSaveProduct, children: "Save" })] })] })] }));
};
export default StockManagement;
