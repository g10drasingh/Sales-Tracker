import React, { useState, useEffect } from 'react';
import { Product, Category, Vendor } from '../../types';
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
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    Collapse, 
    Box, 
    Typography 
} from '@mui/material';
import { Edit, Delete, Add, ExpandMore, ExpandLess } from '@mui/icons-material';

interface StockManagementProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  vendors: Vendor[];
}

const StockManagement: React.FC<StockManagementProps> = ({ products, setProducts, categories, vendors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'> | Product>({
    name: '',
    description: '',
    categoryId: categories[0]?.id || 0,
    vendorId: vendors[0]?.id || 0,
    stock: 0,
    price: 0,
    attributes: {},
  });
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const getInitialAttributes = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    const attributes: { [subcategoryId: number]: number } = {};
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
    if (isModalOpen && !editingProduct) {
        setProductForm(prev => ({
            ...prev,
            attributes: getInitialAttributes(prev.categoryId),
        }));
    }
  }, [productForm.categoryId, categories, isModalOpen, editingProduct]);

  const handleOpenModal = (product: Product | null = null) => {
    setEditingProduct(product);
    if (product) {
      setProductForm(product);
    } else {
      const defaultCategory = categories[0];
      setProductForm({
        name: '',
        description: '',
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
    } else {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts([...products, { id: newId, ...productData as Omit<Product, 'id'> }]);
    }
    handleCloseModal();
  };

  const handleDeleteProduct = (id: number) => setProducts(products.filter(p => p.id !== id));

  const getCategoryName = (categoryId: number) => categories.find(c => c.id === categoryId)?.name || 'N/A';
  const getVendorName = (vendorId: number) => vendors.find(v => v.id === vendorId)?.name || 'N/A';
  
  const handleAttributeChange = (subcategoryId: number, detailId: number) => {
      setProductForm(prev => ({
          ...prev,
          attributes: {
              ...prev.attributes,
              [subcategoryId]: detailId
          }
      }));
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">Stock Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenModal()}>Add Product</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <TableRow hover>
                  <TableCell>
                    <IconButton size="small" onClick={() => setExpandedRow(expandedRow === product.id ? null : product.id)}>
                      {expandedRow === product.id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                  <TableCell>{getVendorName(product.vendorId)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenModal(product)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDeleteProduct(product.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={expandedRow === product.id} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Product Details
                                </Typography>
                                {product.attributes && Object.keys(product.attributes).length > 0 ? (
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Subcategory</TableCell>
                                                <TableCell>Detail</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.entries(product.attributes).map(([subcategoryId, detailId]) => {
                                                const category = categories.find(c => c.subcategories.some(s => s.id === Number(subcategoryId)));
                                                const subcategory = category?.subcategories.find(s => s.id === Number(subcategoryId));
                                                const detail = subcategory?.details.find(d => d.id === detailId);
                                                return (
                                                    <TableRow key={subcategoryId}>
                                                        <TableCell>{subcategory?.name}</TableCell>
                                                        <TableCell>{detail?.name}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <Typography>No details for this product.</Typography>
                                )}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Product Name" type="text" fullWidth value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select value={productForm.categoryId} onChange={e => setProductForm({...productForm, categoryId: Number(e.target.value)})}>
              {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
          {categories.find(c => c.id === productForm.categoryId)?.subcategories.map(sc => (
              <FormControl fullWidth margin="dense" key={sc.id}>
                  <InputLabel>{sc.name}</InputLabel>
                  <Select 
                      value={productForm.attributes?.[sc.id] || ''} 
                      onChange={e => handleAttributeChange(sc.id, Number(e.target.value))}
                  >
                      {sc.details.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
                  </Select>
              </FormControl>
          ))}
          <FormControl fullWidth margin="dense">
            <InputLabel>Vendor</InputLabel>
            <Select value={productForm.vendorId} onChange={e => setProductForm({...productForm, vendorId: Number(e.target.value)})}>
              {vendors.map(v => <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField margin="dense" label="Stock" type="number" fullWidth value={productForm.stock} onChange={e => setProductForm({...productForm, stock: Number(e.target.value)})} />
          <TextField margin="dense" label="Price" type="number" fullWidth value={productForm.price} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveProduct}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StockManagement;
