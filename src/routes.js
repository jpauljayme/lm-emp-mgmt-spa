import page from 'page';
import { writable } from 'svelte/store';
import { currentAction, currentEmployeeId, currentPage } from './stores/employeeStore';

// Import Svelte components
// import Login from './pages/Login.svelte';
import Dashboard from './pages/Dashboard.svelte';
import EmployeeForm from './pages/EmployeeForm.svelte';


// Define routes
// page('/login', () => currentPage.set(Login));
page('/', () => currentPage.set(Dashboard));
// page('/employeeForm', () => currentPage.set(EmployeeForm));
page('/employeeForm', (context) => {
    const queryParams = new URLSearchParams(context.querystring);
    const action = queryParams.get('action');
    const id = queryParams.get('id');
    
    console.log(action);
    
    currentAction.set(action || 'add');
    currentEmployeeId.set(id || null);
    
    currentPage.set(EmployeeForm);
});

// Start the router
page();
