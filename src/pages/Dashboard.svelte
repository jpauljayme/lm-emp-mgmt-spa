<script>
    import { onMount } from "svelte";
    import { employees, fetchAllEmployees } from "../stores/employeeStore";
    import page from 'page';

    $: employeeList = $employees;
    let isAdmin = true;

    onMount(async () =>{
        await fetchAllEmployees();
    });

    function handleAddEmployeeBtn(){
        page.redirect('/employeeForm?action=add');
    }

    function handleEditOrViewBtn(employee){
        if(isAdmin){
            page.redirect(`/employeeForm?action=edit&id=${employee.id}`);
        }
        
    }

    function handleDeleteBtn(employeeId){
        //  TODO: call deleteEmployee from store
    }
</script>

<div class="grid__employees">
    <div>
        <button type="button" class="btn btn-primary" on:click={handleAddEmployeeBtn}>
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
                            <button class="btn btn-sm btn-warning" on:click={ () => handleEditOrViewBtn(employee)}>{isAdmin ? 'Edit' : 'View'}</button>
                            <button class="btn btn-sm btn-danger" disabled={!isAdmin} on:click={ () => handleDeleteBtn(employee.id)}>Delete</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .grid__employees{
    grid-area: employees;
    display:grid;
    gap: 20px;
    }
</style>
