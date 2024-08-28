<script>
    import { createEventDispatcher } from "svelte";
    import { userRole } from "../stores/authStore";
    import Button from "./Button.svelte";
    const dispatch = createEventDispatcher();
    
    export let employee;
    
    $: isAdmin = $userRole === 'admin';

    function handleShowEmployeeForm(employeeId){
        dispatch('show', employeeId);
    }

    function handleDelete(employeeToDelete){
        dispatch('delete', employeeToDelete);
    }
    
</script>

<tr>
    <td>{employee.firstName} {employee.lastName}</td>
    <td>{employee.primaryAddress}</td>
    <td>{employee.primaryContact}</td>
    <td>{employee.age}</td>
    <td>{employee.tenure}</td>
    <td>
        <Button variant="warning" size="sm" onClick={ () => handleShowEmployeeForm(employee.id)}>{isAdmin ? 'Edit' : 'View'}</Button>
        <Button variant="danger" size="sm" disabled={!isAdmin} onClick={ () => handleDelete(employee)}>Delete</Button>
    </td>
</tr>