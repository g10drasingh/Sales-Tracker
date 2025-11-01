import { Product, Customer, Vendor, Sale, Category } from './types.ts';

export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'CPU',
    subcategories: [
      { 
        id: 101, 
        name: 'Brand', 
        details: [
          { id: 1011, name: 'Intel' },
          { id: 1012, name: 'AMD' }
        ]
      },
      {
        id: 102,
        name: 'Series',
        details: [
          { id: 1021, name: 'Core i9' },
          { id: 1022, name: 'Core i7' },
          { id: 1023, name: 'Ryzen 9' },
          { id: 1024, name: 'Ryzen 7' },
        ]
      },
      {
        id: 103,
        name: 'Socket',
        details: [
            { id: 1031, name: 'LGA 1700' },
            { id: 1032, name: 'AM5' },
        ]
      }
    ],
  },
  {
    id: 2,
    name: 'Motherboard',
    subcategories: [
        { id: 201, name: 'Brand', details: [{ id: 2011, name: 'ASUS' }, { id: 2012, name: 'MSI' }, { id: 2013, name: 'Gigabyte'}] },
        { id: 202, name: 'Chipset', details: [{ id: 2021, name: 'Intel Z790' }, { id: 2022, name: 'AMD X670E' }] },
        { id: 203, name: 'Form Factor', details: [{ id: 2031, name: 'ATX' }, { id: 2032, name: 'Micro-ATX' }] },
    ]
  },
  {
    id: 3, 
    name: 'Graphics Card (GPU)',
    subcategories: [
      { id: 301, name: 'Chipset Brand', details: [{ id: 3011, name: 'NVIDIA'}, { id: 3012, name: 'AMD'}] },
      { id: 302, name: 'Chipset Model', details: [{ id: 3021, name: 'RTX 4090'}, { id: 3022, name: 'RTX 4080'}, { id: 3023, name: 'RX 7900 XTX'}] },
      { id: 303, name: 'VRAM', details: [{ id: 3031, name: '24GB'}, { id: 3032, name: '16GB'}] },
    ]
  },
  {
    id: 4,
    name: 'RAM (Memory)',
    subcategories: [
      { id: 401, name: 'Type', details: [{ id: 4011, name: 'DDR5' }, { id: 4012, name: 'DDR4' }] },
      { id: 402, name: 'Capacity', details: [{ id: 4021, name: '32GB (2x16GB)' }, { id: 4022, name: '64GB (2x32GB)' }] },
      { id: 403, name: 'Speed', details: [{ id: 4031, name: '6000MHz' }, { id: 4032, name: '7200MHz' }] }
    ]
  },
  {
    id: 5,
    name: 'Storage (SSD)',
    subcategories: [
      { id: 501, name: 'Brand', details: [{ id: 5011, name: 'Samsung' }, { id: 5012, name: 'Crucial' }, { id: 5013, name: 'Western Digital'}] },
      { id: 502, name: 'Interface', details: [{ id: 5021, name: 'M.2 NVMe' }, { id: 5022, name: '2.5" SATA' }] },
      { id: 503, name: 'Capacity', details: [{ id: 5031, name: '1TB' }, { id: 5032, name: '2TB' }, { id: 5033, name: '4TB' }] }
    ]
  },
  {
    id: 6,
    name: 'Power Supply (PSU)',
    subcategories: [
      { id: 601, name: 'Brand', details: [{ id: 6011, name: 'Corsair' }, { id: 6012, name: 'Seasonic' }] },
      { id: 602, name: 'Wattage', details: [{ id: 6021, name: '850W' }, { id: 6022, name: '1000W' }] },
      { id: 603, name: 'Rating', details: [{ id: 6031, name: '80+ Gold' }, { id: 6032, name: '80+ Platinum' }] }
    ]
  },
  {
    id: 7,
    name: 'Cooler',
    subcategories: [
      { id: 701, name: 'Type', details: [{ id: 7011, name: 'CPU Air Cooler' }, { id: 7012, name: 'CPU Liquid Cooler (AIO)' }] },
      { id: 702, name: 'Radiator Size', details: [{ id: 7021, name: '240mm' }, { id: 7022, name: '360mm' }, { id: 7023, name: 'N/A'}] }
    ]
  },
  {
    id: 8,
    name: 'Casing (Case)',
    subcategories: [
      { id: 801, name: 'Brand', details: [{ id: 8011, name: 'Lian Li' }, { id: 8012, name: 'NZXT' }, { id: 8013, name: 'Fractal Design'}] },
      { id: 802, name: 'Form Factor', details: [{ id: 8021, name: 'Mid Tower' }, { id: 8022, name: 'Mini-ITX' }] },
      { id: 803, name: 'Color', details: [{ id: 8031, name: 'Black' }, { id: 8032, name: 'White' }] }
    ]
  },
  {
    id: 9,
    name: 'Monitor',
    subcategories: [
      { id: 901, name: 'Brand', details: [{ id: 9011, name: 'LG' }, { id: 9012, name: 'Dell Alienware' }] },
      { id: 902, name: 'Panel Size', details: [{ id: 9021, name: '27-inch' }, { id: 9022, name: '32-inch' }] },
      { id: 903, name: 'Resolution', details: [{ id: 9031, name: '1440p QHD' }, { id: 9032, name: '4K UHD' }] }
    ]
  }
];

export const mockVendors: Vendor[] = [
  { id: 1, name: 'Intel', address: '2200 Mission College Blvd, Santa Clara, CA 95054', contactPerson: 'Casey Smith', mobile: '408-765-8080', phone: '111-222-3333', email: 'sales@intel.com' },
  { id: 2, name: 'AMD', address: '2485 Augustine Dr, Santa Clara, CA 95054', contactPerson: 'Alex Ray', mobile: '408-749-4000', phone: '222-333-4444', email: 'orders@amd.com' },
  { id: 3, name: 'NVIDIA', address: '2788 San Tomas Expy, Santa Clara, CA 95051', contactPerson: 'Jordan Lee', mobile: '408-486-2000', phone: '333-444-5555', email: 'partners@nvidia.com' },
  { id: 4, name: 'ASUS', address: '48720 Kato Rd, Fremont, CA 94538', contactPerson: 'Taylor Kim', mobile: '510-739-3777', phone: '444-555-6666', email: 'support@asus.com' },
  { id: 5, name: 'Corsair', address: '115 N McCarthy Blvd, Milpitas, CA 95035', contactPerson: 'Sam Jones', mobile: '408-956-4200', phone: '555-666-7777', email: 'distributors@corsair.com' },
  { id: 6, name: 'Samsung', address: '85 Challenger Rd, Ridgefield Park, NJ 07660', contactPerson: 'Chris Chen', mobile: '201-229-4000', phone: '666-777-8888', email: 'b2b@samsung.com' },
  { id: 7, name: 'Lian Li', address: 'No. 11, Wugong 5th Rd, Xinzhuang Dist., New Taipei City', contactPerson: 'Wei Lin', mobile: '+886-2-2299-1700', phone: '777-888-9999', email: 'sales@lian-li.com' },
];

export const mockProducts: Product[] = [
  { id: 1, name: 'Intel Core i9-14900K', categoryId: 1, vendorId: 1, stock: 35, price: 589.99, attributes: { 101: 1011, 102: 1021, 103: 1031 } }, // Brand: Intel, Series: Core i9, Socket: LGA 1700
  { id: 2, name: 'AMD Ryzen 9 7950X', categoryId: 1, vendorId: 2, stock: 45, price: 549.00, attributes: { 101: 1012, 102: 1023, 103: 1032 } }, // Brand: AMD, Series: Ryzen 9, Socket: AM5
  { id: 3, name: 'ASUS ROG Strix Z790-E Gaming', categoryId: 2, vendorId: 4, stock: 25, price: 499.99, attributes: { 201: 2011, 202: 2021, 203: 2031 } }, // Brand: ASUS, Chipset: Z790, Form Factor: ATX
  { id: 4, name: 'NVIDIA GeForce RTX 4090 Founders Edition', categoryId: 3, vendorId: 3, stock: 15, price: 1599.00, attributes: { 301: 3011, 302: 3021, 303: 3031 } }, // Chipset Brand: NVIDIA, Model: RTX 4090, VRAM: 24GB
  { id: 5, name: 'Corsair Vengeance DDR5 32GB', categoryId: 4, vendorId: 5, stock: 80, price: 104.99, attributes: { 401: 4011, 402: 4021, 403: 4031 } }, // Type: DDR5, Capacity: 32GB (2x16GB), Speed: 6000MHz
  { id: 6, name: 'Samsung 990 Pro 2TB NVMe SSD', categoryId: 5, vendorId: 6, stock: 120, price: 169.99, attributes: { 501: 5011, 502: 5021, 503: 5032 } }, // Brand: Samsung, Interface: M.2 NVMe, Capacity: 2TB
  { id: 7, name: 'Corsair RM850e 850W Gold', categoryId: 6, vendorId: 5, stock: 60, price: 119.99, attributes: { 601: 6011, 602: 6021, 603: 6031 } }, // Brand: Corsair, Wattage: 850W, Rating: 80+ Gold
  { id: 8, name: 'Lian Li O11 Dynamic EVO Black', categoryId: 8, vendorId: 7, stock: 40, price: 169.99, attributes: { 801: 8011, 802: 8021, 803: 8031 } }, // Brand: Lian Li, Form Factor: Mid Tower, Color: Black
];

export const mockCustomers: Customer[] = [
  { id: 1, name: 'PC Builders Co.', email: 'builds@pcbuilders.com', phone: '111-000-1111', address: '100 Tech Lane' },
  { id: 2, name: 'Gaming Zone Cafe', email: 'lan@gamingzone.com', phone: '222-000-2222', address: '200 Gamer St' },
];

export const mockSales: Sale[] = [
  { id: 1, productId: 1, quantity: 5, totalPrice: 2949.95, date: '2023-10-26' },
  { id: 2, productId: 4, quantity: 2, totalPrice: 3198.00, date: '2023-10-25' },
  { id: 3, productId: 6, quantity: 10, totalPrice: 1699.90, date: '2023-10-27' },
];