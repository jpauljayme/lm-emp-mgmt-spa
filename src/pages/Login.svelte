<script>
    import {login} from '../stores/authStore';
    import page from 'page';

    let credential = {
        username : '',
        password : ''
    }

    function handleSubmit(){
        if(login(credential)){
            page('');
        }else{
            page.redirect('/login');
        }
    }
</script>

<div class="login-container">
    <div class="text-center">
        <p>LM Employee Management System</p>
    </div>
    <div class="form-container">
        <form on:submit={handleSubmit}>
            <div class="form-group row">
                <label for="username" class="col-sm-4 col-form-label">Username</label>
                <div class="col-sm-8">
                    <input type="text" id="username" bind:value={credential.username} required/>
                </div>
            </div>
            
            <div class="form-group row">
                <label for="password" class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-8">
                    <input id="password" bind:value={credential.password} required/>
                </div>
            </div>
            <div class="form-group row">
                <div class="text-center">
                    <button id="loginBtn" type="submit" class="btn btn-sm-4 btn-outline-dark">Login</button>
                </div>
            </div>
        </form>
    </div>
   
</div>

<style>
    .login-container{
        max-width: 400px;
        margin: 150px auto;
        padding: 20px;
    }
    .form-container{
        border: 1px solid #ddd;
        border-radius: 5px;
        padding:20px;
    }
    p{
        font-weight: bold;
    }
</style>