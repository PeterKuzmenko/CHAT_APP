import Component from "../Component"
import { router } from "../../index"

export default class LoginComponent extends Component {
    constructor(anchor) {
        super()
        this.anchor = document.createElement('div')
    }

    onInit() {
        console.log('LoginComponent init')
    }

    render() {
        return `
            <form id="login">
                <label for="username">
                    <input type="text" id="username" name="username" placeholder="Username">
                </label>
                <label for="password">
                    <input type="password" name="password" placeholder="Password">
                </label>
                <input type="submit" value="Войти">
                <a href="#register" data-link-to="register">Зарегестрироваться</a>
            </form>
        `
    } 

    setupListeners() {
        this.addLinkHandler();
        
        const form = document.getElementById('login');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const username = formData.get('username');
            const password = formData.get('password');

            if (username.length < 4) return
            if (password.length < 4) return

            console.log('hi')

            fetch('https://studentschat.herokuapp.com/users/login', {
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