import { get, writable } from 'svelte/store';
import { mockEmployees } from '../mockData';

const baseUrl = 'http://localhost:8081/graphql';

export const employees = writable([]);

// Store to keep track of the current action (add or edit)
export const currentAction = writable('add');

// Store to keep track of the employee ID for editing
export const currentEmployeeId = writable(null);

// Existing store for the current page
export const currentPage = writable(null);

// Configuration flag to determine if we use mock data or fetch from backend
export const useMockData = writable(false);

export async function fetchAllEmployees() {
  if (get(useMockData)) {
    employees.set(mockEmployees);
  } else {
    const query = `
    query {
      getAllEmployees {
        id
        firstName
        lastName
        empPosition
        birthDate
        gender
        maritalStatus
        dateHired
        primaryAddress
        primaryContact
        age
        tenure
        addresses {
          addressDetails
          isPrimary
        }
        contacts {
          contactDetails
          isPrimary
        }
      }
    }
  `;

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
    } else {
      employees.set(result.data.getAllEmployees); // Assuming employees is a writable store
    }
  }
}

export async function addEmployee(input) {
  const mutation = `
    mutation($input: EmployeeInput!) {
      createEmployee(input: $input) {
        id
        firstName
        lastName
        empPosition
        birthDate
        gender
        maritalStatus
        dateHired
        addresses{
          addressDetails
          isPrimary
        }
        contacts{
          contactDetails
          isPrimary
        }
      }
    }
  `;

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation, variables: { input } }),
  });

  const result = await response.json();
  employees.update((current) => [...current, result.data.createEmployee]);

}

export async function fetchEmployeeById(id) {
  const query = `
    query getEmployeeById($id: ID!) {
      getEmployeeById(id: $id) {
        id
        firstName
        lastName
        empPosition
        birthDate
        gender
        maritalStatus
        dateHired
        addresses{
          id
          addressDetails
          isPrimary
        }
        contacts{
          id
          contactDetails
          isPrimary
        }
      }
    }
  `;
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { id }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      throw new Error('Failed to fetch employee');
    }

    return result.data.getEmployeeById;
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    throw error;
  }
}

export async function updateEmployee(employee) {
  const mutation = `
    mutation($input: EmployeeInput!) {
      updateEmployee(input: $input) {
        id
      }
    }
  `;

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: mutation,
        variables: { input: employee },
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      throw new Error('Failed to update employee');
    }

  } catch (error) {
    console.error('Error updating employee:', error);
  }
}

export async function deleteEmployee(employeeId) {
  const mutation = `
    mutation deleteEmployee($input: ID!) {
      deleteEmployee(input: $input)
    }
  `;

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: mutation,
        variables: { input: employeeId },
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      throw new Error('Failed to delete employee');
    }

    if (result.data.deleteEmployee) {
      await fetchAllEmployees();
    } else {
      console.warn('Employee could not be deleted. It may not exist.');
    }

  } catch (error) {
    console.error('Error deleting employee:', error);
  }
}