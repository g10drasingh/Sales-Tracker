import React, { useState, useEffect } from 'react';
import { Product, Category, Vendor, Subcategory, Detail } from '../types.ts';
import Modal from './Modal.tsx';
import { PencilIcon, TrashIcon } from './Icons.tsx';

interface StockManagementProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  vendors: Vendor[];
}

const StockManagement: React.FC<StockManagementProps> = ({ products, setProducts, categories, vendors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    categoryId: categories[0]?.id || 0,
    vendorId: vendors[0]?.id || 0,
    stock: 0,
    price: 0,
    attributes: {} as { [subcategoryId: number]: number },
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
  }

  useEffect(() => {
    // When category changes, reset attributes
    setProductForm(prev => ({
      ...prev,
      attributes: getInitialAttributes(prev.categoryId)
    }));
  }, [productForm.categoryId, categories]);


  const handleOpenModal = (product: Product | null = null) => {
    setEditingProduct(product);
    if (product) {
      setProductForm({
        name: product.name,
        categoryId: product.categoryId,
        vendorId: product.vendorId,
        stock: product.stock,
        price: product.price,
        attributes: product.attributes,
      });
    } else {
      const defaultCategory = categories[0];
      setProductForm({ 
          name: '', 
          categoryId: defaultCategory?.id || 0, 
          vendorId: vendors[0]?.id || 0, 
          stock: 0, 
          price: 0,
          attributes: getInitialAttributes(defaultCategory?.id || 0)
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
      setProducts([...products, { id: newId, ...productData }]);
    }
    handleCloseModal();
  };
  
  const handleDeleteProduct = (id: number) => setProducts(products.filter(p => p.id !== id));
  
  const handleAttributeChange = (subcategoryId: number, detailId: number) => {
      setProductForm(prev => ({
          ...prev,
          attributes: {
              ...prev.attributes,
              [subcategoryId]: detailId,
          }
      }));
  };

  const getAttributeName = (subcategoryId: number, detailId: number): string => {
    for (const category of categories) {
        const subcategory = category.subcategories.find(sc => sc.id === subcategoryId);
        if (subcategory) {
            const detail = subcategory.details.find(d => d.id === detailId);
            if (detail) return detail.name;
        }
    }
    return 'N/A';
  };

  const getCategoryName = (categoryId: number) => categories.find(c => c.id === categoryId)?.name || 'N/A';
  const getVendorName = (vendorId: number) => vendors.find(v => v.id === vendorId)?.name || 'N/A';
  
  const selectedCategoryForForm = categories.find(c => c.id === productForm.categoryId);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Stock Management</h1>
        <button onClick={() => handleOpenModal()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4 w-8"></th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Vendor</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <tr className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedRow(expandedRow === product.id ? null : product.id)}>
                  <td className="p-4 text-center">{expandedRow === product.id ? '−' : '+'}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{getCategoryName(product.categoryId)}</td>
                  <td className="p-4">{getVendorName(product.vendorId)}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">${product.price.toFixed(2)}</td>
                  <td className="p-4 flex space-x-2">
                     <button onClick={(e) => { e.stopPropagation(); handleOpenModal(product); }} className="text-blue-500 hover:text-blue-700"><PencilIcon className="h-5 w-5" /></button>
                     <button onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }} className="text-red-500 hover:text-red-700"><TrashIcon className="h-5 w-5" /></button>
                  </td>
                </tr>
                {expandedRow === product.id && (
                    <tr className="bg-gray-50">
                        <td colSpan={7} className="p-4">
                            <div className="font-bold mb-2">Product Details:</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {Object.entries(product.attributes).map(([subcategoryId, detailId]) => {
                                    const subcategory = categories.flatMap(c => c.subcategories).find(sc => sc.id === Number(subcategoryId));
                                    return (
                                        <div key={subcategoryId}>
                                            <span className="font-semibold">{subcategory?.name || 'Attribute'}:</span> {getAttributeName(Number(subcategoryId), detailId)}
                                        </div>
                                    )
                                })}
                            </div>
                        </td>
                    </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProduct ? 'Edit Product' : 'Add Product'}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select value={productForm.categoryId} onChange={e => setProductForm({...productForm, categoryId: Number(e.target.value)})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            {selectedCategoryForForm && selectedCategoryForForm.subcategories.map(sc => (
                 <div key={sc.id}>
                    <label className="block text-sm font-medium text-gray-700">{sc.name}</label>
                    <select value={productForm.attributes[sc.id]} onChange={e => handleAttributeChange(sc.id, Number(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {sc.details.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor</label>
              <select value={productForm.vendorId} onChange={e => setProductForm({...productForm, vendorId: Number(e.target.value)})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: Number(e.target.value)})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button onClick={handleSaveProduct} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
            </div>
          </div>
      </Modal>
    </div>
  );
};

export default StockManagement;
