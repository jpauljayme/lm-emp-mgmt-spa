import { test, expect, beforeEach } from 'vitest';
import { employees, deleteEmployee, updateEmployee } from '../stores/employeeStore';
import { get } from 'svelte/store';

// Sample test setup
beforeEach(() => {
  employees.set([
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Smith' },
  ]);
});

test('deleteEmployee removes employee by ID', () => {
  deleteEmployee('1');
  const currentEmployees = get(employees);
  
  expect(currentEmployees).toHaveLength(1);
  expect(currentEmployees.find(emp => emp.id === '1')).toBeUndefined();
  expect(currentEmployees[0].id).toBe('2'); 
});