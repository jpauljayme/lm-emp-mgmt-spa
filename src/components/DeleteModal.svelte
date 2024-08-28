<script>
    import { createEventDispatcher } from "svelte";

    export let show = false; // Control visibility of the modal
    export let employeeName = ""; // Employee name to show in the modal

    const dispatch = createEventDispatcher();

    function handleConfirm() {
        dispatch("confirm"); // Dispatch a confirm event when the user clicks 'Yes'
        handleClose();
    }

    function handleClose() {
        dispatch("close");
        show = false;
    }
</script>

{#if show}
    <div
        class="modal fade show d-block"
        tabindex="-1"
        role="dialog"
        style="background-color: rgba(0,0,0,0.5);"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Deletion</h5>
                    <button
                        type="button"
                        class="close"
                        aria-label="Close"
                        on:click={handleClose}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete {employeeName}?</p>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        on:click={handleClose}>No</button
                    >
                    <button
                        type="button"
                        class="btn btn-danger"
                        on:click={handleConfirm}>Yes</button
                    >
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal.fade.show {
        display: block;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>
