import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress } from '@mui/material';
import { theme } from './theme';
import Sidebar from './components/Sidebar';
import LoginPage from '../pages/LoginPage';
import { mockProducts, mockCustomers, mockVendors, mockCategories } from '../mockData';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, onValue, set, get } from "firebase/database";
import { Product, Customer, Vendor, Category } from '../types';

export type View = 'dashboard' | 'stock' | 'customers' | 'vendors' | 'categories';

const Dashboard = lazy(() => import('./components/Dashboard'));
const StockManagement = lazy(() => import('./components/StockManagement'));
const CustomerManagement = lazy(() => import('./components/CustomerManagement'));
const VendorManagement = lazy(() => import('./components/VendorManagement'));
const CategoryManagement = lazy(() => import('./components/CategoryManagement'));

const viewComponents = {
  dashboard: Dashboard,
  stock: StockManagement,
  customers: CustomerManagement,
  vendors: VendorManagement,
  categories: CategoryManagement,
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const productsRef = ref(db, 'products');
      const customersRef = ref(db, 'customers');
      const vendorsRef = ref(db, 'vendors');
      const categoriesRef = ref(db, 'categories');

      const seedDatabase = async () => {
        const snapshot = await get(productsRef);
        if (!snapshot.exists() || snapshot.val().length === 0) {
          console.log("Database is empty. Seeding with mock data...");
          await set(ref(db, 'products'), mockProducts);
          await set(ref(db, 'customers'), mockCustomers);
          await set(ref(db, 'vendors'), mockVendors);
          await set(ref(db, 'categories'), mockCategories);
          console.log("Database seeded successfully.");
        } else {
          console.log("Database already contains data. Skipping seed.");
        }
      };

      seedDatabase();

      const unsubscribeProducts = onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        setProducts(data || []);
      });

      const unsubscribeCustomers = onValue(customersRef, (snapshot) => {
        const data = snapshot.val();
        setCustomers(data || []);
      });

      const unsubscribeVendors = onValue(vendorsRef, (snapshot) => {
        const data = snapshot.val();
        setVendors(data || []);
      });

      const unsubscribeCategories = onValue(categoriesRef, (snapshot) => {
        const data = snapshot.val();
        setCategories(data || []);
      });

      return () => {
        unsubscribeProducts();
        unsubscribeCustomers();
        unsubscribeVendors();
        unsubscribeCategories();
      };
    }
  }, [user]);

  const handleSetProducts = (newProducts: Product[]) => {
    set(ref(db, 'products'), newProducts);
  };

  const handleSetCustomers = (newCustomers: Customer[]) => {
    set(ref(db, 'customers'), newCustomers);
  };

  const handleSetVendors = (newVendors: Vendor[]) => {
    set(ref(db, 'vendors'), newVendors);
  };

  const handleSetCategories = (newCategories: Category[]) => {
    set(ref(db, 'categories'), newCategories);
  };

  const renderView = () => {
    const Component = viewComponents[currentView];
    const props: any = {};

    switch (currentView) {
      case 'stock':
        props.products = products;
        props.setProducts = handleSetProducts;
        props.categories = categories;
        props.vendors = vendors;
        break;
      case 'customers':
        props.customers = customers;
        props.setCustomers = handleSetCustomers;
        break;
      case 'vendors':
        props.vendors = vendors;
        props.setVendors = handleSetVendors;
        break;
      case 'categories':
        props.categories = categories;
        props.setCategories = handleSetCategories;
        break;
      default:
        break;
    }

    return Component ? <Component {...props} /> : <Dashboard />;
  };

  if (!user) {
    return <LoginPage />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Suspense fallback={<CircularProgress />}>
            {renderView()}
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
