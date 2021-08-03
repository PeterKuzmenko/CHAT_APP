import Component from '../Component';
import auth from '../../chat-functions/auth';

export default class LoginComponent extends Component {
  constructor() {
    super();
    this.anchor = document.createElement('div');
  }

  render() {
    return `
      <form id="login">
        <h2>Вход</h2>
        <label for="username">
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Username"
          >
        </label>
        <label for="password">
          <input type="password" name="password" placeholder="Password">
        </label>
        <input type="submit" class="send" value="Войти">
        <a href="#register" data-link-to="register">Зарегистрироваться</a>
        <p id="alert"></p>
      </form>
    `;
  }

  setupListeners() {
    this.anchor.classList.add('form-container');

    this.addLinkHandler();

    const form = document.getElementById('login');

    form.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(form);
      const username = formData.get('username');
      const password = formData.get('password');

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

      auth('login', {username, password});
    });
  }
}
