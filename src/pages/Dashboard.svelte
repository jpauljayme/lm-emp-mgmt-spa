<script>
    import { onMount } from "svelte";
    import { employees, fetchAllEmployees } from "../stores/employeeStore";
    import page from 'page';

    $: employeeList = $employees;

    onMount(async () =>{
        await fetchAllEmployees();
    });

    function handleAddEmployeeBtn(){
        page.redirect('/employeeForm')
    }
</script>

<div class="grid__wrapper">
    <header class="grid__header">
        <div class="header__title">
            <h1 class="mt-5">LM Employee Dashboard</h1>
        </div>
        <div class="header__logout">
            <button type="button" class="btn btn-danger">Logout</button>
        </div>
    </header>
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
                                <button class="btn btn-sm btn-warning">Edit</button>
                                <button class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
    .grid__wrapper {
        display: grid;
        grid-template-rows: max-content max-content;
        grid-template-areas:
            "header"
            "employees";
        gap: 20px;
        padding: 20px;
    }

    .grid__header {
        grid-area: header;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 10px;
        border-bottom: 1px solid #dee2e6;
    }

    .header__title h1 {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
    }
    
    .grid__employees{
    grid-area: employees;
    display:grid;
    gap: 20px;
    }
</style>
