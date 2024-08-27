<script>
    import Footer from "./components/Footer.svelte";
import Header from "./components/Header.svelte";
import Login from "./pages/Login.svelte";
    import { userRole, isAuthenticated, logout } from "./stores/authStore";
    import { currentPage } from "./stores/employeeStore";
    import page from 'page';

    $: isAuth = $isAuthenticated;
</script>

{#if isAuth}
    <div class="grid__wrapper">
        <Header />
        <main>
            <svelte:component this={$currentPage} />
        </main>
    </div>
    <Footer />
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
    }

    main{
        padding: 0 100px;
    }
</style>