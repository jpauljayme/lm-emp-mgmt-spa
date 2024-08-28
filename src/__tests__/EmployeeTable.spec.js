import { render } from '@testing-library/svelte'
import { vi, afterEach, beforeEach, expect, test } from 'vitest'
import EmployeeTable from '../components/EmployeeTable.svelte';
import { mockEmployees } from '../mockData';
import { employees } from '../stores/employeeStore';

beforeEach(() => {
    employees.set(mockEmployees);
});

afterEach(() => {
    vi.clearAllMocks();
});

test('render a list of employee data correctly', () => {

    const { container } = render(EmployeeTable);
    const rows = container.querySelectorAll('tbody tr')

    console.log(rows.forEach(e => console.log(e.textContent)));
    expect(rows.length).toBe(mockEmployees.length);
});

test('displays computed fields correctly', () => {
    const { getByText } = render(EmployeeTable);

    mockEmployees.forEach(employee => {
        expect(getByText(`${employee.firstName} ${employee.lastName}`)).toBeInTheDocument();
        expect(getByText(employee.primaryAddress)).toBeInTheDocument();
        expect(getByText(employee.primaryContact)).toBeInTheDocument();
    });
});