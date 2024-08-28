// src/mockData.js
import { faker } from '@faker-js/faker';

// Helper function to compute age from birthDate
function calculateAge(birthDate) {
  const ageDifMs = Date.now() - new Date(birthDate).getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Helper function to compute tenure from dateHired
function calculateTenure(dateHired) {
  const now = new Date();
  const hireDate = new Date(dateHired);
  const tenureYears = now.getFullYear() - hireDate.getFullYear();
  return tenureYears >= 0 ? tenureYears : 0;
}

// Helper function to get primary address
function getPrimaryAddress(addresses) {
  const primary = addresses.find(addr => addr.isPrimary);
  return primary ? primary.addressDetails : 'No primary address';
}

// Helper function to get primary contact
function getPrimaryContact(contacts) {
  const primary = contacts.find(contact => contact.isPrimary);
  return primary ? primary.contactDetails : 'No primary contact';
}

// Generate mock employees with varied data
function generateMockEmployees(count = 10) {
  return Array.from({ length: count }, () => {
    const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
    const dateHired = faker.date.past({ years: 10 });
    const addresses = [
      {
        id: faker.string.uuid(),
        addressDetails: faker.location.streetAddress(),
        isPrimary: true,
      },
      {
        id: faker.string.uuid(),
        addressDetails: faker.location.secondaryAddress(),
        isPrimary: false,
      },
    ];
    const contacts = [
      {
        id: faker.string.uuid(),
        contactDetails: faker.phone.number(),
        isPrimary: true,
      },
      {
        id: faker.string.uuid(),
        contactDetails: faker.phone.number(),
        isPrimary: false,
      },
    ];

    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      empPosition: faker.person.jobTitle(),
      birthDate,
      gender: faker.person.sex(),
      maritalStatus: faker.helpers.arrayElement(['Single', 'Married', 'Divorced']),
      dateHired,
      primaryAddress: getPrimaryAddress(addresses), // Compute primary address
      primaryContact: getPrimaryContact(contacts),  // Compute primary contact
      age: calculateAge(birthDate),                 // Compute age
      tenure: calculateTenure(dateHired),           // Compute tenure
      addresses,
      contacts,
    };
  });
}

// Export mock data for testing purposes
export const mockEmployees = generateMockEmployees(10); // Explicitly generate 10 employees
