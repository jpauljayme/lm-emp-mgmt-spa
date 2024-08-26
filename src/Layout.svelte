<!-- src/Layout.svelte -->
<script>
    import { currentPage } from './stores/employeeStore';
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
    
    <main>
        <svelte:component this={$currentPage}/>
    </main>
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
</style>