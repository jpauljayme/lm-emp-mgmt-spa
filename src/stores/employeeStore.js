import {writable} from 'svelte/store';

const baseUrl = 'http://localhost:8081/admin/employees'; 

export const employees = writable([]);

export async function fetchAllEmployees(){
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
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });

  const result = await response.json();
  employees.set(result);
}


export function setEmployees(newEmployees){
    employees.set(newEmployees);
}

export function addEmployee(employee){
    employees.update(current => [...current, employee]);
}