import React, { useState } from 'react';
import Modal from './Modal';
import { PlusIcon, PencilIcon } from './Icons';
import { type Vendor } from '../types';
import { mockVendors } from '../mockData';

const VendorManagement: React.FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Vendor>>({});
    const [isEditing, setIsEditing] = useState(false);

    const openAddModal = () => {
        setIsEditing(false);
        setCurrentItem({});
        setIsModalOpen(true);
    };

    const openEditModal = (vendor: Vendor) => {
        setIsEditing(true);
        setCurrentItem(vendor);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem({});
        setIsEditing(false);
    };

    const handleSave = () => {
        if (!currentItem.name || !currentItem.contactPerson || !currentItem.email) {
            alert('Please fill all fields.');
            return;
        }

        if (isEditing) {
            setVendors(vendors.map(v => v.id === currentItem.id ? (currentItem as Vendor) : v));
        } else {
            setVendors([...vendors, { ...currentItem, id: `vend-${Date.now()}` } as Vendor]);
        }
        closeModal();
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentItem(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
                <button onClick={openAddModal} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Vendor
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold">Vendor Name</th>
                            <th className="p-4 font-semibold">Contact Person</th>
                            <th className="p-4 font-semibold">Email</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map(vendor => (
                            <tr key={vendor.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{vendor.name}</td>
                                <td className="p-4">{vendor.contactPerson}</td>
                                <td className="p-4">{vendor.email}</td>
                                <td className="p-4">
                                    <button onClick={() => openEditModal(vendor)} className="text-blue-600 hover:text-blue-800">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal title={isEditing ? "Edit Vendor" : "Add New Vendor"} isOpen={isModalOpen} onClose={closeModal}>
                <div className="space-y-4">
                    <input type="text" name="name" placeholder="Vendor Name" value={currentItem.name || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                    <input type="text" name="contactPerson" placeholder="Contact Person" value={currentItem.contactPerson || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                    <input type="email" name="email" placeholder="Email Address" value={currentItem.email || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                    <button onClick={handleSave} className="w-full bg-secondary text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                        {isEditing ? 'Save Changes' : 'Add Vendor'}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default VendorManagement;