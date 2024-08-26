import page from 'page';
import { writable } from 'svelte/store';

// Store to keep track of the current page component
export const currentPage = writable(null);

// Import Svelte components
// import Login from './pages/Login.svelte';
import Dashboard from './pages/Dashboard.svelte';
import EmployeeForm from './pages/EmployeeForm.svelte';


// Define routes
// page('/login', () => currentPage.set(Login));
page('', () => currentPage.set(Dashboard));
page('/employeeForm', () => currentPage.set(EmployeeForm));
// page('/employee/:id', (context) => {
//   currentPage.set(EmployeeDetail);
//   // Optionally, use another store for route parameters if needed
// });

// Start the router
page();
