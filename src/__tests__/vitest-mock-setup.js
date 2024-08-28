import { writable } from 'svelte/store';
import { vi } from 'vitest';
import { mockEmployees } from '../mockData';

// Mocking page.js module
vi.mock('page', () => ({
    default: {
        redirect: vi.fn(),
    },
}));

const mockEmployeesData = writable(mockEmployees);

// Mocking employeeStore module
vi.mock('../stores/employeeStore', () => {
    return {
        employees: writable(mockEmployees),
        fetchAllEmployees: vi.fn(() => {
            // Simulate fetching from backend with mock data
            mockEmployeesData.set(mockEmployees);
        }),
        deleteEmployee: vi.fn((id) => {
            // Simulate delete operation
            const updatedEmployees = mockEmployees.filter(emp => emp.id !== id);
            mockEmployeesData.set(updatedEmployees);
        })
    };
});

vi.mock('../stores/authStore', () => ({
    userRole: writable('admin')
}));