export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
  vendorId: number;
  attributes?: { [key: number]: number };
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Vendor {
  id: number;
  name: string;
  address: string;
  contactPerson: string;
  mobile: string;
  phone: string;
  email: string;
}

export interface Sale {
  id: number;
  productId: number;
  customerId?: number;
  quantity: number;
  totalPrice: number;
  date: string;
}

export interface Detail {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
  details: Detail[];
}

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
