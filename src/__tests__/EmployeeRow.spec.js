import { render, screen } from '@testing-library/svelte'
import { expect, test } from 'vitest'
import EmployeeRow from '../components/EmployeeRow.svelte'

test('render employee data correctly', () => {
    const mockEmployee = {
        id: '1',
        firstName: 'Charli',
        lastName: 'XCX',
        empPosition: 'CEO',
        age: 35,
        tenure: '10 years',
    };

    const { getByText } = render(EmployeeRow, { props: { employee: mockEmployee } });

    expect(getByText('Charli XCX')).toBeInTheDocument();

})