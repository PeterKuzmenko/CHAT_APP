import 'babel-polyfill';

import Router from './Routing/Router';
import './../sass/styles.scss';

const router = new Router(document.getElementById('root'));

const isAuth = !!window.localStorage.getItem('user');

if (isAuth) {
  router.changeRoute('main');
} else {
  router.changeRoute('register');
}

export {router};
