import 'babel-polyfill';

import Router from './Routing/Router'

import './../sass/styles.scss';

const root = document.getElementById('root');

const router = new Router(root);

window.addEventListener('changeRoute', event => {
    router.changeRoute(event.detail.route)
})


  
if (window.location.pathname === '/#login') {
    window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'login'}}))
} else if (window.location.pathname === '/#register') {
    window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'register'}}))
} else {
    window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'main'}}))
}

router.changeRoute('register');


export {router}

