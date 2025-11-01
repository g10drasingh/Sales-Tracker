import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box, Typography, Collapse, List, ListItem, ListItemText } from '@mui/material';
import { Edit, Delete, Add, ExpandLess, ExpandMore } from '@mui/icons-material';
const CategoryManagement = ({ categories, setCategories }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [categoryForm, setCategoryForm] = useState({ name: '' });
    const [expandedRow, setExpandedRow] = useState(null);
    const handleOpenModal = (category = null) => {
        setEditingCategory(category);
        setCategoryForm(category ? { name: category.name } : { name: '' });
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSaveCategory = () => {
        if (editingCategory) {
            setCategories(categories.map(c => c.id === editingCategory.id ? { ...editingCategory, ...categoryForm } : c));
        }
        else {
            const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
            setCategories([...categories, { id: newId, name: categoryForm.name, subcategories: [] }]);
        }
        handleCloseModal();
    };
    const handleDeleteCategory = (id) => setCategories(categories.filter(c => c.id !== id));
    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }, children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", children: "Category Management" }), _jsx(Button, { variant: "contained", startIcon: _jsx(Add, {}), onClick: () => handleOpenModal(), children: "Add Category" })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, {}), _jsx(TableCell, { children: "Category Name" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: categories.map((category) => (_jsxs(React.Fragment, { children: [_jsxs(TableRow, { hover: true, onClick: () => handleRowClick(category.id), children: [_jsx(TableCell, { children: _jsx(IconButton, { size: "small", children: expandedRow === category.id ? _jsx(ExpandLess, {}) : _jsx(ExpandMore, {}) }) }), _jsx(TableCell, { children: category.name }), _jsxs(TableCell, { children: [_jsx(IconButton, { onClick: () => handleOpenModal(category), children: _jsx(Edit, {}) }), _jsx(IconButton, { onClick: () => handleDeleteCategory(category.id), children: _jsx(Delete, {}) })] })] }), _jsx(TableRow, { children: _jsx(TableCell, { style: { paddingBottom: 0, paddingTop: 0 }, colSpan: 3, children: _jsx(Collapse, { in: expandedRow === category.id, timeout: "auto", unmountOnExit: true, children: _jsxs(Box, { sx: { margin: 1 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, component: "div", children: "Subcategories" }), category.subcategories.length > 0 ? (_jsx(List, { dense: true, children: category.subcategories.map(subcategory => (_jsx(ListItem, { children: _jsx(ListItemText, { primary: subcategory.name }) }, subcategory.id))) })) : (_jsx(Typography, { children: "No subcategories" }))] }) }) }) })] }, category.id))) })] }) }), _jsxs(Dialog, { open: isModalOpen, onClose: handleCloseModal, children: [_jsx(DialogTitle, { children: editingCategory ? 'Edit Category' : 'Add Category' }), _jsx(DialogContent, { children: _jsx(TextField, { autoFocus: true, margin: "dense", label: "Category Name", type: "text", fullWidth: true, value: categoryForm.name, onChange: e => setCategoryForm({ name: e.target.value }) }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseModal, children: "Cancel" }), _jsx(Button, { onClick: handleSaveCategory, children: "Save" })] })] })] }));
};
export default CategoryManagement;
