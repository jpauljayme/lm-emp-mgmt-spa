import { writable } from 'svelte/store';

const baseUrl = 'http://localhost:8081/graphql';

export const employees = writable([]);

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