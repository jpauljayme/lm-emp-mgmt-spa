export const mockEmployees = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    empPosition: 'Software Engineer',
    birthDate: '1990-05-12',
    gender: 'Female',
    maritalStatus: 'Single',
    dateHired: '2015-06-01',
    primaryAddress: '123 Main St',
    primaryContact: '555-1234',
    age: 33, // Assuming the current year is 2023
    tenure: 8, // Calculated from dateHired
    addresses: [
      {
        id: 'a1',
        addressDetails: '123 Main St',
        isPrimary: true,
      },
      {
        id: 'a2',
        addressDetails: '456 Oak St',
        isPrimary: false,
      },
    ],
    contacts: [
      {
        id: 'c1',
        contactDetails: '555-1234',
        isPrimary: true,
      },
      {
        id: 'c2',
        contactDetails: 'alice.johnson@example.com',
        isPrimary: false,
      },
    ],
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    empPosition: 'Product Manager',
    birthDate: '1985-02-20',
    gender: 'Male',
    maritalStatus: 'Married',
    dateHired: '2012-03-15',
    primaryAddress: '789 Pine St',
    primaryContact: '555-5678',
    age: 38,
    tenure: 11,
    addresses: [
      {
        id: 'a3',
        addressDetails: '789 Pine St',
        isPrimary: true,
      },
    ],
    contacts: [
      {
        id: 'c3',
        contactDetails: '555-5678',
        isPrimary: true,
      },
      {
        id: 'c4',
        contactDetails: 'bob.smith@example.com',
        isPrimary: false,
      },
    ],
  },
  {
    id: '3',
    firstName: 'Charlie',
    middleName: 'White',
    lastName: 'Brown',
    empPosition: 'UX Designer',
    birthDate: '1992-09-15',
    gender: 'Male',
    maritalStatus: 'Single',
    dateHired: '2018-10-20',
    primaryAddress: '101 Maple St',
    primaryContact: '555-8765',
    age: 31,
    tenure: 5,
    addresses: [
      {
        id: 'a4',
        addressDetails: '101 Maple St',
        isPrimary: true,
      },
    ],
    contacts: [
      {
        id: 'c5',
        contactDetails: '555-8765',
        isPrimary: true,
      },
    ],
  },
  {
    id: '4',
    firstName: 'Diana',
    lastName: 'Prince',
    empPosition: 'HR Specialist',
    birthDate: '1988-07-22',
    gender: 'Female',
    maritalStatus: 'Married',
    dateHired: '2016-04-05',
    primaryAddress: '102 Elm St',
    primaryContact: '555-4321',
    age: 35,
    tenure: 7,
    addresses: [
      {
        id: 'a5',
        addressDetails: '102 Elm St',
        isPrimary: true,
      },
    ],
    contacts: [
      {
        id: 'c6',
        contactDetails: '555-4321',
        isPrimary: true,
      },
    ],
  },
  {
    id: '5',
    firstName: 'Eve',
    lastName: 'Adams',
    empPosition: 'Data Analyst',
    birthDate: '1995-11-03',
    gender: 'Female',
    maritalStatus: 'Single',
    dateHired: '2019-01-15',
    primaryAddress: '103 Birch St',
    primaryContact: '555-3456',
    age: 28,
    tenure: 4,
    addresses: [
      {
        id: 'a6',
        addressDetails: '103 Birch St',
        isPrimary: true,
      },
    ],
    contacts: [
      {
        id: 'c7',
        contactDetails: '555-3456',
        isPrimary: true,
      },
    ],
  },
  {
    id: '6',
    firstName: 'Frank',
    lastName: 'Martin',
    empPosition: 'DevOps Engineer',
    birthDate: '1987-04-10',
    gender: 'Male',
    maritalStatus: 'Married',
    dateHired: '2014-08-23',
    primaryAddress: '104 Cedar St',
    primaryContact: '555-7890',
    age: 36,
    tenure: 9,
    addresses: [
      {
        id: 'a7',
        addressDetails: '104 Cedar St',
        isPrimary: true,
      },
    ],
    contacts: [
      {
        id: 'c8',
        contactDetails: '555-7890',
        isPrimary: true,
      },
    ],
  },
  {
    id: '7',
    firstName: 'Grace',
    lastName: 'Hopper',
    empPosition: 'Lead Developer',
    birthDate: '1980-12-09',
    gender: 'Female',
    maritalStatus: 'Widowed',
    dateHired: '2010-09-12',
    primaryAddress: '105 Walnut St',
    primaryContact: '555-6543',
    age: 43,
    tenure: 13,
    addresses: [
      {
        id: 'a8',
        addressDetails: '105 Walnut St',
        isPrimary: true,
      },
    ],
    contacts: [
      {
        id: 'c9',
        contactDetails: '555-6543',
        isPrimary: true,
      },
    ],
  },
  {
    id: '8',
    firstName: 'Henry',
    lastName: 'Ford',
    empPosition: 'Mechanic',
    birthDate: '1991-02-11',
    gender: 'Male',
    maritalStatus: 'Divorced',
    dateHired: '2020-05-14',
    primaryAddress: '106 Pineapple St',
    primaryContact: '555-7777',
    age: 32,
    tenure: 3,
    addresses: [
      {
        id: 'a9',
        addressDetails: '106 Pineapple St',
        isPrimary: true,
      },
    ],
    contacts: [
      {
        id: 'c10',
        contactDetails: '555-7777',
        isPrimary: true,
      },
    ],
  },
  {
    id: '9',
    firstName: 'Isabella',
    lastName: 'Garcia',
    empPosition: 'Accountant',
    birthDate: '1984-08-22',
    gender: 'Female',
    maritalStatus: 'Married',
    dateHired: '2017-03-25',
    primaryAddress: '107 Cherry St',
    primaryContact: '555-8888',
    age: 39,
    tenure: 6,
    addresses: [
      {
        id: 'a10',
        addressDetails: '107 Cherry St',
        isPrimary: true,
      },
    ],
    contacts: [
      {
        id: 'c11',
        contactDetails: '555-8888',
        isPrimary: true,
      },
    ],
  },
  {
    id: '10',
    firstName: 'Jack',
    lastName: 'Daniels',
    empPosition: 'Sales Manager',
    birthDate: '1979-11-15',
    gender: 'Male',
    maritalStatus: 'Married',
    dateHired: '2009-12-01',
    primaryAddress: '108 Bourbon St',
    primaryContact: '555-9999',
    age: 44,
    tenure: 14,
    addresses: [
      {
        id: 'a11',
        addressDetails: '108 Bourbon St',
        isPrimary: true,
      },
    ],
    contacts: [
      {
        id: 'c12',
        contactDetails: '555-9999',
        isPrimary: true,
      },
    ],
  },
];


// Helper function to compute age from birthDate
export function calculateAge(birthDate) {
  const ageDifMs = Date.now() - new Date(birthDate).getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Helper function to compute tenure from dateHired
export function calculateTenure(dateHired) {
  const now = new Date();
  const hireDate = new Date(dateHired);
  const tenureYears = now.getFullYear() - hireDate.getFullYear();
  return tenureYears >= 0 ? tenureYears : 0;
}

// Helper function to get primary address
export function getPrimaryAddress(addresses) {
  const primary = addresses.find(addr => addr.isPrimary);
  return primary ? primary.addressDetails : 'No primary address';
}

// Helper function to get primary contact
export function getPrimaryContact(contacts) {
  const primary = contacts.find(contact => contact.isPrimary);
  return primary ? primary.contactDetails : 'No primary contact';
}