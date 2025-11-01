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

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  vendorId: number;
  stock: number;
  price: number;
  attributes: { [subcategoryId: number]: number }; // e.g. { 101: 1011 } -> { Brand: Intel }
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
  quantity: number;
  totalPrice: number;
  date: string;
}
