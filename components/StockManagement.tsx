import React, { useState } from 'react';
import Modal from './Modal';
import { PlusIcon, PencilIcon } from './Icons';
import { type Product, ProductCategory } from '../types';
import { mockProducts } from '../mockData';

const StockManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Product>>({ category: ProductCategory.CPU });
    const [isEditing, setIsEditing] = useState(false);

    const openAddModal = () => {
        setIsEditing(false);
        setCurrentItem({ category: ProductCategory.CPU, quantity: 0, price: 0 });
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setIsEditing(true);
        setCurrentItem(product);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem({});
        setIsEditing(false);
    };

    const handleSave = () => {
        if (!currentItem.name || !currentItem.category || !currentItem.brand || currentItem.quantity === undefined || currentItem.price === undefined) {
            alert('Please fill all required fields.');
            return;
        }

        if (isEditing) {
            setProducts(products.map(p => p.id === currentItem.id ? (currentItem as Product) : p));
        } else {
            setProducts([...products, { ...currentItem, id: `prod-${Date.now()}` } as Product]);
        }
        closeModal();
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentItem(prev => ({ ...prev, [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value }));
    };

    const getProductDetails = (product: Product) => {
        switch (product.category) {
            case ProductCategory.CPU:
                return product.cores || '-';
            case ProductCategory.RAM:
                return product.frequency || '-';
            case ProductCategory.Storage:
                return product.storage || '-';
            default:
                return '-';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Stock Management</h1>
                <button onClick={openAddModal} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Stock
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold">Product Name</th>
                            <th className="p-4 font-semibold">Category</th>
                            <th className="p-4 font-semibold">Brand</th>
                            <th className="p-4 font-semibold">Details</th>
                            <th className="p-4 font-semibold">Quantity</th>
                            <th className="p-4 font-semibold">Price</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">{product.brand}</td>
                                <td className="p-4 text-sm text-gray-600">{getProductDetails(product)}</td>
                                <td className="p-4">{product.quantity}</td>
                                <td className="p-4">{product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                <td className="p-4">
                                    <button onClick={() => openEditModal(product)} className="text-blue-600 hover:text-blue-800">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal title={isEditing ? "Edit Stock Item" : "Add New Stock Item"} isOpen={isModalOpen} onClose={closeModal}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input id="name" type="text" name="name" placeholder="Product Name" value={currentItem.name || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select id="category" name="category" value={currentItem.category} onChange={handleInputChange} className="w-full p-2 border rounded">
                            {Object.values(ProductCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                        <input id="brand" type="text" name="brand" placeholder="Brand" value={currentItem.brand || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                    </div>

                    {currentItem.category === ProductCategory.Storage && (
                        <div>
                            <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-1">Storage Details</label>
                            <input id="storage" type="text" name="storage" placeholder="e.g. 1TB SSD" value={currentItem.storage || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                    )}
                    {currentItem.category === ProductCategory.RAM && (
                        <div>
                            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                            <input id="frequency" type="text" name="frequency" placeholder="e.g. 3200MHz" value={currentItem.frequency || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                    )}
                    {currentItem.category === ProductCategory.CPU && (
                        <div>
                            <label htmlFor="cores" className="block text-sm font-medium text-gray-700 mb-1">Core/Thread Count</label>
                            <input id="cores" type="text" name="cores" placeholder="e.g. 8 Cores / 16 Threads" value={currentItem.cores || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                            <input id="quantity" type="number" name="quantity" placeholder="0" value={currentItem.quantity || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input id="price" type="number" name="price" placeholder="0.00" step="0.01" value={currentItem.price || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                    </div>
                    <button onClick={handleSave} className="w-full bg-secondary text-white p-2 rounded-lg hover:bg-blue-600 transition-colors mt-2">
                        {isEditing ? 'Save Changes' : 'Add Product'}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default StockManagement;