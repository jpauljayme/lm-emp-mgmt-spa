import { get, writable } from "svelte/store";

export const isAuthenticated = writable(false);

export const userRole = writable('');

export const userInfo = writable(null);

const users = [
    {
        username: 'admin',
        password: 'admin123',
        role: 'admin'
    },
    {
        username: 'user',
        password: 'user123',
        role: 'user'
    }
];

export function login(credentials){
    const user = users.find( user => user.username === credentials.username 
        && user.password === credentials.password
    )
    if(user){
        isAuthenticated.set(true);
        userRole.set(user.role);
        userInfo.set(user);

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userInfo', JSON.stringify(user));
        return true;
    }else{
        return false;
    }
}

export function logout(){
    isAuthenticated.set(false);
    userRole.set('');
    userInfo.set(null);

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userInfo');
}