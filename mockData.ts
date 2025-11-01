
import { type Product, type Customer, type Vendor, type Sale, ProductCategory } from './types';

export const mockProducts: Product[] = [
  { id: 'prod-1', name: 'Ryzen 7 7800X3D', category: ProductCategory.CPU, brand: 'AMD', quantity: 15, price: 449.99, cores: '8 Cores / 16 Threads' },
  { id: 'prod-2', name: 'Core i9-14900K', category: ProductCategory.CPU, brand: 'Intel', quantity: 12, price: 589.00, cores: '24 Cores / 32 Threads' },
  { id: 'prod-3', name: 'Corsair Vengeance RGB 32GB', category: ProductCategory.RAM, brand: 'Corsair', quantity: 30, price: 119.99, frequency: '6000MHz' },
  { id: 'prod-4', name: 'G.Skill Trident Z5 32GB', category: ProductCategory.RAM, brand: 'G.Skill', quantity: 25, price: 124.99, frequency: '6400MHz' },
  { id: 'prod-5', name: 'Samsung 990 Pro 2TB', category: ProductCategory.Storage, brand: 'Samsung', quantity: 40, price: 169.99, storage: '2TB NVMe SSD' },
  { id: 'prod-6', name: 'Noctua NH-D15', category: ProductCategory.Cooler, brand: 'Noctua', quantity: 20, price: 99.95 },
  { id: 'prod-7', name: 'ASUS ROG Strix B650E-F', category: ProductCategory.Motherboard, brand: 'ASUS', quantity: 18, price: 279.99 },
  { id: 'prod-8', name: 'GeForce RTX 4090', category: ProductCategory.GPU, brand: 'NVIDIA', quantity: 5, price: 1799.99 },
];

export const mockCustomers: Customer[] = [
  { id: 'cust-1', name: 'Alice Johnson', email: 'alice.j@example.com', phone: '555-0101' },
  { id: 'cust-2', name: 'Bob Williams', email: 'bob.w@example.com', phone: '555-0102' },
  { id: 'cust-3', name: 'Charlie Brown', email: 'charlie.b@example.com', phone: '555-0103' },
  { id: 'cust-4', name: 'Diana Miller', email: 'diana.m@example.com', phone: '555-0104' },
];

export const mockVendors: Vendor[] = [
  { id: 'vend-1', name: 'PC Parts Wholesale', contactPerson: 'John Smith', email: 'sales@pcpartswholesale.com' },
  { id: 'vend-2', name: 'Global Components Inc.', contactPerson: 'Jane Doe', email: 'jane.d@globalcomp.com' },
  { id: 'vend-3', name: 'Tech Distributors', contactPerson: 'Peter Jones', email: 'peter@techdist.com' },
];

export const mockSales: Sale[] = [
  { id: 'sale-1', customerName: 'Alice Johnson', products: [{ productName: 'Ryzen 7 7800X3D', quantity: 1, price: 449.99 }], totalAmount: 449.99, date: '2023-10-01T10:00:00Z' },
  { id: 'sale-2', customerName: 'Bob Williams', products: [{ productName: 'GeForce RTX 4090', quantity: 1, price: 1799.99 }], totalAmount: 1799.99, date: '2023-10-05T14:30:00Z' },
  { id: 'sale-3', customerName: 'Charlie Brown', products: [{ productName: 'Corsair Vengeance RGB 32GB', quantity: 2, price: 119.99 }], totalAmount: 239.98, date: '2023-10-12T11:20:00Z' },
  { id: 'sale-4', customerName: 'Alice Johnson', products: [{ productName: 'Samsung 990 Pro 2TB', quantity: 1, price: 169.99 }], totalAmount: 169.99, date: '2023-10-15T09:05:00Z' },
  { id: 'sale-5', customerName: 'Diana Miller', products: [{ productName: 'Core i9-14900K', quantity: 1, price: 589.00 }, { productName: 'ASUS ROG Strix B650E-F', quantity: 1, price: 279.99 }], totalAmount: 868.99, date: '2023-10-22T16:45:00Z' },
];
