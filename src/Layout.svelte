<!-- src/Layout.svelte -->
<script>
    import DeleteModal from "./components/DeleteModal.svelte";
import Login from "./pages/Login.svelte";
    import { userRole, isAuthenticated, logout } from "./stores/authStore";
    import { currentPage } from "./stores/employeeStore";
    import page from 'page';

    $: isAuth = $isAuthenticated;
    $: isAdmin = $userRole === 'admin';

    function handleLogout(){
        logout();
        page.redirect('/login');
    }
</script>

{#if isAuth}
    <div class="grid__wrapper">
        <header class="grid__header">
            <div class="header__title">
                <h1 class="mt-5">LM Employee Dashboard - {isAdmin ? 'Admin' : 'User'}</h1>
            </div>
            <div class="header__logout">
                <button type="button" class="btn btn-dark" on:click={handleLogout}>Logout</button>
            </div>
        </header>

        <main>
            <svelte:component this={$currentPage} />
        </main>
    </div>
{:else}
    <Login />
{/if}

<style>
    .grid__wrapper {
        display: grid;
        grid-template-rows: max-content max-content;
        grid-template-areas:
            "header"
            "employees";
        gap: 20px;
        padding: 0 100px;
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
