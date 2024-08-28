import { fireEvent, render, screen } from '@testing-library/svelte'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import EmployeeRow from '../components/EmployeeRow.svelte'
import { userRole } from '../stores/authStore';


afterEach(() => {
    vi.clearAllMocks();
});

const mockEmployee = {
    id: '1',
    firstName: 'Charli',
    lastName: 'XCX',
    empPosition: 'CEO',
    age: 35,
    tenure: '10 years',
    primaryAddress: 'Cebu City',
    primaryContact: 'test@gmail.com'
};
test('render employee data correctly', () => {
    const { getByText } = render(EmployeeRow, { props: { employee: mockEmployee } });

    expect(getByText('Charli XCX')).toBeInTheDocument();
    expect(getByText(mockEmployee.primaryAddress)).toBeInTheDocument();
    expect(getByText(mockEmployee.primaryContact)).toBeInTheDocument();
    expect(getByText(mockEmployee.age)).toBeInTheDocument();
    expect(getByText(mockEmployee.tenure)).toBeInTheDocument();
});

test('render Edit button for admin', () => {
    const { getByText } = render(EmployeeRow, { props: { employee: mockEmployee } });

    expect(getByText('Edit')).toBeInTheDocument();
});

test('render View button for normal user', async () => {
    userRole.set('user');
    const { getByText } = render(EmployeeRow, { props: { employee: mockEmployee } });
    expect(getByText('View')).toBeInTheDocument();
});

test('dispatches show event with employee ID on View button click', async () => {
    userRole.set('user');
    const { getByText, component } = render(EmployeeRow, { props: { employee: mockEmployee } });

    const showHandler = vi.fn();
    component.$on('show', showHandler);

    const editButton = getByText('View');
    await fireEvent.click(editButton);

    expect(showHandler).toHaveBeenCalledWith(expect.objectContaining({ detail: '1' }));
});

test('dispatches show event with employee ID on Edit employee form button click', async () => {
    userRole.set('admin');
    const { getByText, component } = render(EmployeeRow, { props: { employee: mockEmployee } });

    const showHandler = vi.fn();
    component.$on('show', showHandler);

    const editButton = getByText('Edit');
    await fireEvent.click(editButton);

    expect(showHandler).toHaveBeenCalledWith(expect.objectContaining({ detail: '1' }));
});

test('dispatches delete event with employee data on delete button click', async () => {
    userRole.set('admin');
    const { getByText, component } = render(EmployeeRow, { props: { employee: mockEmployee } });

    const deleteHandler = vi.fn();
    component.$on('delete', deleteHandler);

    const deleteButton = getByText('Delete');
    await fireEvent.click(deleteButton);

    expect(deleteHandler).toHaveBeenCalledWith(expect.objectContaining({ detail: mockEmployee }));
});