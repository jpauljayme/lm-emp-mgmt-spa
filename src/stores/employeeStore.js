import { writable } from 'svelte/store';

const baseUrl = 'http://localhost:8081/graphql';

export const employees = writable([]);
export const isAdmin = writable(false);

// Store to keep track of the current action (add or edit)
export const currentAction = writable('add');

// Store to keep track of the employee ID for editing
export const currentEmployeeId = writable(null);


// Existing store for the current page
export const currentPage = writable(null);

export async function fetchAllEmployees() {
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
  console.log(result);
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

    return result.data.getEmployeeById;  // Return the fetched employee data
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    throw error;
  }
}

export async function updateEmployee(employee){
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

    // Optional: You could log or confirm the update using the returned ID
    console.log('Employee updated successfully with ID:', result.data.updateEmployee.id);

  } catch (error) {
    console.error('Error updating employee:', error);
  }
}