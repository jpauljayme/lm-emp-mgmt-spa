<script>
    import { onMount } from "svelte";
    import { addEmployee, fetchEmployeeById, updateEmployee } from "../stores/employeeStore";
    import {currentEmployeeId, currentAction} from '../stores/employeeStore';

    import page from "page";
    import { get } from "svelte/store";
    
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

    let action = get(currentAction);
    let id = get(currentEmployeeId);

    onMount(async () => {
        if(action === 'edit' && id){
            try{
                employee = await fetchEmployeeById(id);
            }catch(error){
                console.error('Error fetching employee:', error);
                alert('Failed to load employee data.');
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
        console.log(JSON.stringify(employee))
        if(action === 'edit'){
            await updateEmployee(employee);
        }else{
            await addEmployee(employee);
        }
        
        page("");
    }

    function handleBack(){
        page("");
    }
</script>

<div class="container">
    <h2>{action === 'add' ? 'Create' : 'Update'} Employee Form</h2>
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
                    required
                />
            </div>
        </div>
        <!-- Addresses Section -->
        <h3>Addresses</h3>
        {#if employee.addresses.length === 0}
            <p>No addresses added yet. Click 'Add Address' to start.</p>
        {/if}
        {#each employee.addresses as address, index}
            <div class="row mb-3">
                <div class="col-md-8">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Address"
                        bind:value={address.addressDetails}
                    />
                </div>
                <div class="col-md-2">
                    <div class="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id={`addressPrimary${index}`}
                            bind:checked={address.isPrimary}
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
                        class="btn btn-danger"
                        on:click={() => removeAddress(index)}>Remove</button
                    >
                </div>
            </div>
        {/each}
        <button
            type="button"
            class="btn btn-secondary mb-3"
            on:click={addAddress}>Add Address</button
        >

        <!-- Contacts Section -->
        <h3>Contacts</h3>
        {#each employee.contacts as contact, index}
            <div class="row mb-3">
                <div class="col-md-8">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Contact"
                        bind:value={contact.contactDetails}
                    />
                </div>
                <div class="col-md-2">
                    <div class="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id={`contactPrimary${index}`}
                            bind:checked={contact.isPrimary}
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
                        class="btn btn-danger"
                        on:click={() => removeContact(index)}>Remove</button
                    >
                </div>
            </div>
        {/each}
        <button
            type="button"
            class="btn btn-secondary mb-3"
            on:click={addContact}>Add Contact</button
        >
        <!-- Submit Button -->
        <div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        <div>
            <button type="button" class="btn btn-dark" on:click={handleBack}>Back</button>
        </div>
    </form>
</div>

<style>
</style>
