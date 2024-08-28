<script>
    import {userRole, logout} from '../stores/authStore';
    import page from 'page';

    $: isAdmin = $userRole === 'admin';

    function handleLogout(){
        logout();
        page.redirect('/login');
    }
</script>

<header class="grid__header">
    <div class="header__title">
        <h1 class="mt-5">LM Employee Dashboard - {isAdmin ? 'Admin' : 'User'}</h1>
    </div>
    <div class="header__logout">
        <button type="button" class="btn btn-dark" on:click={handleLogout}>Logout</button>
    </div>
</header>

<style>
    .grid__header {
        grid-area: header;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 100px;
        border-bottom: 1px solid #dee2e6;
        background-color: rgb(30, 59, 117);
    }

    .header__title h1 {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
        color: white;
    }
</style>