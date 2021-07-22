import { router } from "../.."
import Component from "../Component"

export default class RegisterComponent extends Component {
    constructor(anchor) {
        super()
        this.anchor = document.createElement('div')
    }

    onInit() {
        console.log('RegisterComponent init')
    }

    render() {
        return `
            <form id="register">
                <label for="username">
                    <input type="text" id="username" name="username"  placeholder="Username">
                </label>
                <label for="password">
                    <input type="password" name="password"  placeholder="Password">
                </label>
                <label for="repeat-password">
                    <input type="password" id="repeat-password"  placeholder="Repeat password">
                </label>
                <input type="submit" value="Зарегестрироваться">
                <a href="#login" data-link-to="login">Войти</a>
            </form>
        `
    } 

    setupListeners() {
        this.addLinkHandler();
        
        const form = document.getElementById('register');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const username = formData.get('username');
            const password = formData.get('password');
            const passwordCopy = formData.get('repear-password');

            if (username.length < 5) return
            if (password.length < 5) return
            if (passwordCopy !== password) return

            fetch('https://studentschat.herokuapp.com/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
                .then((res) => res.json())
                .then((user) => {
                    window.localStorage.setItem('user', user);
                    router.changeRoute('main')
                })
        })
    } 
}