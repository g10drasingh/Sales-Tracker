import React, { useState } from 'react';
import Modal from './Modal';
import { PlusIcon, PencilIcon } from './Icons';
import { type Customer } from '../types';
import { mockCustomers } from '../mockData';

const CustomerManagement: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Customer>>({});
    const [isEditing, setIsEditing] = useState(false);

    const openAddModal = () => {
        setIsEditing(false);
        setCurrentItem({});
        setIsModalOpen(true);
    };

    const openEditModal = (customer: Customer) => {
        setIsEditing(true);
        setCurrentItem(customer);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem({});
        setIsEditing(false);
    };

    const handleSave = () => {
        if (!currentItem.name || !currentItem.email || !currentItem.phone) {
            alert('Please fill all fields.');
            return;
        }

        if (isEditing) {
            setCustomers(customers.map(c => c.id === currentItem.id ? (currentItem as Customer) : c));
        } else {
            setCustomers([...customers, { ...currentItem, id: `cust-${Date.now()}` } as Customer]);
        }
        closeModal();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentItem(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
                <button onClick={openAddModal} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Customer
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold">Name</th>
                            <th className="p-4 font-semibold">Email</th>
                            <th className="p-4 font-semibold">Phone</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{customer.name}</td>
                                <td className="p-4">{customer.email}</td>
                                <td className="p-4">{customer.phone}</td>
                                <td className="p-4">
                                    <button onClick={() => openEditModal(customer)} className="text-blue-600 hover:text-blue-800">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal title={isEditing ? "Edit Customer" : "Add New Customer"} isOpen={isModalOpen} onClose={closeModal}>
                <div className="space-y-4">
                    <input type="text" name="name" placeholder="Full Name" value={currentItem.name || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                    <input type="email" name="email" placeholder="Email Address" value={currentItem.email || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                    <input type="tel" name="phone" placeholder="Phone Number" value={currentItem.phone || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                    <button onClick={handleSave} className="w-full bg-secondary text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                        {isEditing ? 'Save Changes' : 'Add Customer'}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CustomerManagement;