import page from 'page';
import { writable } from 'svelte/store';

// Store to keep track of the current page component
export const currentPage = writable(null);

// Import Svelte components
// import Login from './pages/Login.svelte';
import Dashboard from './pages/Dashboard.svelte';
// import EmployeeDetail from './pages/EmployeeDetail.svelte';

// Define routes
// page('/login', () => currentPage.set(Login));
page('', () => currentPage.set(Dashboard));
// page('/employee/:id', (context) => {
//   currentPage.set(EmployeeDetail);
//   // Optionally, use another store for route parameters if needed
// });

// Start the router
page();
