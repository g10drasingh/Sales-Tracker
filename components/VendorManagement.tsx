import React, { useState } from 'react';
import { Vendor } from '../types.ts';
import Modal from './Modal.tsx';
import { PencilIcon, TrashIcon } from './Icons.tsx';

interface VendorManagementProps {
  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
}

const VendorManagement: React.FC<VendorManagementProps> = ({ vendors, setVendors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [newVendor, setNewVendor] = useState({
    name: '',
    address: '',
    contactPerson: '',
    mobile: '',
    phone: '',
    email: '',
  });

  const handleOpenModal = (vendor: Vendor | null = null) => {
    setEditingVendor(vendor);
    if (vendor) {
      setNewVendor({
        name: vendor.name,
        address: vendor.address,
        contactPerson: vendor.contactPerson,
        mobile: vendor.mobile,
        phone: vendor.phone,
        email: vendor.email,
      });
    } else {
      setNewVendor({ name: '', address: '', contactPerson: '', mobile: '', phone: '', email: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVendor(null);
  };

  const handleSaveVendor = () => {
    if (editingVendor) {
      setVendors(vendors.map(v => v.id === editingVendor.id ? { ...editingVendor, ...newVendor } : v));
    } else {
      const newId = vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1;
      setVendors([...vendors, { id: newId, ...newVendor }]);
    }
    handleCloseModal();
  };
  
  const handleDeleteVendor = (id: number) => {
      setVendors(vendors.filter(v => v.id !== id));
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Vendor
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Address</th>
              <th className="p-4">Contact Person</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{vendor.name}</td>
                <td className="p-4">{vendor.address}</td>
                <td className="p-4">{vendor.contactPerson}</td>
                <td className="p-4">{vendor.mobile}</td>
                <td className="p-4">{vendor.phone}</td>
                <td className="p-4">{vendor.email}</td>
                <td className="p-4 flex space-x-2">
                   <button onClick={() => handleOpenModal(vendor)} className="text-blue-500 hover:text-blue-700">
                      <PencilIcon className="h-5 w-5" />
                   </button>
                   <button onClick={() => handleDeleteVendor(vendor.id)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="h-5 w-5" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingVendor ? 'Edit Vendor' : 'Add Vendor'}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
              <input type="text" value={newVendor.name} onChange={e => setNewVendor({...newVendor, name: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" value={newVendor.address} onChange={e => setNewVendor({...newVendor, address: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input type="text" value={newVendor.contactPerson} onChange={e => setNewVendor({...newVendor, contactPerson: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input type="text" value={newVendor.mobile} onChange={e => setNewVendor({...newVendor, mobile: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" value={newVendor.phone} onChange={e => setNewVendor({...newVendor, phone: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={newVendor.email} onChange={e => setNewVendor({...newVendor, email: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button onClick={handleSaveVendor} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
            </div>
          </div>
      </Modal>
    </div>
  );
};

export default VendorManagement;
