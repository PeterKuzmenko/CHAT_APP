import Component from '../Component';
import auth from '../../chat-functions/auth';

export default class RegisterComponent extends Component {
  constructor() {
    super();
    this.anchor = document.createElement('div');
  }

  render() {
    return `
      <form id="register">
        <h2>Регистрация</h2>
        <label for="username">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          >
        </label>
        <label for="password">
          <input type="password" name="password"  placeholder="Password">
        </label>
        <label for="repeat-password">
          <input
            type="password"
            name="repeat-password"
            placeholder="Repeat password"
          >
        </label>
        <input type="submit" class="send" value="Зарегистрироваться">
        <a href="#login" data-link-to="login">Войти</a>
        <p id="alert"></p>
      </form>
    `;
  }

  setupListeners() {
    this.anchor.classList.add('form-container');

    this.addLinkHandler();

    const form = document.getElementById('register');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const username = formData.get('username');
      const password = formData.get('password');
      const passwordCopy = formData.get('repeat-password');

      const alert = document.getElementById('alert');

      if (password.length < 3) {
        alert.textContent = 'Password must contain more than 3 symbols!';
        alert.classList.add('show');
        return;
      }

      if (password.includes(' ')) {
        alert.textContent = 'Password mustn\'t includes spaces!';
        alert.classList.add('show');
        return;
      }

      if (password !== passwordCopy) {
        alert.textContent = 'Passwords aren\'t coincided!';
        alert.classList.add('show');
        return;
      }

      auth('register', {username, password});
    });
  }
}
