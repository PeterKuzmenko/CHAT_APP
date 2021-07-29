export default function getLocalUser() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user instanceof Array) {
        [user] = user;
    }
    
    return user;
}
