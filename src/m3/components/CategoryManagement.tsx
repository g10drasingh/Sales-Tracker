import React, { useState } from 'react';
import { Category, Subcategory, Detail } from '../../types';
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    DialogActions, 
    Box, 
    Typography, 
    List,
    ListItemText,
    IconButton,
    Paper,
    Grid,
    Divider,
    ListItemButton,
    Chip
} from '@mui/material';
import { Edit, Delete, Add, ArrowForwardIos } from '@mui/icons-material';

interface CategoryManagementProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ categories, setCategories }) => {
  const [modalState, setModalState] = useState<{
    type: 'Category' | 'Subcategory' | 'Detail' | null;
    mode: 'Add' | 'Edit';
    data?: any;
  }>({ type: null, mode: 'Add' });
  
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleOpenModal = (type: 'Category' | 'Subcategory' | 'Detail', mode: 'Add' | 'Edit', data?: any) => {
    setName(mode === 'Edit' ? data.name : '');
    setModalState({ type, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ type: null, mode: 'Add' });
    setName('');
  };

  const handleSave = () => {
    const { type, mode, data } = modalState;
    let updatedCategories = [...categories];

    if (type === 'Category') {
        if (mode === 'Edit') {
            updatedCategories = categories.map(c => c.id === data.id ? { ...c, name } : c);
        } else {
            const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
            updatedCategories = [...categories, { id: newId, name, subcategories: [] }];
        }
    } else if (type === 'Subcategory') {
        const categoryId = mode === 'Edit' ? data.categoryId : selectedCategory?.id;
        if (!categoryId) return;

        updatedCategories = categories.map(c => {
            if (c.id === categoryId) {
                const updatedSubcategories = mode === 'Edit'
                    ? c.subcategories.map(sc => sc.id === data.id ? { ...sc, name } : sc)
                    : [...c.subcategories, { id: Date.now(), name, details: [] }];
                return { ...c, subcategories: updatedSubcategories };
            }
            return c;
        });
    } else if (type === 'Detail') {
        const { categoryId, subcategoryId } = data;
        updatedCategories = categories.map(c => {
            if (c.id === categoryId) {
                const updatedSubcategories = c.subcategories.map(sc => {
                    if (sc.id === subcategoryId) {
                        const updatedDetails = mode === 'Edit'
                            ? (sc.details || []).map(d => d.id === data.id ? { ...d, name } : d)
                            : [...(sc.details || []), { id: Date.now(), name }];
                        return { ...sc, details: updatedDetails };
                    }
                    return sc;
                });
                return { ...c, subcategories: updatedSubcategories };
            }
            return c;
        });
    }

    setCategories(updatedCategories);

    if (selectedCategory) {
        const newSelectedCategory = updatedCategories.find(c => c.id === selectedCategory.id);
        setSelectedCategory(newSelectedCategory || null);
    }

    handleCloseModal();
  };

  const handleDelete = (type: 'Category' | 'Subcategory' | 'Detail', ids: any) => {
    let updatedCategories = [...categories];

    if (type === 'Category') {
        updatedCategories = categories.filter(c => c.id !== ids.categoryId);
    } else if (type === 'Subcategory') {
        updatedCategories = categories.map(c => {
            if (c.id === ids.categoryId) {
                const updatedSubcategories = c.subcategories.filter(sc => sc.id !== ids.subcategoryId);
                return { ...c, subcategories: updatedSubcategories };
            }
            return c;
        });
    } else if (type === 'Detail') {
        updatedCategories = categories.map(c => {
            if (c.id === ids.categoryId) {
                const updatedSubcategories = c.subcategories.map(sc => {
                    if (sc.id === ids.subcategoryId) {
                        const updatedDetails = (sc.details || []).filter(d => d.id !== ids.detailId);
                        return { ...sc, details: updatedDetails };
                    }
                    return sc;
                });
                return { ...c, subcategories: updatedSubcategories };
            }
            return c;
        });
    }

    setCategories(updatedCategories);

    if (selectedCategory) {
        if (type === 'Category' && selectedCategory.id === ids.categoryId) {
            setSelectedCategory(null);
        } else {
            const newSelectedCategory = updatedCategories.find(c => c.id === selectedCategory.id);
            setSelectedCategory(newSelectedCategory || null);
        }
    }
  };
  
  const renderModal = () => {
    if (!modalState.type) return null;
    const title = `${modalState.mode} ${modalState.type}`;
    const label = `${modalState.type} Name`;
    return (
      <Dialog open={!!modalState.type} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label={label} type="text" fullWidth value={name} onChange={e => setName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">Category Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenModal('Category', 'Add')}>Add Category</Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <List component="nav">
                {categories.map((category) => (
                    <ListItemButton
                        key={category.id}
                        selected={selectedCategory?.id === category.id}
                        onClick={() => setSelectedCategory(category)}
                    >
                        <ListItemText primary={category.name} />
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleOpenModal('Category', 'Edit', category); }}><Edit /></IconButton>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDelete('Category', { categoryId: category.id }); }}><Delete /></IconButton>
                        {selectedCategory?.id === category.id && <ArrowForwardIos fontSize="small" sx={{ ml: 1}} color="action" />}
                    </ListItemButton>
                ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, minHeight: 400 }}>
            {selectedCategory ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" fontWeight="bold">{selectedCategory.name}</Typography>
                  <Button variant="outlined" startIcon={<Add />} onClick={() => handleOpenModal('Subcategory', 'Add', { categoryId: selectedCategory.id })}>Add Subcategory</Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                {selectedCategory.subcategories.length > 0 ? (
                  <List>
                    {selectedCategory.subcategories.map(subcategory => (
                      <React.Fragment key={subcategory.id}>
                        <ListItemButton>
                            <ListItemText primary={<Typography fontWeight="medium">{subcategory.name}</Typography>} />
                            <IconButton size="small" onClick={() => handleOpenModal('Subcategory', 'Edit', { ...subcategory, categoryId: selectedCategory.id })}><Edit /></IconButton>
                            <IconButton size="small" onClick={() => handleDelete('Subcategory', { categoryId: selectedCategory.id, subcategoryId: subcategory.id })}><Delete /></IconButton>
                            <Button size="small" sx={{ ml: 1 }} variant="text" startIcon={<Add />} onClick={() => handleOpenModal('Detail', 'Add', { categoryId: selectedCategory.id, subcategoryId: subcategory.id })}>Add Detail</Button>
                        </ListItemButton>
                        
                        <Box sx={{ pl: 4, pt: 1, pb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {subcategory.details?.map(detail => (
                                <Chip
                                    key={detail.id}
                                    label={detail.name}
                                    onDelete={() => handleDelete('Detail', { categoryId: selectedCategory.id, subcategoryId: subcategory.id, detailId: detail.id })}
                                    onClick={() => handleOpenModal('Detail', 'Edit', { ...detail, categoryId: selectedCategory.id, subcategoryId: subcategory.id })}
                                />
                            ))}
                        </Box>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Typography sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>No subcategories yet. Click "Add Subcategory" to create one.</Typography>
                )}
              </>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Typography variant="h6" color="text.secondary">Select a category to manage its subcategories</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {renderModal()}
    </>
  );
};

export default CategoryManagement;
