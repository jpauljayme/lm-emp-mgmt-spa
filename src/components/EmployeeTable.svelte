<script>
    import page from "page";
    import {
        deleteEmployee,
        employees,
        fetchAllEmployees,
        useMockData,
    } from "../stores/employeeStore";
    import EmployeeRow from "./EmployeeRow.svelte";
    import DeleteModal from "./DeleteModal.svelte";

    $: employeeList = $employees;

    let showModal = false;
    let employeeToDelete = null;

    function handleShowEmployeeForm(event) {
        const employeeIdToShow = event.detail;
        page.redirect(`/employeeForm?action=edit&id=${employeeIdToShow}`);
    }

    function handleShowDeleteModal(employee) {
        employeeToDelete = employee;
        showModal = true;
    }

    async function handleDelete() {
        if (employeeToDelete) {
            if ($useMockData) {
                employees.update((current) =>
                    current.filter((emp) => emp.id !== employeeToDelete.id),
                );
            } else {
                await deleteEmployee(employeeToDelete.id);
                showModal = true;
                fetchAllEmployees();
                employeeToDelete = null;
            }
        }
        showModal = false;
    }

    function closeModal() {
        showModal = false;
    }
</script>

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
            {#each employeeList as employee (employee.id)}
                <EmployeeRow
                    {employee}
                    on:show={handleShowEmployeeForm}
                    on:delete={() => handleShowDeleteModal(employee)}
                />
            {/each}
        </tbody>
    </table>
</div>
<DeleteModal
    bind:show={showModal}
    employeeName={employeeToDelete
        ? `${employeeToDelete.firstName} ${employeeToDelete.lastName}`
        : ""}
    on:confirm={handleDelete}
    on:close={closeModal}
/>
