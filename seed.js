import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { mockCategories, mockVendors, mockProducts, mockCustomers, mockSales } from './src/mockData.js';
const firebaseConfig = {
    apiKey: "AIzaSyBsK7juW4ETBMD3heOuAZhYQEKNDc653-A",
    authDomain: "sales-trackergit-3774203-2e4c8.firebaseapp.com",
    databaseURL: "https://sales-trackergit-3774203-2e4c8-default-rtdb.firebaseio.com",
    projectId: "sales-trackergit-3774203-2e4c8",
    storageBucket: "sales-trackergit-3774203-2e4c8.appspot.com",
    messagingSenderId: "220335735938",
    appId: "1:220335735938:web:97d7046a9265e7cdb2209b"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
async function seedDatabase() {
    try {
        await set(ref(database, 'categories'), mockCategories);
        await set(ref(database, 'vendors'), mockVendors);
        await set(ref(database, 'products'), mockProducts);
        await set(ref(database, 'customers'), mockCustomers);
        await set(ref(database, 'sales'), mockSales);
        console.log('Data seeded successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
