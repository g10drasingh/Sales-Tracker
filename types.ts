
export enum ProductCategory {
  CPU = 'CPU',
  RAM = 'RAM',
  Cooler = 'Cooler',
  Motherboard = 'Motherboard',
  Storage = 'Storage',
  GPU = 'GPU',
  PSU = 'PSU',
  Case = 'Case',
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  quantity: number;
  price: number;
  // Optional attributes
  storage?: string; // for Storage (e.g., "1TB SSD")
  frequency?: string; // for RAM (e.g., "3200MHz")
  cores?: string; // for CPU (e.g., "8 Cores / 16 Threads")
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
}

export interface Sale {
  id: string;
  customerName: string;
  products: { productName: string; quantity: number; price: number }[];
  totalAmount: number;
  date: string; // ISO string format
}

export type View = 'dashboard' | 'stocks' | 'customers' | 'vendors';
