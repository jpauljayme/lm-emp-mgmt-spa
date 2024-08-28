<script>
    import { onMount } from "svelte";
    import {
        addEmployee,
        fetchEmployeeById,
        updateEmployee,
    } from "../stores/employeeStore";
    import { currentEmployeeId, currentAction } from "../stores/employeeStore";

    import page from "page";
    import { get } from "svelte/store";
    import {  userRole } from "../stores/authStore";

    let employee = {
        firstName: "",
        lastName: "",
        empPosition: "",
        birthDate: "",
        gender: "",
        maritalStatus: "",
        dateHired: "",
        addresses: [],
        contacts: [],
    };

    $: isAdmin = $userRole == 'admin'
    let action = get(currentAction);
    let id = get(currentEmployeeId);

    onMount(async () => {
        if (action === "edit" && id) {
            try {
                employee = await fetchEmployeeById(id);
            } catch (error) {
                // TODO: Use modal
                alert("Failed to load employee data.");
            }
        }
    });

    function addAddress() {
        employee.addresses = [
            ...employee.addresses,
            { id: null, addressDetails: "", isPrimary: false },
        ];
    }

    function removeAddress(index) {
        employee.addresses = employee.addresses.filter((_, i) => i !== index);
    }

    function addContact() {
        employee.contacts = [
            ...employee.contacts,
            { id: null, contactDetails: "", isPrimary: false },
        ];
    }

    function removeContact(index) {
        employee.contacts = employee.contacts.filter((_, i) => i !== index);
    }

    async function handleSubmit() {
        console.log(JSON.stringify(employee));
        if (action === "edit") {
            await updateEmployee(employee);
        } else {
            await addEmployee(employee);
        }

        page("");
    }

    function handleBack() {
        page("");
    }
</script>

<div class="employee__form__container">
    <h4>{action === "add" ? "Create" : "Update"} Employee Form</h4>
    <form
        class="form__update-employee needs-validation"
        on:submit|preventDefault={handleSubmit}
    >
        <!-- <input th:field="*{id}" type="hidden"> -->
        <div class="row mb-5">
            <div class="col-md-6">
                <label for="firstName">First Name</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="First name"
                    id="firstName"
                    bind:value={employee.firstName}
                    disabled={!isAdmin}
                    required
                />
            </div>
            <div class="col-md-6">
                <label for="lastName">Last Name</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Last name"
                    id="lastName"
                    bind:value={employee.lastName}
                    disabled={!isAdmin}
                    required
                />
            </div>
        </div>
        <div class="row mb-5">
            <div class="col-md-6">
                <label for="middleName">Middle Name</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Middle name"
                    id="middleName"
                    bind:value={employee.middleName}
                    disabled={!isAdmin}
                />
            </div>
            <div class="col-md-6">
                <label for="birthDate">Birth Date</label>
                <input
                    type="date"
                    class="form-control"
                    placeholder="Birth Date"
                    id="birthDate"
                    bind:value={employee.birthDate}
                    disabled={!isAdmin}
                    required
                />
            </div>
        </div>
        <div class="row mb-5">
            <div class="col-md-6">
                <label for="gender">Gender</label>
                <select
                    class="form-select"
                    bind:value={employee.gender}
                    id="gender"
                    disabled={!isAdmin}
                    required
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="NonBinary">Non-binary</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="maritalStatus" class="form-label"
                    >Marital Status</label
                >
                <select
                    class="form-select"
                    bind:value={employee.maritalStatus}
                    name="maritalStatus"
                    id="maritalStatus"
                    disabled={!isAdmin}
                    required
                >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                    <option value="DomesticPartnership"
                        >Domestic Partnership</option
                    >
                </select>
            </div>
        </div>
        <div class="row mb-5">
            <div class="col-md-6">
                <label for="empPosition">Position</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Position"
                    id="empPosition"
                    bind:value={employee.empPosition}
                    disabled={!isAdmin}
                    required
                />
            </div>
            <div class="col-md-6">
                <label for="dateHired">Date Hired</label>
                <input
                    type="date"
                    class="form-control"
                    placeholder="Date Hired"
                    id="dateHired"
                    bind:value={employee.dateHired}
                    disabled={!isAdmin}
                    required
                />
            </div>
        </div>
        <!-- Addresses Section -->
        <h3>Addresses</h3>
        {#if employee.addresses.length === 0}
            <p>No address information added yet.</p>
        {/if}
        {#each employee.addresses as address, index}
            <div class="row mb-3">
                <div class="col-md-8">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Address"
                        bind:value={address.addressDetails}
                        disabled={!isAdmin}
                    />
                </div>
                <div class="col-md-2">
                    <div class="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id={`addressPrimary${index}`}
                            bind:checked={address.isPrimary}
                            disabled={!isAdmin}
                        />
                        <label
                            class="form-check-label"
                            for={`addressPrimary${index}`}>Primary?</label
                        >
                    </div>
                </div>
                <div class="col-md-2">
                    <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        on:click={() => removeAddress(index)}
                        disabled={!isAdmin}
                        >Remove</button
                    >
                </div>
            </div>
        {/each}
        <button
            type="button"
            class="btn btn-sm btn-secondary mb-3"
            on:click={addAddress}
            disabled={!isAdmin}
            >Add Address 
        </button>

        <!-- Contacts Section -->
        <h3>Contacts</h3>
        {#if employee.contacts.length === 0}
        <p>No contact information added yet.</p>
    {/if}
        {#each employee.contacts as contact, index}
            <div class="row mb-3">
                <div class="col-md-8">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Contact"
                        bind:value={contact.contactDetails}
                        disabled={!isAdmin}
                    />
                </div>
                <div class="col-md-2">
                    <div class="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id={`contactPrimary${index}`}
                            bind:checked={contact.isPrimary}
                            disabled={!isAdmin}
                        />
                        <label
                            class="form-check-label"
                            for={`contactPrimary${index}`}>Primary?</label
                        >
                    </div>
                </div>
                <div class="col-md-2">
                    <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        on:click={() => removeContact(index)}
                        disabled={!isAdmin}
                    >
                        Remove
                    </button>
                </div>
            </div>
        {/each}
        <button
            type="button"
            class="btn btn-sm btn-secondary mb-3"
            on:click={addContact}
            disabled={!isAdmin}
            >Add Contact</button
        >
        <div class='employee__form__button__container text-center'>
            <button type="submit" class="btn btn-sm btn-primary" disabled={!isAdmin}>Submit</button>
            <button type="button" class="btn btn-sm btn-dark" on:click={handleBack}>Back</button>
        </div>
    </form>
</div>

<style>
    .employee__form__container{
        max-width: 60%;
        margin: 0 auto;
        border: 2px outset rgb(30, 59, 117);
        padding: 20px;
        border-radius: 20px;
    }
</style>
