<script>
    import { onMount } from "svelte";
    import { deleteEmployee, employees, fetchAllEmployees } from "../stores/employeeStore";
    import page  from 'page';
    import { userRole } from "../stores/authStore";
    import DeleteModal from "../components/DeleteModal.svelte";

    $: employeeList = $employees;
    $: isAdmin = $userRole === 'admin';

    let showModal = false;
    let employeeToDelete = null;

    onMount(async () =>{
        await fetchAllEmployees();
    });

    function handleAddEmployeeBtn(){
        page.redirect('/employeeForm?action=add');
    }

    function handleShowEmployeeFormBtn(employeeId){
        page.redirect(`/employeeForm?action=edit&id=${employeeId}`);        
    }

    async function handleDelete(){
        if(employeeToDelete){
            await deleteEmployee(employeeToDelete.id);
            fetchAllEmployees();
            employeeToDelete = null;
        }
    }

    function confirmDelete(employee){
        showModal = true;
        employeeToDelete = employee;
    }

    function closeModal(){
        showModal = false;
    }
</script>

<div class="grid__employees">
    <div>
        <button type="button" class="btn btn-primary" on:click={handleAddEmployeeBtn} 
            disabled={!isAdmin}
        >
            Add Employee
        </button>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Primary Address</th>
                    <th>Primary Contact Info</th>
                    <th>Age</th>
                    <th># of Years in the Company</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- TODO : foreach employee -->
                {#each employeeList as employee (employee.id)}
                    <tr>
                        <td>{employee.firstName} {employee.lastName}</td>
                        <td>{employee.primaryAddress}</td>
                        <td>{employee.primaryContact}</td>
                        <td>{employee.age}</td>
                        <td>{employee.tenure}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" on:click={ () => handleShowEmployeeFormBtn(employee.id)}>{isAdmin ? 'Edit' : 'View'}</button>
                            <button class="btn btn-sm btn-danger" disabled={!isAdmin} on:click={ () => confirmDelete(employee)}>Delete</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
<DeleteModal
    bind:show={showModal}
    employeeName={employeeToDelete ? `${employeeToDelete.firstName} ${employeeToDelete.lastName}` : ''}
    on:confirm={handleDelete}
    on:close={closeModal}
/>

<style>
    .grid__employees{
        display:grid;
        grid-area: employees;
        gap: 20px;
    }
</style>
