<script>
    import { onMount } from "svelte";
    import {
        deleteEmployee,
        employees,
        fetchAllEmployees,
    } from "../stores/employeeStore";
    import page from "page";
    import { userRole } from "../stores/authStore";
    import Button from "../components/Button.svelte";
    import EmployeeTable from "../components/EmployeeTable.svelte";

    $: isAdmin = $userRole === "admin";

    
    let employeeToDelete = null;

    onMount(async () => {
        await fetchAllEmployees();
    });

    function handleAddEmployee() {
        page.redirect("/employeeForm?action=add");
    }
</script>

<div class="grid__employees">
    <div>
        <Button
            type="button"
            size="sm"
            variant="primary"
            onClick={handleAddEmployee}
            disabled={!isAdmin}
        >
            Add Employee
        </Button>
    </div>
    <EmployeeTable />
</div>

<style>
    .grid__employees {
        display: grid;
        grid-area: employees;
        gap: 20px;
    }
</style>
