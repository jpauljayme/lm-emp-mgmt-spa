import { writable, get } from 'svelte/store';
import { vi } from 'vitest';
import { mockEmployees } from '../mockData';

// Mocking page.js module
vi.mock('page', () => ({
    default: {
        redirect: vi.fn(),
    },
}));

// Create a writable store to simulate the mock employees data
const mockEmployeesData = writable(mockEmployees);

// Add a mock for the useMockData store
const mockUseMockData = writable(true); // Set to `true` or `false` as needed for each test

// Mocking employeeStore module
vi.mock('../stores/employeeStore', () => {
    return {
        employees: mockEmployeesData,
        useMockData: mockUseMockData,
        fetchAllEmployees: vi.fn(() => {
            // Simulate fetching employees based on useMockData state
            if (get(mockUseMockData)) {
                // If using mock data, set the employees to mock data
                mockEmployeesData.set(mockEmployees);
            } else {
                // Simulate fetching from backend (this could be more complex depending on your setup)
                mockEmployeesData.set([]); // Empty array or some test data
            }
        }),
        deleteEmployee: vi.fn((id) => {
            // Simulate delete operation
            const updatedEmployees = get(mockEmployeesData).filter(emp => emp.id !== id);
            mockEmployeesData.set(updatedEmployees);
        }),
        updateEmployee: vi.fn((employee) => {
            // Simulate update operation
            const updatedEmployees = get(mockEmployeesData).map(emp => 
                emp.id === employee.id ? { ...emp, ...employee } : emp
            );
            mockEmployeesData.set(updatedEmployees);
        }),
        addEmployee: vi.fn((employee) => {
            // Simulate add operation
            const newEmployee = { ...employee, id: (get(mockEmployeesData).length + 1).toString() };
            mockEmployeesData.update(current => [...current, newEmployee]);
        })
    };
});

// Mocking authStore module
vi.mock('../stores/authStore', () => ({
    userRole: writable('admin')
}));
