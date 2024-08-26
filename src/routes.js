import page from 'page';
import { get } from 'svelte/store';
import { currentAction, currentEmployeeId, currentPage } from './stores/employeeStore';

import Login from './pages/Login.svelte';
import Dashboard from './pages/Dashboard.svelte';
import EmployeeForm from './pages/EmployeeForm.svelte';
import { isAuthenticated } from './stores/authStore';
// Define routes
page('/login', () => currentPage.set(Login));
page('/', () => {
    if(get(isAuthenticated)){
        currentPage.set(Dashboard)
    }else{
        page.redirect('/login');
    }
});

page('/employeeForm', (context) => {
    if(get(isAuthenticated)){
        const queryParams = new URLSearchParams(context.querystring);
        const action = queryParams.get('action');
        const id = queryParams.get('id');
        
        
        currentAction.set(action || 'add');
        currentEmployeeId.set(id || null);
        
        currentPage.set(EmployeeForm);
    }else{
        page.redirect('/login');
    }
});

// Start the router
page();
