import React, { useState } from 'react';
import { Category, Subcategory, Detail } from '../types.ts';
import Modal from './Modal.tsx';
import { PencilIcon, TrashIcon } from './Icons.tsx';

interface CategoryManagementProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ categories, setCategories }) => {
  const [modalState, setModalState] = useState<{
    type: 'Category' | 'Subcategory' | 'Detail' | null;
    mode: 'Add' | 'Edit' | null;
    data?: any;
  }>({ type: null, mode: null });
  
  const [name, setName] = useState('');

  const handleOpenModal = (type: 'Category' | 'Subcategory' | 'Detail', mode: 'Add' | 'Edit', data?: any) => {
    setName(mode === 'Edit' ? data.name : '');
    setModalState({ type, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ type: null, mode: null });
    setName('');
  };

  const handleSave = () => {
    const { type, mode, data } = modalState;

    if (type === 'Category') {
      if (mode === 'Edit') {
        setCategories(categories.map(c => c.id === data.id ? { ...c, name } : c));
      } else {
        const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
        setCategories([...categories, { id: newId, name, subcategories: [] }]);
      }
    } else if (type === 'Subcategory') {
      if (mode === 'Edit') {
        setCategories(categories.map(c => c.id === data.categoryId ? { ...c, subcategories: c.subcategories.map(sc => sc.id === data.id ? { ...sc, name } : sc) } : c));
      } else {
        setCategories(categories.map(c => c.id === data.categoryId ? { ...c, subcategories: [...c.subcategories, { id: Date.now(), name, details: [] }] } : c));
      }
    } else if (type === 'Detail') {
      if (mode === 'Edit') {
        setCategories(categories.map(c => c.id === data.categoryId ? { ...c, subcategories: c.subcategories.map(sc => sc.id === data.subcategoryId ? { ...sc, details: sc.details.map(d => d.id === data.id ? { ...d, name } : d) } : sc) } : c));
      } else {
        setCategories(categories.map(c => c.id === data.categoryId ? { ...c, subcategories: c.subcategories.map(sc => sc.id === data.subcategoryId ? { ...sc, details: [...sc.details, { id: Date.now(), name }] } : sc) } : c));
      }
    }

    handleCloseModal();
  };

  const handleDelete = (type: 'Category' | 'Subcategory' | 'Detail', ids: any) => {
    if (type === 'Category') {
      setCategories(categories.filter(c => c.id !== ids.categoryId));
    } else if (type === 'Subcategory') {
      setCategories(categories.map(c => c.id === ids.categoryId ? { ...c, subcategories: c.subcategories.filter(sc => sc.id !== ids.subcategoryId) } : c));
    } else if (type === 'Detail') {
      setCategories(categories.map(c => c.id === ids.categoryId ? { ...c, subcategories: c.subcategories.map(sc => sc.id === ids.subcategoryId ? { ...sc, details: sc.details.filter(d => d.id !== ids.detailId) } : sc) } : c));
    }
  };

  const renderModalContent = () => {
    if (!modalState.type) return null;
    const title = `${modalState.mode} ${modalState.type}`;
    const label = `${modalState.type} Name`;
    return (
      <Modal isOpen={!!modalState.type} onClose={handleCloseModal} title={title}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
          </div>
        </div>
      </Modal>
    );
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
        <button onClick={() => handleOpenModal('Category', 'Add')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Category</button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {categories.map((category) => (
          <div key={category.id} className="border rounded-lg mb-4">
            {/* Category Header */}
            <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
              <div className="font-bold text-xl">{category.name}</div>
              <div className="flex items-center space-x-4">
                <button onClick={() => handleOpenModal('Subcategory', 'Add', { categoryId: category.id })} className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">Add Subcategory</button>
                <button onClick={() => handleOpenModal('Category', 'Edit', category)} className="text-blue-500 hover:text-blue-700"><PencilIcon className="h-5 w-5" /></button>
                <button onClick={() => handleDelete('Category', { categoryId: category.id })} className="text-red-500 hover:text-red-700"><TrashIcon className="h-5 w-5" /></button>
              </div>
            </div>
            {/* Subcategories */}
            <div className="p-4 space-y-3">
              {category.subcategories.map(subcategory => (
                <div key={subcategory.id} className="pl-4 border-l-2">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-700">{subcategory.name}</div>
                     <div className="flex items-center space-x-4">
                        <button onClick={() => handleOpenModal('Detail', 'Add', { categoryId: category.id, subcategoryId: subcategory.id })} className="text-xs bg-cyan-500 hover:bg-cyan-600 text-white py-1 px-2 rounded">Add Detail</button>
                        <button onClick={() => handleOpenModal('Subcategory', 'Edit', { ...subcategory, categoryId: category.id })} className="text-blue-500 hover:text-blue-700"><PencilIcon className="h-5 w-5" /></button>
                        <button onClick={() => handleDelete('Subcategory', { categoryId: category.id, subcategoryId: subcategory.id })} className="text-red-500 hover:text-red-700"><TrashIcon className="h-5 w-5" /></button>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="pl-6 pt-2 flex flex-wrap gap-2">
                    {subcategory.details.map(detail => (
                      <div key={detail.id} className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm">
                        <span>{detail.name}</span>
                        <button onClick={() => handleOpenModal('Detail', 'Edit', { ...detail, categoryId: category.id, subcategoryId: subcategory.id })} className="ml-2 text-gray-500 hover:text-blue-600"><PencilIcon className="h-3 w-3" /></button>
                        <button onClick={() => handleDelete('Detail', { categoryId: category.id, subcategoryId: subcategory.id, detailId: detail.id })} className="ml-1 text-gray-500 hover:text-red-600"><TrashIcon className="h-3 w-3" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {renderModalContent()}
    </div>
  );
};

export default CategoryManagement;
